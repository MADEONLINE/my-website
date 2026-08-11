# A7 · Sentinella — controlli e anomalie

> *"Quadrare a mano cose che non tornano per un errore di qualcun altro."*

Cerca l'errore mentre costa poco: prima della liquidazione, non dopo la dichiarazione.

## Innesco
Notturno su tutti i clienti attivi. Su richiesta prima di ogni chiusura periodica.

## Batteria di controlli

**Coerenza contabile**
- salti o duplicazioni nella numerazione delle fatture emesse
- fatture registrate con data fuori periodo
- partite aperte anomale in clienti/fornitori
- saldi banca contabili vs estratto conto
- cassa negativa (impossibile per definizione, frequentissima nei fatti)

**Coerenza IVA**
- aliquote fuori dallo standard del cliente
- operazioni senza codice natura dove richiesto
- reverse charge e operazioni estere codificate in modo incoerente rispetto allo storico
- IVA indetraibile trattata come detraibile su categorie sensibili (auto, telefonia, rappresentanza)

**Coerenza anagrafica e adempimenti**
- cliente soggetto a un adempimento senza scadenza generata
- regime fiscale incoerente con volumi (es. forfettario oltre soglia)
- deleghe cassetto fiscale o PEC in scadenza entro 60 giorni

**Coerenza temporale**
- scostamenti oltre soglia rispetto a periodi omogenei
- documenti attesi mai arrivati per due periodi consecutivi
- clienti con `puntualita_score` in peggioramento

## Output

```
ANOMALIE · 11/08/2026

🔴 CRITICHE (2)
  Bianchi & C.   IVA luglio €18.200 vs media €4.400 (+314%)
                 → probabile fattura duplicata: nn. 142 e 143, stesso importo, stesso cliente
  Neri Srl       cassa negativa €-3.400 al 31/07
                 → mancano registrazioni di incasso o versamento

🟡 ATTENZIONE (5)
  Rossi Srl      salto numerazione: manca fattura n. 87
  Gialli Srl     aliquota 4% su cliente che usa storicamente 22%
  Verdi Snc      PEC in scadenza il 14/09
  ...
```

Ogni anomalia dice **cosa non torna, con i numeri, e l'ipotesi più probabile**.
Un'anomalia senza numeri non è una segnalazione: è un'ansia.

## Guardrail
- **Non corregge niente.** Segnala. La correzione contabile è un atto professionale.
- Non chiude un'anomalia da sola: la chiude una persona, con esito
  `risolta` o `falso_positivo`.
- I falsi positivi ricorrenti sullo stesso controllo alzano automaticamente la
  soglia e generano una proposta di taratura: un sistema che grida sempre viene
  spento, ed è il modo più comune in cui questi progetti muoiono.

## Effetto sul resto del sistema
Blocca l'avanzamento di `A4` sui clienti con anomalie critiche aperte, alimenta il
briefing di `A1` e aggiorna il `puntualita_score` in `clienti`.
