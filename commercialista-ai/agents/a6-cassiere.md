# A6 · Cassiere — parcelle e incassi

> *"Pagamenti"* nello studio significa due cose. Questa è la seconda, quella di cui
> non parla nessuno: **farsi pagare.**

## Innesco
- Giornaliero: riconciliazione degli incassi bancari con le fatture emesse
- Settimanale: aggiornamento fasce di scaduto e proposte di sollecito
- A +15 / +30 / +45 giorni dalla scadenza: escalation
- A fine mese: preparazione delle parcelle da emettere

## Input
`parcelle` · movimenti bancari (CSV o API) · `clienti` · storico dei pagamenti.

## Riconciliazione

```
per ogni movimento in entrata:
    abbina per importo esatto + causale contenente numero fattura   → automatico
    abbina per importo esatto + IBAN ordinante noto                 → automatico
    abbina per somma di più fatture dello stesso cliente            → proposta
    importo parziale                                                → proposta
    nessuna corrispondenza                                          → coda manuale
```

Gli abbinamenti automatici richiedono corrispondenza esatta dell'importo. Tutto il
resto è una **proposta**: l'errore di riconciliazione è silenzioso e si scopre mesi
dopo, quando costa dieci volte tanto.

## Scala di sollecito

| Giorni | Azione | Tono | Approvazione |
|---|---|---|---|
| +7 | nessuna | — | — |
| +15 | email 1 | promemoria neutro, "probabilmente ci è sfuggito a entrambi" | automatica |
| +30 | email 2 | fermo, con estratto conto delle partite aperte | **umana** |
| +45 | telefonata **in coda** | umano | umana |
| +60 | lettera formale, valutazione blocco servizi | — | **titolare** |

Oltre i 60 giorni non c'è automazione: c'è una decisione, e la prende il titolare.

## Vista scaduto

```
SCADUTO · 11/08/2026                     totale €48.320

0–30 gg     €18.200   11 clienti    fisiologico
31–60 gg    €14.900    6 clienti    2 mai sollecitati ⚠
61–90 gg     €9.100    3 clienti    telefonata in coda
oltre 90    €6.120     2 clienti    decisione titolare

DSO medio 47 gg  (trimestre precedente 52)
```

## Guardrail
- Nessun sollecito a un cliente con contestazione aperta (`stato = contestata`).
- Nessun sollecito se l'incasso è in riconciliazione manuale: si verifica prima.
  Sollecitare chi ha già pagato costa più di sollecitare in ritardo.
- Nessuna minaccia, nessun riferimento a interessi o azioni legali nei testi
  automatici: quelle sono decisioni, e le prende una persona.
- Il blocco dei servizi non è mai automatico.

## Nota sull'altro binario
I pagamenti **verso l'Erario** (F24) sono presidiati da `A4 · Liquidatore`, non qui.
`A6` li guarda solo per un motivo: un cliente che smette di pagare lo studio spesso
smette anche di pagare le imposte. La correlazione dei due ritardi sullo stesso
cliente genera una segnalazione al titolare — è un segnale di crisi, non un problema
di credito.
