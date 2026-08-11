# Workflow operativi

Nove automazioni. Ogni scheda dichiara: **innesco → passi → guardrail → output**.
Sono descritte in modo indipendente dallo strumento (n8n, Make, Zapier, script):
in `n8n/` ci sono due implementazioni di riferimento.

Ordine di attivazione consigliato: **W01, W03, W06** nella prima settimana — sono
quelle che restituiscono più tempo con meno rischio. Il resto dopo, uno alla volta.

Legenda stato: 🟢 nessun rischio di errore verso l'esterno · 🟡 richiede
approvazione umana · 🔴 tocca importi o adempimenti, presidio obbligatorio.

---

## W01 · Raccolta documenti 🟢

**Innesco** — ogni giorno alle 08:00; e a T-10 / T-5 / T-2 da ogni scadenza aperta.

**Passi**
1. Leggi `scadenze` con scadenza nei prossimi 10 giorni.
2. Per ciascuna, leggi `documenti_attesi` in stato `atteso` o `incompleto`.
3. Raggruppa **per cliente** (un solo messaggio, anche se mancano cose per più scadenze).
4. Escludi: documenti già ricevuti, clienti `blocco_invii_automatici`, clienti già
   sollecitati oggi.
5. Genera l'email da `templates/email/01-sollecito-documenti.md`, iniettando
   l'elenco puntuale, il periodo, la scadenza e il link di upload.
6. Invia sul canale preferito (fino al 2° sollecito), oppure metti in coda.
7. Scrivi in `comunicazioni`; incrementa `solleciti_inviati`.

**Guardrail** — mai due invii lo stesso giorno allo stesso cliente; mai sollecitare
un documento già ricevuto; dal 3° sollecito serve approvazione.

**Output** — email inviate + vista *"chi manca"* nel briefing di `A1`.

---

## W02 · Acquisizione e pre-registrazione documenti 🟡

**Innesco** — arrivo di un file (email dedicata, cartella condivisa, portale).

**Passi**
1. Identifica il cliente (mittente, nome file, partita IVA nel documento).
2. Classifica il tipo (fattura, estratto conto, corrispettivi, contratto, F24 pagato).
3. Estrai i campi: data, numero, controparte, imponibile, IVA, totale, aliquote.
4. Confronta con la fattura elettronica già presente nel gestionale, se esiste.
5. Scrivi una **proposta di registrazione**, non una registrazione.
6. Aggiorna `documenti_attesi` → `ricevuto`; chiudi la catena di solleciti.
7. Se l'estrazione ha confidenza bassa o i totali non quadrano → coda manuale.

**Guardrail** — nessuna scrittura diretta in contabilità; i documenti illeggibili
vanno in coda umana, non in stima; i dati estratti restano tracciati con la fonte.

---

## W03 · Scadenze del mese al cliente 🟡

**Innesco** — giorno 1 di ogni mese, ore 09:00.

**Passi**
1. Per ogni cliente attivo, estrai le scadenze del mese **che lo riguardano**.
2. Escludi le voci `da_confermare`.
3. Se non ci sono scadenze, **non inviare niente** (il silenzio è informazione).
4. Genera da `templates/email/05-scadenze-del-mese.md`.
5. Invia se non contiene importi da approvare; altrimenti coda.

**Guardrail** — mai calendari generici: se il cliente non ha quella scadenza, la
riga non esiste. Un'email con scadenze non pertinenti insegna al cliente a non leggere.

---

## W04 · Ciclo liquidazione IVA 🔴

**Innesco** — giorno 12 di ogni mese (mensili) e nei mesi di liquidazione trimestrale.

**Passi**
1. Verifica completezza documentale del periodo → se manca, `W01` e stop sul cliente.
2. Verifica assenza di anomalie critiche aperte (`W07`) → se presenti, stop.
3. Leggi la liquidazione dal gestionale (importi, codici tributo, periodo).
4. Applica i controlli di scostamento di `A4` → oltre soglia, stop e segnala.
5. Genera il prospetto cliente e la bozza F24.
6. Metti in **coda di approvazione**.
7. Dopo approvazione: invia con `templates/email/02-liquidazione-iva.md` +
   `03-f24-in-scadenza.md`, aggiorna `scadenze` e `f24`.

