# 05 · Scadenze del mese

**Chiamato da** `A2 · Scadenziere` (workflow `W03`), il giorno 1 di ogni mese ·
**Approvazione**: automatica se nessuna voce è marcata `da_confermare`.

## Variabili

| Segnaposto | Fonte |
|---|---|
| `{{referente_nome}}`, `{{ragione_sociale}}` | `clienti` |
| `{{mese}}` | contesto |
| `{{elenco_scadenze}}` | `scadenze` filtrate **sul profilo del cliente** |
| `{{documenti_richiesti}}` | `documenti_attesi` del periodo |
| `{{data_limite_documenti}}` | T-10 della prima scadenza |

---

**Oggetto:** `{{ragione_sociale}} · le tue scadenze di {{mese}}`

```
Buongiorno {{referente_nome}},

ecco cosa scade a {{mese}} per {{ragione_sociale}}:

{{elenco_scadenze}}

Per arrivare puntuali ci servono entro il {{data_limite_documenti}}:

{{documenti_richiesti}}

Puoi caricarli qui: {{link_upload}}

{{firma_operatore}}
Studio
```

### Formato `{{elenco_scadenze}}`

```
  16/09   Versamento IVA agosto              importo da definire
  16/09   Ritenute su compensi agosto        importo da definire
  30/09   LIPE 2° trimestre                  nessun versamento
```

Le voci con importo già determinato lo riportano. Le altre dicono
*"importo da definire"* — mai una cifra inventata per completezza estetica.

---

## Regole

1. **Solo le scadenze di quel cliente.** Un calendario fiscale generico con voci
   non pertinenti insegna al cliente che le email dello studio non lo riguardano.
   È il modo più veloce per rendere invisibili anche quelle importanti.
2. **Nessuna voce `da_confermare`.** Se una data dipende da un provvedimento non
   ancora verificato, resta interna finché non è confermata.
3. **Se il mese è vuoto, non si invia.** Il silenzio è informazione: significa che
   non c'è niente da fare.
4. **Le scadenze sono associate a un'azione del cliente**, non solo a una data:
   cosa deve mandare e entro quando. Una data senza richiesta non produce comportamento.
