# 01 · Sollecito documenti

**Chiamato da** `A3 · Esattore` (workflow `W01`) · **Approvazione**: automatica fino
al 2° sollecito, umana dal 3°.

## Variabili

| Segnaposto | Fonte | Obbligatorio |
|---|---|---|
| `{{referente_nome}}` | `clienti.referente_nome` | sì |
| `{{ragione_sociale}}` | `clienti.ragione_sociale` | sì |
| `{{elenco_documenti}}` | `documenti_attesi` filtrati | sì |
| `{{adempimento}}` | `scadenze.descrizione` | sì |
| `{{periodo}}` | `scadenze.periodo_riferimento` | sì |
| `{{data_scadenza}}` | `scadenze.data_scadenza` | sì |
| `{{giorni_mancanti}}` | calcolato | sì |
| `{{link_upload}}` | configurazione studio | sì |

Se anche uno solo dei segnaposto obbligatori è vuoto, **l'email non si genera**:
si apre un'anomalia.

---

## Livello 1 — T-10 · cordiale

**Oggetto:** `{{ragione_sociale}} · documenti mancanti per {{adempimento}} · scadenza {{data_scadenza}}`

```
Buongiorno {{referente_nome}},

per completare la lavorazione di {{adempimento}} ({{periodo}}) ci mancano
ancora questi documenti:

{{elenco_documenti}}

La scadenza è il {{data_scadenza}}, fra {{giorni_mancanti}} giorni.

Puoi rispondere a questa email allegando i file, oppure caricarli qui:
{{link_upload}}

Grazie,
Studio
```

## Livello 2 — T-5 · fermo e fattuale

**Oggetto:** `⚠ {{ragione_sociale}} · mancano ancora documenti · scadenza {{data_scadenza}}`

```
Buongiorno {{referente_nome}},

torniamo sulla richiesta del {{data_primo_sollecito}}: mancano ancora questi
documenti e la scadenza si avvicina.

{{elenco_documenti}}

Servono per {{adempimento}} ({{periodo}}), in scadenza il {{data_scadenza}} —
fra {{giorni_mancanti}} giorni.

Se qualcosa di questo elenco non ti risulta dovuto, scrivicelo: sistemiamo noi.
Altrimenti puoi caricarli qui: {{link_upload}}

Grazie,
Studio
```

## Livello 3 — T-2 · urgente, richiede approvazione

**Oggetto:** `🔴 URGENTE · {{ragione_sociale}} · {{adempimento}} scade il {{data_scadenza}}`

```
Buongiorno {{referente_nome}},

{{adempimento}} scade il {{data_scadenza}}, fra {{giorni_mancanti}} giorni, e ci
mancano ancora:

{{elenco_documenti}}

Per rispettare la scadenza ci servono entro domani. Se non riesci, chiamaci oggi
allo {{telefono_studio}}: valutiamo insieme come procedere.

{{firma_operatore}}
Studio
```

---

## Regole

1. **L'elenco è puntuale.** "Estratto conto Intesa di luglio" ottiene risposta;
   "i documenti" no. L'elenco generico è la ragione principale per cui i solleciti
   non funzionano.
2. **Un'email per cliente**, anche se mancano documenti per tre scadenze diverse.
3. **Mai colpevolizzare.** Anche al terzo giro: la relazione dura più della scadenza.
4. **Sempre una via d'uscita facile**: rispondere all'email o un link.
5. Dopo il livello 3 non si scrive più: si telefona, e la telefonata la fa una persona.
