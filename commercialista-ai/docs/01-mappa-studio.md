# 01 · Mappa dello studio — le sei domande

Il sistema nasce da un'intervista, non da un organigramma. Sotto: la domanda, la
risposta tipica di uno studio italiano di 3–15 persone, il costo nascosto, e cosa
prende in carico il sistema agenti.

Le risposte "tipo" servono come ipotesi di partenza. Vanno confermate o smentite
con il questionario in `02-intake.md`: se lo studio risponde diversamente, cambia
la taratura, non l'impianto.

---

## 1. Qual è la prima cosa che fai appena arrivi in ufficio?

**Risposta tipica.** Apro la posta. Poi il cassetto fiscale / la PEC. Poi guardo
se è arrivato qualcosa dall'Agenzia. Poi mi ricordo di una scadenza e vado a
controllare se quel cliente ha mandato i documenti.

**Il costo nascosto.** I primi 60–90 minuti sono spesi a *ricostruire lo stato del
mondo*: chi manca, cosa scade, cosa è arrivato di notte. È lavoro di raccolta, non
di giudizio, e va rifatto ogni mattina da capo.

**Cosa fa il sistema.**
`A1 · Radar` produce alle 7:45 un briefing unico:

- scadenze nei prossimi 10 giorni, per cliente, con importo stimato e stato F24;
- clienti in ritardo sui documenti, con giorni di ritardo e ultimo sollecito;
- PEC e comunicazioni dell'Agenzia arrivate nelle ultime 24h, classificate per urgenza;
- anomalie rilevate dalla `Sentinella` (quadrature, salti di numerazione, IVA fuori scala);
- tre code di lavoro: *da approvare*, *da firmare*, *da chiamare*.

Il briefing è una pagina. Se serve più di una pagina, il sistema è tarato male.

---

## 2. Quale roba proprio non vorresti fare?

**Risposta tipica**, in ordine di frequenza:

1. rincorrere i clienti per avere i documenti (estratti conto, fatture, prima nota);
2. spiegare per la quarta volta la stessa scadenza allo stesso cliente;
3. quadrare a mano cose che non tornano per un errore di qualcun altro;
4. inserire dati che esistono già altrove;
5. chiedere di essere pagati.

**Il costo nascosto.** Sono tutte attività a valore intellettuale ~zero e a costo
emotivo alto. Vengono rimandate, si accumulano, e producono il picco di stress
nei tre giorni prima della scadenza.

**Cosa fa il sistema.**

| Fastidio | Agente | Meccanismo |
|---|---|---|
| Rincorrere documenti | `A3 · Esattore` | Sollecito a cadenza fissa, escalation T-10 / T-5 / T-2, canale che cambia (email → WhatsApp → telefonata in coda) |
| Rispiegare le scadenze | `A5 · Voce` | Riepilogo mensile automatico + risposta con dati del cliente specifico |
| Quadrature | `A7 · Sentinella` | Controlli notturni su registri, saldi, numerazioni, aliquote |
| Reinserimento dati | `W02` | Estrazione da fattura elettronica / estratto conto → riga in prima nota da confermare |
| Chiedere di essere pagati | `A6 · Cassiere` | Scaletta di solleciti parcelle con toni progressivi, mai inviata senza ok |

Regola: il sistema *non elimina* la telefonata difficile. La prepara, la mette in
coda con il contesto, e toglie di mezzo le tre email che la precedevano.

---

## 3. Cosa fai ogni mese?

**Risposta tipica.** Registrazione fatture attive e passive, controllo dei
corrispettivi, liquidazione IVA, F24, ritenute d'acconto sui compensi, invio F24 ai
clienti, controllo incassi, e — per una parte dei clienti — LIPE trimestrale e
situazione contabile.

**Il ciclo mensile canonico** (studio con clienti misti mensili/trimestrali):

```
giorni 1–8     acquisizione documenti + registrazioni     A3, W01, W02
giorni 8–12    controlli e quadrature                     A7
giorni 12–14   liquidazione IVA, calcolo ritenute         A4
giorni 14–15   F24: generazione, verifica, invio          A4, W05
giorno 16      scadenza versamenti                        —
giorni 16–20   riscontro pagamenti, gestione insoluti     A6
fine mese      riepilogo al cliente + parcella            A5, A6
```

**Cosa fa il sistema.** `A4 · Liquidatore` non calcola l'IVA al posto del
gestionale: la *legge* dal gestionale, la confronta con il mese precedente e con
lo stesso mese dell'anno prima, segnala gli scostamenti oltre soglia, prepara il
prospetto per il cliente e la bozza di F24, e traccia lo stato cliente per cliente
in un'unica vista: `da registrare → registrato → liquidato → F24 pronto → F24 inviato → pagato`.

