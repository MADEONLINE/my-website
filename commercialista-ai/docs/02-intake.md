# 02 · Intake — questionario di taratura

Da compilare **col commercialista**, non per lui. Durata 45 minuti. Serve a
tarare gli agenti su uno studio reale: senza queste risposte il sistema gira su
ipotesi medie e produce rumore.

Regola di conduzione: per ogni risposta chiedere sempre *"quanto tempo ci porta
via a settimana?"* e *"cosa succede se non lo fa nessuno?"*. Le due risposte
insieme danno la priorità di automazione.

---

## A. Anagrafica dello studio

| # | Domanda | Risposta |
|---|---|---|
| A1 | Numero clienti attivi | |
| A2 | Ripartizione: ditte individuali / società di persone / società di capitali / forfettari / privati | |
| A3 | Persone in studio e ruoli (titolari, contabili, praticanti, segreteria) | |
| A4 | Gestionale contabile in uso | |
| A5 | Altri software: fatturazione elettronica, paghe, gestione documentale, CRM | |
| A6 | Chi ha le deleghe al cassetto fiscale e come sono organizzate | |
| A7 | Canali con cui i clienti scrivono, in ordine di volume (email / WhatsApp / telefono / portale) | |

## B. La prima ora del mattino

| # | Domanda | Risposta |
|---|---|---|
| B1 | Cosa apre per prima, letteralmente, alle 8:30 | |
| B2 | Quante finestre/programmi ha aperti prima di iniziare a produrre | |
| B3 | Quante volte a settimana la giornata viene dirottata da una cosa scoperta all'ultimo | |
| B4 | Se ricevesse una sola pagina alle 7:45, cosa dovrebbe contenerci | |

## C. Il lavoro che non vorrebbe fare

Elencare 5 attività, poi valutarle.

| Attività | Ore/settimana | Chi la fa oggi | Cosa succede se salta | Automatizzabile (S/N/parziale) |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

## D. Il ciclo mensile

| # | Domanda | Risposta |
|---|---|---|
| D1 | Quanti clienti IVA mensile / IVA trimestrale | |
| D2 | Entro che giorno del mese arrivano *davvero* i documenti | |
| D3 | Quanti clienti sono cronicamente in ritardo (nome e cognome) | |
| D4 | Chi fa le liquidazioni e in quanti giorni | |
| D5 | Come vengono generati e inviati gli F24 | |
| D6 | Come si verifica che il cliente abbia pagato | |
| D7 | Quali controlli di quadratura vengono fatti oggi, e quali si vorrebbero fare | |

## E. Comunicazione ai clienti

| # | Domanda | Risposta |
|---|---|---|
| E1 | Elenco di tutto ciò che parte verso il cliente in un anno | |
| E2 | Quali invii sono già standardizzati e quali si riscrivono ogni volta | |
| E3 | Tono dello studio: formale / cordiale-professionale / diretto | |
| E4 | Chi firma le comunicazioni | |
| E5 | Ci sono clienti che vogliono un formato diverso dagli altri? Quali | |
| E6 | Cosa **non** deve mai partire in automatico | |

## F. Scadenze

| # | Domanda | Risposta |
|---|---|---|
| F1 | Dove vive oggi lo scadenzario (gestionale / Excel / testa / misto) | |
| F2 | Chi lo aggiorna e con che frequenza | |
| F3 | Quante scadenze sono state mancate negli ultimi 24 mesi e perché | |
| F4 | Con quanto anticipo si vuole essere avvisati (default proposto: 10 / 5 / 2 giorni) | |
| F5 | Adempimenti non fiscali da tracciare (bilanci, rinnovi PEC/firma digitale, libri sociali, antiriciclaggio) | |

## G. Pagamenti

**G-bis. Verso l'Erario**

| # | Domanda | Risposta |
|---|---|---|
| G1 | Chi materialmente paga gli F24: studio con delega o cliente | |
| G2 | Come si scopre oggi che un F24 non è stato pagato | |
| G3 | Politica sul ravvedimento operoso | |

**G-ter. Verso lo studio**

| # | Domanda | Risposta |
|---|---|---|
| G4 | Modalità di fatturazione (a consuntivo / canone / acconti) | |
| G5 | Termini di pagamento e rispetto reale | |
| G6 | Scaduto attuale per fasce (0–30 / 31–60 / 61–90 / oltre) | |
| G7 | Chi fa i solleciti oggi, e con quale disagio (1–5) | |
| G8 | Soglia oltre la quale si blocca il servizio | |

## H. AI e conformità

| # | Domanda | Risposta |
|---|---|---|
| H1 | Strumenti AI già in uso in studio, anche informali (ChatGPT personale dei collaboratori incluso) | |
| H2 | Dati dei clienti già finiti dentro strumenti AI? Quali | |
| H3 | Esiste una policy scritta? | |
| H4 | I clienti sono stati informati dell'uso di AI? | |
| H5 | Chi è il referente privacy/DPO, se c'è | |
| H6 | Lo studio usa AI per selezionare personale? (→ classificazione alto rischio, vedi `04-ai-act.md`) | |
| H7 | Lo studio vuole esporre un assistente AI direttamente ai clienti? | |

---

## Output dell'intake

Chiuso il questionario, si producono tre cose, in quest'ordine:

1. **Tabella priorità** — attività ordinate per `ore risparmiate × fastidio ÷ rischio`.
2. **Taratura agenti** — quali agenti si accendono nella fase 1 (max tre) e con quali soglie.
3. **Piano AI Act** — registro degli usi già in essere e lacune da chiudere prima
   di allargare l'uso.

Errore da evitare: accendere tutto insieme. Tre agenti che funzionano valgono più
di nove che nessuno guarda.