**Guardrail** — nessun ricalcolo autonomo dell'imposta; nessun invio senza
`approvato_da`; ogni stop lascia una riga leggibile sul perché.

---

## W05 · Presidio pagamento F24 🔴

**Innesco** — giorno 17 (o giorno successivo alla scadenza).

**Passi**
1. Elenca gli `f24` in stato `inviato_cliente` senza conferma di pagamento.
2. Per i clienti con delega allo studio, riscontra l'avvenuto addebito.
3. Per gli altri, verifica la conferma ricevuta.
4. Manca il riscontro → **alert interno**, con importo, giorni, storico del cliente.
5. Se lo studio decide di intervenire, prepara il calcolo del ravvedimento come proposta.

**Guardrail** — nessun sollecito automatico al cliente su un mancato versamento:
è una conversazione delicata e a volte il pagamento c'è ed è il riscontro a mancare.
Il ravvedimento non si esegue mai in automatico.

---

## W06 · Riconciliazione incassi 🟢

**Innesco** — ogni giorno alle 07:00, sui movimenti bancari del giorno prima.

**Passi**
1. Scarica i movimenti in entrata.
2. Abbina alle `parcelle` aperte: importo esatto + numero fattura in causale → automatico.
3. Somme di più fatture o importi parziali → proposta.
4. Nessuna corrispondenza → coda manuale.
5. Aggiorna stati, `incassato`, fasce di scaduto.

**Guardrail** — solo la corrispondenza esatta è automatica. Un abbinamento errato
è invisibile e si paga mesi dopo.

---

## W07 · Controlli notturni 🟢

**Innesco** — ogni notte alle 02:00, su tutti i clienti attivi.

**Passi** — esegui la batteria di controlli di `A7 · Sentinella`; apri/aggiorna le
`anomalie`; chiudi quelle rientrate; blocca l'avanzamento di `W04` sui clienti con
anomalie critiche; alimenta il briefing di `A1`.

**Guardrail** — nessuna correzione automatica; falsi positivi ricorrenti → proposta
di ritaratura della soglia, non silenziamento silenzioso.

---

## W08 · Solleciti parcelle 🟡

**Innesco** — settimanale, lunedì ore 10:00.

**Passi**
1. Aggiorna le fasce di scaduto.
2. Escludi: parcelle contestate, incassi in riconciliazione manuale, clienti con
   accordo di dilazione attivo.
3. Genera i solleciti secondo la scala di `A6` (+15 automatico, +30 e oltre in coda).
4. Oltre +45, non generare email: **crea l'attività "telefonata"** con scheda cliente.

**Guardrail** — nessun riferimento a interessi, azioni legali o sospensione dei
servizi nei testi automatici.

---

## W09 · Presidio conformità AI 🟢

**Innesco** — settimanale; e ad ogni registrazione di un nuovo strumento AI.

**Passi**
1. Cerca in `comunicazioni` e `f24` le righe uscite senza `approvata_da` → **alert critico**.
2. Verifica che ogni strumento usato sia nel `registro_ai`.
3. Segnala scadenze di conformità: formazione annuale, riesame trimestrale del
   registro, clienti senza `consenso_informativa_ai`.
4. Produci il report trimestrale per il titolare.

**Guardrail** — l'agente segnala che una norma va riverificata; non afferma mai
per conto proprio che una norma è cambiata.

---

## Come si collegano

```
        ┌──────────── W07 controlli notturni ────────────┐
        ↓                                                ↓
   W01 documenti ──→ W02 acquisizione ──→ W04 liquidazione IVA ──→ W05 pagamento F24
        │                                        │
        └───→ W03 scadenze al cliente            └──→ parcella ──→ W06 incassi ──→ W08 solleciti
                                                                          │
                                            W09 presidio conformità ←─────┘
```
