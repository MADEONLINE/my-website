# 02 · Liquidazione IVA

**Chiamato da** `A4 · Liquidatore` (workflow `W04`) · **Approvazione umana obbligatoria**
(contiene importi).

## Variabili

| Segnaposto | Fonte | Obbligatorio |
|---|---|---|
| `{{referente_nome}}`, `{{ragione_sociale}}` | `clienti` | sì |
| `{{periodo}}` | periodo di liquidazione | sì |
| `{{iva_vendite}}`, `{{iva_acquisti}}`, `{{credito_precedente}}` | gestionale | sì |
| `{{saldo}}`, `{{segno}}` (debito/credito) | gestionale | sì |
| `{{codice_tributo}}`, `{{data_versamento}}` | `f24` | se a debito |
| `{{confronto_precedente}}`, `{{confronto_anno}}` | calcolato su storico | no |

Gli importi arrivano **dal gestionale**. Se un importo non è disponibile, l'email
non parte: si apre un'anomalia.

---

**Oggetto (a debito):** `{{ragione_sociale}} · IVA {{periodo}} · € {{saldo}} da versare entro il {{data_versamento}}`

**Oggetto (a credito):** `{{ragione_sociale}} · IVA {{periodo}} · credito di € {{saldo}}, nessun versamento`

```
Buongiorno {{referente_nome}},

abbiamo chiuso la liquidazione IVA di {{periodo}}.

  IVA su vendite                {{iva_vendite}}
  IVA su acquisti               {{iva_acquisti}}
  Credito periodo precedente    {{credito_precedente}}
  ─────────────────────────────────────────────
  IVA A {{segno}}               {{saldo}}

{{blocco_versamento}}

Rispetto a {{periodo_precedente}} ({{importo_precedente}}) la variazione è
{{confronto_precedente}}; rispetto allo stesso periodo dell'anno scorso
{{confronto_anno}}.

In allegato il prospetto di dettaglio{{allegato_f24}}.

Per qualsiasi chiarimento siamo qui.

{{firma_operatore}}
Studio
```

### Blocco `{{blocco_versamento}}`

**A debito:**
```
Il versamento va effettuato entro il {{data_versamento}} con modello F24,
codice tributo {{codice_tributo}}. Trovi l'F24 già compilato in allegato.
```

**A credito:**
```
Non ci sono versamenti da fare per questo periodo. Il credito di {{saldo}}
viene riportato al periodo successivo.
```

---

## Regole

1. **Il numero in alto.** Il cliente vuole sapere quanto paga e quando: sta
   nell'oggetto e nelle prime cinque righe.
2. **Il confronto è la parte che il cliente non sa di volere.** "+8,3% su giugno"
   trasforma un adempimento in un'informazione di gestione, e riduce le telefonate
   di chiarimento.
3. **Nessuna interpretazione normativa nel testo.** Se serve una valutazione
   (compensazioni, opzioni, rimborsi), l'email dice che ne parliamo e la bozza
   viene marcata *"richiede risposta professionale"*.
4. **Mai un importo senza fonte e periodo.**
