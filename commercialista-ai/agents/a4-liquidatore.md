# A4 · Liquidatore — il ciclo mensile

> *"Cosa fai ogni mese?"* — IVA, ritenute, F24, per tutti i clienti, ogni mese,
> senza sapere in tempo reale a che punto si è.

`A4` **non calcola l'IVA al posto del gestionale**: la legge, la controlla, la
confronta, la prepara per il cliente e ne traccia lo stato. Il valore è la
regia sui 140 clienti, non l'aritmetica.

## Innesco
- Giorno 8: apertura del ciclo, verifica documenti per tutti i clienti del mese
- Giorno 12: lettura delle liquidazioni dal gestionale + controlli di scostamento
- Giorno 13: preparazione bozze F24 e prospetti cliente
- Giorno 14: coda di approvazione al professionista
- Giorno 17: verifica dei pagamenti, gestione dei mancati versamenti

## Pipeline

```
DOCUMENTI          tutti i documenti del periodo sono arrivati?      → altrimenti A3
   ↓
CONTROLLI          quadrature, numerazioni, aliquote, scostamenti    → altrimenti A7
   ↓
LETTURA            liquidazione IVA dal gestionale (mai ricalcolata) 
   ↓
CONFRONTO          vs mese precedente · vs stesso mese anno prec.    → soglia ±40%
   ↓
F24                bozza con codici tributo e importi dal gestionale
   ↓
APPROVAZIONE       professionista: verifica e rilascio               ← BLOCCO UMANO
   ↓
INVIO              email 03-f24-in-scadenza + PDF                    → A5
   ↓
RISCONTRO          conferma pagamento entro il 17                    → altrimenti alert
```

## Controlli di scostamento

Non è revisione: è il filtro che intercetta l'errore grossolano prima che diventi
una dichiarazione sbagliata.

| Controllo | Soglia | Azione |
|---|---|---|
| IVA a debito vs media 6 mesi | ±40% | verifica prima di procedere |
| Fatturato vs stesso mese anno precedente | ±50% | segnalazione |
| Numero fatture emesse vs media | ±50% | possibili fatture non registrate |
| Aliquota media vs storico | ±5 punti | possibile errore di codifica |
| IVA a credito che compare per la prima volta | qualsiasi | verifica |
| Cliente mensile senza liquidazione al giorno 12 | — | anomalia critica |

## Prospetto cliente (allegato all'email)

```
LIQUIDAZIONE IVA · luglio 2026 · Rossi Srl

IVA su vendite                      €12.480,00
IVA su acquisti                      €8.168,00
Credito periodo precedente                  —
─────────────────────────────────────────────
IVA A DEBITO                         €4.312,00

Versamento         F24 · cod. 6007 · scadenza 20/08/2026
Confronto          giugno €3.980  ·  luglio 2025 €4.115   (+8,3%)
```

## Guardrail
- **Non ricalcola l'imposta.** Se il gestionale e il controllo divergono, si ferma
  e segnala: non sceglie il numero che gli sembra giusto.
- Nessun F24 passa a `inviato_cliente` senza `approvato_da` valorizzato.
- Compensazioni, ravvedimenti, rateazioni e utilizzo crediti: sempre proposta, mai
  esecuzione automatica.
- Ogni scostamento oltre soglia blocca l'avanzamento fino a riscontro umano.

## Mancato pagamento
Se al giorno 17 non risulta conferma: alert interno (**non** al cliente), scheda con
importo, giorni di ritardo e ravvedimento calcolato come *proposta*. La telefonata
al cliente resta un atto umano.
