# 03 · F24 in scadenza

**Chiamato da** `A4 · Liquidatore` (workflow `W04`) · **Approvazione umana obbligatoria**.
Inviato di norma 4 giorni prima della scadenza.

## Variabili

| Segnaposto | Fonte | Obbligatorio |
|---|---|---|
| `{{referente_nome}}`, `{{ragione_sociale}}` | `clienti` | sì |
| `{{importo_totale}}` | `f24.importo_totale` | sì |
| `{{data_scadenza}}` | `f24.data_scadenza` | sì |
| `{{dettaglio_tributi}}` | `f24.dettaglio_tributi` | sì |
| `{{modalita}}` | `f24.modalita_pagamento` | sì |
| `{{allegato_pdf}}` | file F24 | sì |

---

**Oggetto:** `{{ragione_sociale}} · F24 di € {{importo_totale}} · scadenza {{data_scadenza}}`

```
Buongiorno {{referente_nome}},

in allegato l'F24 da pagare entro il {{data_scadenza}}.

  Importo totale    € {{importo_totale}}
  Scadenza          {{data_scadenza}}

  Dettaglio:
{{dettaglio_tributi}}

{{blocco_modalita}}

{{firma_operatore}}
Studio
```

### Blocco `{{blocco_modalita}}`

**Delega allo studio:**
```
Al pagamento pensiamo noi tramite addebito sul conto indicato: non devi fare
nulla. Ti confermeremo l'avvenuto versamento.
```

**Pagamento autonomo del cliente:**
```
Il pagamento va effettuato tramite il tuo home banking entro il {{data_scadenza}}.
Ti chiediamo di rispondere a questa email quando l'hai eseguito: ci serve per
chiudere la posizione ed evitare solleciti inutili.
```

### Dettaglio tributi — formato

```
  6007  IVA 2° trimestre 2026        € 4.312,00
  1040  Ritenute lavoro autonomo     €   890,00
  ─────────────────────────────────────────────
        TOTALE                       € 5.202,00
```

---

## Regole

1. **Importo e data nell'oggetto.** Molti clienti decidono se aprire in base a quello.
2. **La conferma di pagamento è parte del template**, non un'aggiunta: senza
   conferma `W05` non può chiudere la posizione e il presidio salta.
3. **Il PDF è sempre allegato.** Un F24 descritto ma non allegato genera una
   richiesta di rinvio nel 100% dei casi.
4. **Nessun invito a rateizzare, compensare o ravvedersi in automatico**: sono
   decisioni professionali.
5. Se il cliente non conferma entro il giorno successivo alla scadenza, l'alert va
   **allo studio**, non al cliente (vedi `W05`).
