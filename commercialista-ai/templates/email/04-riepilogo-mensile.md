# 04 · Riepilogo mensile

**Chiamato da** `A4` a fine mese · **Approvazione umana obbligatoria**.

È l'email che trasforma lo studio da fornitore di adempimenti a interlocutore di
gestione. Costa poco produrla, e cambia la percezione del servizio più di qualsiasi
altra cosa in questo repository.

## Variabili

| Segnaposto | Fonte |
|---|---|
| `{{mese}}`, `{{ragione_sociale}}`, `{{referente_nome}}` | contesto e `clienti` |
| `{{fatturato}}`, `{{fatturato_var}}` | gestionale + storico |
| `{{costi}}`, `{{costi_var}}` | gestionale + storico |
| `{{iva_periodo}}`, `{{iva_stato}}` | liquidazione |
| `{{scadenze_prossime}}` | `scadenze` del mese entrante |
| `{{documenti_mancanti}}` | `documenti_attesi` ancora aperti |

---

**Oggetto:** `{{ragione_sociale}} · riepilogo {{mese}}`

```
Buongiorno {{referente_nome}},

il riepilogo di {{mese}}.

  ANDAMENTO
  Fatturato del mese      {{fatturato}}    {{fatturato_var}} vs {{mese_precedente}}
  Costi registrati        {{costi}}        {{costi_var}}
  IVA del periodo         {{iva_periodo}}  ({{iva_stato}})

  IN ARRIVO
{{scadenze_prossime}}

{{blocco_documenti_mancanti}}

Se vuoi che approfondiamo qualche voce, dimmelo e ci sentiamo.

{{firma_operatore}}
Studio
```

### Blocco `{{blocco_documenti_mancanti}}` — solo se ci sono documenti aperti

```
  CI SERVE ANCORA
{{documenti_mancanti}}
```

### Formato "IN ARRIVO"

```
  20/09   IVA agosto                       stima € 3.900
  30/09   LIPE 2° trimestre                nessun versamento
  16/10   Ritenute settembre               importo da definire
```

---

## Regole

1. **Le variazioni percentuali sono il contenuto**, non i valori assoluti: il
   cliente i suoi numeri li conosce, il confronto no.
2. **Le stime sono etichettate come stime.** "stima € 3.900" è onesto; "€ 3.900"
   su un periodo non ancora chiuso è un impegno che lo studio non può prendere.
3. **Niente grafici, niente allegati pesanti.** Deve leggersi dal telefono in 30 secondi.
4. **Nessun consiglio fiscale non richiesto.** Se dai numeri emerge qualcosa che
   merita una conversazione, la bozza viene marcata *"richiede risposta
   professionale"* e la scrive una persona.
5. Se il mese non ha niente da dire, **non si manda niente.** Un riepilogo vuoto
   inviato per abitudine insegna al cliente a ignorare le email dello studio.
