# 06 · Sollecito parcella

**Chiamato da** `A6 · Cassiere` (workflow `W08`) · **Approvazione**: automatica solo
al primo sollecito (+15 gg), umana da lì in poi.

È il template più delicato del sistema. Il rischio non è sbagliare un importo: è
incrinare una relazione da cui dipendono anni di onorari.

## Variabili

| Segnaposto | Fonte |
|---|---|
| `{{referente_nome}}`, `{{ragione_sociale}}` | `clienti` |
| `{{numero_fattura}}`, `{{data_fattura}}`, `{{importo}}` | `parcelle` |
| `{{data_scadenza}}`, `{{giorni_scaduto}}` | calcolato |
| `{{iban_studio}}` | configurazione studio |
| `{{elenco_partite_aperte}}` | `parcelle` aperte dello stesso cliente |

**Precondizioni verificate prima di ogni invio:** la fattura non è contestata,
nessun incasso è in riconciliazione manuale, non esiste un accordo di dilazione
attivo. Sollecitare chi ha già pagato costa più che sollecitare in ritardo.

---

## +15 giorni · promemoria neutro (automatico)

**Oggetto:** `{{ragione_sociale}} · fattura {{numero_fattura}} · promemoria`

```
Buongiorno {{referente_nome}},

un promemoria per la fattura {{numero_fattura}} del {{data_fattura}},
di € {{importo}}, con scadenza {{data_scadenza}}.

Se il pagamento è già partito, ignora pure questa email — a volte i tempi
bancari non coincidono con i nostri.

IBAN: {{iban_studio}}

Grazie,
Studio
```

## +30 giorni · fermo, con il quadro completo (approvazione umana)

**Oggetto:** `{{ragione_sociale}} · partite aperte · € {{totale_aperto}}`

```
Buongiorno {{referente_nome}},

alla data di oggi risultano aperte queste posizioni:

{{elenco_partite_aperte}}

Totale: € {{totale_aperto}}

Se c'è qualcosa che non ti torna o serve una dilazione, scrivici o chiamaci:
troviamo una soluzione. Se invece è solo una dimenticanza, l'IBAN è
{{iban_studio}}.

{{firma_operatore}}
Studio
```

## +45 giorni · **non è un'email**

Il sistema **non genera** il terzo sollecito. Crea un'attività *"telefonata"* nella
coda dell'operatore, con: storico dei pagamenti, partite aperte, comunicazioni già
inviate, anzianità della relazione, presenza di ritardi anche sugli F24.

Se un cliente non ha risposto a due email, la terza non serve. Serve una voce.

## Oltre +60 giorni

Nessuna automazione. Lettera formale, valutazione della sospensione dei servizi,
eventuale azione: sono decisioni del titolare, e restano tali.

---

## Regole

1. **Mai interessi, mai azioni legali, mai minacce nei testi automatici.**
2. **Sempre una via d'uscita che salva la faccia**: "se è già partito, ignora",
   "se serve una dilazione, parliamone".
3. **Un cliente in ritardo sia sulle parcelle sia sugli F24 non è un problema di
   credito: è un segnale di crisi.** Va al titolare, non nella catena di solleciti.
4. **Il tono non cambia con la rabbia, cambia con i giorni** — e si ferma dove
   comincia la decisione umana.