Il valore non è il calcolo. È **sapere in ogni momento a che punto sono i 140 clienti.**

---

## 4. Cosa invii ai tuoi clienti?

**Risposta tipica.** F24, riepiloghi IVA, scadenze del mese, bilanci e situazioni
periodiche, richieste di documenti, CU e certificazioni, parcelle, e — a spot —
avvisi normativi.

**Il problema.** Ogni invio è un piccolo lavoro artigianale: apri il gestionale,
prendi il numero, scrivi l'email, allega il PDF, ti ricordi che quel cliente vuole
anche il dettaglio per commessa. Moltiplicato per 140 clienti e 12 mesi.

**Cosa fa il sistema.** `A5 · Voce dello Studio` genera l'email **con i dati
dentro**, non il template vuoto. Sei famiglie, in `templates/email/`:

| Template | Quando | Dati iniettati |
|---|---|---|
| `01-sollecito-documenti` | T-10, T-5, T-2 dalla scadenza | elenco puntuale di cosa manca, periodo, link upload |
| `02-liquidazione-iva` | dopo la liquidazione | IVA a debito/credito, confronto mese precedente, codice tributo |
| `03-f24-in-scadenza` | 4 giorni prima del 16 | importo, data, codici, modalità, PDF allegato |
| `04-riepilogo-mensile` | fine mese | fatturato, costi, IVA, scadenze in arrivo, documenti mancanti |
| `05-scadenze-del-mese` | giorno 1 | solo le scadenze che riguardano *quel* cliente |
| `06-sollecito-parcella` | +15 / +30 / +45 gg | numero fattura, importo, scaduto da, IBAN |

Vincolo: **nessuna email con importi parte senza approvazione umana.** L'agente
riempie la coda "da approvare"; l'operatore rilascia in blocco dopo controllo.

---

## 5. Scadenze

**Risposta tipica.** "Ce l'ho in testa, e poi c'è lo scadenzario del gestionale,
ma non è aggiornato / non lo guarda nessuno / ognuno ha il suo file."

**Il problema vero.** Non è ricordare *quali* siano le scadenze fiscali — quelle
sono pubbliche e stabili. È sapere **quali scadenze si applicano a quale cliente**,
e a che punto è la lavorazione. Lo scadenzario nazionale è un dato; lo scadenzario
dello studio è un incrocio tra calendario, anagrafica (regime, periodicità IVA,
sostituto d'imposta, presenza dipendenti, immobili) e stato di avanzamento.

**Cosa fa il sistema.** `A2 · Scadenziere` tiene tre livelli:

- **calendario base**: `docs/03-scadenzario.md`, aggiornato una volta l'anno;
- **profilo cliente**: quali voci si applicano, da anagrafica (`docs/05-dati.md`);
- **stato**: per ogni coppia cliente × scadenza, dove siamo e chi ha la palla.

Con in più le due regole che fanno saltare le date: slittamento al primo giorno
lavorativo e sospensione feriale di agosto (vedi `03-scadenzario.md`).

---

## 6. Pagamenti

Domanda ambigua, e va tenuta ambigua: nello studio "pagamenti" significa due cose
diverse, entrambe critiche.

### 6a. Pagamenti del cliente verso l'Erario (F24)

Rischio: il cliente non paga, o paga tardi, o paga un F24 diverso da quello
mandato. Il danno arriva mesi dopo, con sanzioni, e la colpa percepita è dello studio.

`A4` + `W05` presidiano: F24 preparato → inviato → **conferma di pagamento
richiesta** → riscontro in cassetto fiscale (dove disponibile) → se nessuna
conferma entro il giorno 17, alert allo studio e non al cliente. Il ravvedimento
operoso, se serve, viene proposto con importo calcolato e va approvato.

### 6b. Pagamenti del cliente verso lo studio (parcelle)

Rischio: il credito invecchia perché nessuno vuole fare la telefonata.

`A6 · Cassiere` tiene lo scaduto per fasce (0–30 / 31–60 / 61–90 / oltre), abbina
gli incassi bancari alle fatture emesse, e propone la sequenza di sollecito con
tono crescente. La quarta email non la scrive: mette in coda la telefonata, con
il quadro del cliente e lo storico.

---

## Sintesi: cosa cambia il lunedì mattina

Prima:

> apro la posta → ricostruisco lo stato → decido cosa fare → scopro che manca un documento → sollecito → riparto

Dopo:

> leggo un briefing di una pagina → approvo una coda → decido solo dove serve giudizio

Il sistema non fa il commercialista. **Fa lo stagista che nessuno vuole fare**, ogni
giorno, alla stessa ora, senza dimenticarsi niente e senza doverlo chiedere.
