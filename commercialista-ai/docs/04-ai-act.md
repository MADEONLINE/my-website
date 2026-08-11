# 04 · AI Act — come muoversi per essere in regola

Guida operativa per uno studio commercialista che introduce AI nei processi.
**Non è un parere legale**: le classificazioni di rischio e le clausole contrattuali
vanno validate da un legale, e le date di applicazione vanno riverificate perché
sono state oggetto di proposte di modifica.

Riferimenti: Regolamento (UE) 2024/1689 (*AI Act*), in vigore dal 1° agosto 2024;
Legge 23 settembre 2025 n. 132 (legge italiana sull'intelligenza artificiale);
Regolamento (UE) 2016/679 (GDPR), che resta il vincolo più stringente nella pratica
quotidiana di uno studio.

---

## 1. La cosa da capire per prima: lo studio è un *deployer*, non un *provider*

L'AI Act attribuisce obblighi molto diversi a seconda del ruolo.

- **Provider (fornitore)** — chi sviluppa un sistema di AI o lo immette sul mercato
  con il proprio nome o marchio. Obblighi pesanti.
- **Deployer (utilizzatore/deployer)** — chi usa un sistema di AI sotto la propria
  autorità nell'ambito di un'attività professionale. **È il ruolo normale dello studio.**

Attenzione ai due casi in cui uno studio *diventa provider* senza accorgersene:

1. mette il proprio marchio su un sistema di AI ad alto rischio fornito da altri;
2. modifica sostanzialmente la finalità di un sistema, o ne modifica sostanzialmente
   il funzionamento, e lo offre a terzi.

Vendere ai clienti un "assistente AI dello studio" costruito su un modello di terzi
è la strada più breve per cambiare cappello. Se è nei piani, va valutato prima, non dopo.

---

## 2. Calendario di applicazione

| Data | Cosa si applica |
|---|---|
| 1 agosto 2024 | Entrata in vigore del regolamento |
| **2 febbraio 2025** | Divieti sulle pratiche di AI vietate + obbligo di **alfabetizzazione AI** (art. 4) — *già in vigore, riguarda ogni studio che usa AI* |
| **2 agosto 2025** | Obblighi sui modelli di uso generale (GPAI), governance, autorità nazionali, regime sanzionatorio |
| **2 agosto 2026** | Applicazione generale, inclusi gli **obblighi di trasparenza dell'art. 50** e i sistemi ad alto rischio dell'Allegato III |
| 2 agosto 2027 | Alto rischio come componente di prodotti già regolamentati; modelli GPAI immessi prima dell'agosto 2025 |

> **Verificare lo stato normativo prima di pianificare.** Nel novembre 2025 la
> Commissione ha proposto un pacchetto di semplificazione digitale (*Digital
> Omnibus*) che includeva un possibile differimento di parte degli obblighi sui
> sistemi ad alto rischio. Alla data di redazione di questo documento l'esito non
> era consolidato. **Le due scadenze già vigenti — divieti e alfabetizzazione —
> non erano in discussione:** su quelle si lavora comunque.

---

## 3. Classificare gli usi AI dello studio

Il metodo è banale e va fatto per iscritto: ogni uso viene messo in una delle
quattro caselle. Chi salta questo passaggio non ha nulla su cui poggiare il resto.

### 3.1 Rischio minimo — la stragrande maggioranza dei casi

Nessun obbligo specifico oltre alle buone pratiche e al GDPR.

- estrazione dati da fatture elettroniche e documenti;
- prima bozza di email, lettere, riepiloghi;
- riclassificazione e commento di bilancio;
- ricerca interna su normativa e prassi (con verifica delle fonti);
- controlli di quadratura e rilevazione anomalie;
- generazione di scadenzari e promemoria.

Tutto il sistema descritto in questo repository ricade qui.

### 3.2 Rischio limitato — obblighi di trasparenza (art. 50)

Scattano quando l'AI **interagisce direttamente con una persona** o **genera
contenuti**:

- chatbot o assistente esposto ai clienti → la persona deve sapere che sta
  interagendo con un sistema di AI, salvo che sia palese;
- contenuti sintetici (testi, immagini, audio, video) → vanno marcati come generati
  artificialmente, con le specificità previste per i deepfake e per i testi di
  interesse pubblico.

Traduzione pratica: se il portale dello studio ha un assistente, la prima riga dice
che è un assistente automatico e come si raggiunge una persona.

### 3.3 Alto rischio — raro ma non impossibile in uno studio

Rilevanti dall'Allegato III:

- **selezione del personale** — screening dei CV, filtri sui candidati, valutazione
  dei collaboratori ai fini di promozione o cessazione. Se lo studio usa AI per
  assumere, siamo qui. È l'ipotesi più concreta e la più sottovalutata;
- **valutazione del merito creditizio delle persone fisiche** — non è l'attività
  tipica dello studio, ma va guardata se si costruiscono scoring per finanziamenti;
- **accesso a servizi pubblici essenziali e prestazioni** — rilevante solo in
  contesti particolari.

Se un uso ricade qui, gli obblighi del deployer includono: uso conforme alle
istruzioni del fornitore, **sorveglianza umana affidata a persone competenti e
dotate di autorità**, controllo della rappresentatività dei dati in ingresso,
conservazione dei log, informativa ai lavoratori interessati e, in taluni casi,
informazione alle persone soggette a decisioni. La strada semplice, per uno studio,
è **non usare AI per la selezione del personale** finché non si è attrezzati.

### 3.4 Pratiche vietate — da verificare che non entrino dalla finestra

Vietate dal 2 febbraio 2025. Le due che possono toccare uno studio:

- **riconoscimento delle emozioni sul luogo di lavoro** — attenzione a software di
  monitoraggio, di analisi delle chiamate o di "sentiment" sui collaboratori;
- **social scoring** — valutazioni generalizzate di affidabilità delle persone che
  producono trattamenti sfavorevoli in contesti scollegati.

Nota: un `puntualita_score` sul *cliente-impresa*, usato per tarare i solleciti, non
è social scoring — è gestione ordinaria del credito e della relazione. Ma va scritto
nel registro perché la distinzione sia difendibile, e non deve estendersi a
valutazioni sulle persone fisiche fuori contesto.

---

## 4. L'obbligo che è già scattato: alfabetizzazione AI (art. 4)

Dal 2 febbraio 2025 chi fornisce **e chi utilizza** sistemi di AI deve adottare
misure per garantire un livello sufficiente di alfabetizzazione del proprio
personale, tenendo conto di competenze, contesto e persone su cui i sistemi sono usati.

Non serve un corso universitario. Serve **essere in grado di dimostrarlo**:

- mezza giornata di formazione documentata (data, contenuti, partecipanti, firme);
- un vademecum di 2 pagine su cosa si può e non si può mettere dentro uno strumento AI;
- aggiornamento annuale;
- inserimento della formazione nell'onboarding dei nuovi assunti e dei praticanti.

È il primo cantiere da aprire, perché è già esigibile ed è quello che costa meno.

---

## 5. La norma italiana: L. 132/2025 e le professioni intellettuali

La legge italiana sull'intelligenza artificiale, entrata in vigore nell'ottobre 2025,
si affianca al regolamento europeo. Due punti toccano direttamente il commercialista:

1. **Uso strumentale e prevalenza dell'apporto umano.** Nelle professioni
   intellettuali l'AI è ammessa come supporto all'attività, che resta prestazione
   d'opera intellettuale della persona. L'output AI non è la prestazione: è materiale
   di lavoro.
2. **Informazione al cliente.** Va comunicato in modo chiaro, semplice ed esaustivo
   l'uso di sistemi di AI nell'esecuzione dell'incarico.

Sul piano della vigilanza, la legge individua le autorità nazionali competenti
(AgID e ACN nei rispettivi ruoli), fermo restando il ruolo del Garante privacy sui
dati personali.

**Traduzione operativa immediata: una clausola nella lettera d'incarico** e un
paragrafo nell'informativa. Il testo pronto è al § 8.

> Il dettaglio dei singoli articoli e degli eventuali decreti attuativi va verificato
> con il proprio Ordine territoriale e con il CNDCEC, che ha pubblicato indicazioni
> per la professione.

---

## 6. Il vincolo che morde di più: GDPR e segreto professionale

Nella pratica quotidiana, il rischio di uno studio non è l'AI Act: è mettere dati
fiscali di terzi dentro strumenti che non lo consentono.

| Requisito | Cosa fare concretamente |
|---|---|
| Base giuridica e informativa | Aggiornare l'informativa clienti indicando trattamenti che coinvolgono strumenti AI |
| Responsabile del trattamento (art. 28) | DPA firmato con ogni fornitore AI. Nessun DPA, nessun dato di clienti |
| Minimizzazione | Anonimizzare o pseudonimizzare dove l'identità non serve al compito |
| No training sui dati | Disattivare l'uso dei contenuti per l'addestramento; usare piani business/enterprise, non account personali |
| Trasferimenti extra-UE | Verificare garanzie e localizzazione dell'elaborazione |
| DPIA | Necessaria per trattamenti su larga scala o ad alto rischio per i diritti; opportuna comunque quando si introduce un nuovo sistema che tratta dati di molti clienti |
| Segreto professionale | Il dovere di riservatezza non si sospende perché il destinatario è una macchina: vale come per qualsiasi terzo |
| Shadow AI | Il rischio numero uno è il collaboratore che incolla un bilancio nel proprio account personale. Si chiude con policy + strumenti aziendali forniti dallo studio |

---

## 7. Sanzioni

Il regolamento prevede massimali articolati per fascia di violazione: fino a
**35 milioni di euro o il 7%** del fatturato mondiale annuo per le pratiche vietate;
fino a **15 milioni o il 3%** per la violazione di altri obblighi; fino a
**7,5 milioni o l'1%** per informazioni inesatte o fuorvianti fornite alle autorità.
Per PMI e start-up i massimali operano nel limite più favorevole tra importo fisso
e percentuale.

Per uno studio professionale il rischio reale non è la sanzione AI Act: è la
sanzione privacy, il danno reputazionale e la responsabilità professionale per un
output non verificato. Il presidio è lo stesso.

---

## 8. Piano operativo in 10 passi

Ordine consigliato. I primi quattro si chiudono in due settimane.

| # | Passo | Deliverable | Chi |
|---|---|---|---|
| 1 | **Censire gli usi AI reali**, inclusi quelli informali dei collaboratori | Tabella `registro_ai` compilata | Referente AI |
| 2 | **Classificare** ogni uso: minimo / limitato / alto / vietato | Colonna `classificazione_rischio` con motivazione in una riga | Referente AI + legale |
| 3 | **Formazione art. 4** | Mezza giornata + vademecum 2 pagine + registro firme | Titolare |
| 4 | **Policy interna uso AI** | 3 pagine: strumenti ammessi, dati vietati, obbligo di verifica, divieto di account personali | Titolare |
| 5 | **Contratti fornitori** | DPA firmati, opt-out training verificato, sede di elaborazione | Referente privacy |
| 6 | **Informativa e lettera d'incarico** | Clausola AI + informativa privacy aggiornata | Legale |
| 7 | **Presidio umano formalizzato** | Per ogni processo: chi controlla cosa, prima di quale rilascio | Titolare |
| 8 | **Trasparenza art. 50** | Se c'è un assistente esposto ai clienti: disclosure + via d'uscita verso una persona | Referente AI |
| 9 | **Log e tracciabilità** | Tabella `comunicazioni` con `generata_da` / `approvata_da` | Automatico |
| 10 | **Revisione periodica** | Riesame semestrale del registro + monitoraggio normativo | Referente AI |

### Clausola per la lettera d'incarico (bozza da far validare)

> **Utilizzo di sistemi di intelligenza artificiale.** Nello svolgimento
> dell'incarico lo Studio può avvalersi di sistemi di intelligenza artificiale a
> supporto di attività strumentali quali l'estrazione di dati da documenti, la
> predisposizione di bozze di comunicazione, i controlli di coerenza e la gestione
> delle scadenze. L'attività professionale, le valutazioni tecniche e ogni
> elaborato finale restano riferibili al professionista incaricato, che ne mantiene
> la responsabilità e ne verifica il contenuto prima di ogni utilizzo o
> trasmissione. I dati del Cliente sono trattati nel rispetto del Regolamento (UE)
> 2016/679 e non sono utilizzati per l'addestramento di modelli di terzi. Il Cliente
> può richiedere in ogni momento informazioni sui sistemi utilizzati.

### Vademecum per i collaboratori — la versione da attaccare al muro

1. Solo strumenti forniti dallo studio. Mai account personali per dati dei clienti.
2. Mai incollare dati identificativi quando il compito non li richiede.
3. Nessun output parte senza che una persona lo abbia letto e approvato.
4. Nessun importo, codice tributo o data di scadenza si prende dall'AI: si prende
   dal gestionale o dalla fonte ufficiale.
5. Se non sai se puoi, chiedi al referente AI prima, non dopo.

---

## 9. Autovalutazione — 12 domande

Rispondere sì/no. Ogni "no" è una voce di piano.

1. Esiste un elenco scritto degli strumenti AI usati in studio?
2. Ogni uso è stato classificato per rischio?
3. Il personale ha ricevuto formazione documentata sull'AI?
4. Esiste una policy scritta sull'uso dell'AI?
5. I fornitori AI hanno un DPA firmato?
6. L'addestramento sui dati dello studio è disattivato e verificato?
7. I clienti sono informati dell'uso di AI nell'incarico?
8. L'informativa privacy è stata aggiornata?
9. Per ogni processo automatizzato è indicato chi controlla l'output?
10. Esiste traccia di chi ha approvato le comunicazioni generate?
11. Lo studio si tiene fuori da usi ad alto rischio (in particolare selezione del personale)?
12. È stato verificato che nessuno strumento in uso ricada tra le pratiche vietate?

Meno di 9 "sì": non allargare l'uso dell'AI prima di aver chiuso le lacune.

---

## 10. Il principio che regge tutto

Il presidio richiesto dalla norma e il presidio richiesto dalla qualità del lavoro
**sono lo stesso presidio**: una persona competente che guarda l'output prima che
esca, e una traccia di chi l'ha guardato.

Uno studio che ha costruito bene le automazioni è già a metà della conformità.
Uno studio che ha automatizzato senza controllo non ha un problema normativo: ha un
problema professionale, e il problema normativo arriva dopo.
