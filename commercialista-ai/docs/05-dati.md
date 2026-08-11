# 05 · Modello dati

Il sistema è utile quanto è pulito questo strato. Gli agenti non conservano
memoria: leggono e scrivono qui. Implementabile su Airtable, Google Sheet,
Notion database o un qualsiasi DB relazionale — cambia il connettore, non lo schema.

Convenzioni: chiavi in `snake_case`, date in `YYYY-MM-DD`, importi in euro con due
decimali, ogni tabella ha `updated_at` e `updated_by` (`agent:<nome>` oppure
`user:<iniziali>`).

---

## `clienti`

L'anagrafica è ciò che determina quali scadenze si applicano. Ogni campo qui è un
filtro nello scadenzario.

| Campo | Tipo | Note |
|---|---|---|
| `client_id` | testo | chiave |
| `ragione_sociale` | testo | |
| `forma_giuridica` | enum | ditta_individuale, snc, sas, srl, srls, spa, professionista, ente |
| `partita_iva` / `codice_fiscale` | testo | |
| `regime_fiscale` | enum | ordinario, semplificato, forfettario, minimi_residuale |
| `periodicita_iva` | enum | mensile, trimestrale, esente, non_soggetto |
| `sostituto_imposta` | bool | genera ritenute, CU, 770 |
| `dipendenti` | intero | genera contributi e addizionali |
| `operazioni_estere` | bool | genera dati transfrontalieri, INTRASTAT |
| `immobili` | bool | genera IMU |
| `referente_nome` / `referente_email` / `referente_whatsapp` | testo | |
| `canale_preferito` | enum | email, whatsapp, telefono, portale |
| `operatore_studio` | testo | chi ha la palla |
| `tono_comunicazione` | enum | formale, cordiale, diretto |
| `puntualita_score` | 1–5 | calcolato da `A7`, guida l'aggressività dei solleciti |
| `stato` | enum | attivo, sospeso, cessato |
| `blocco_invii_automatici` | bool | interruttore per i clienti delicati |
| `consenso_informativa_ai` | data | quando è stato informato dell'uso di AI (vedi `04-ai-act.md`) |

## `scadenze`

Una riga per **cliente × adempimento × periodo**. È il cuore del sistema.

| Campo | Tipo | Note |
|---|---|---|
| `scadenza_id` | testo | `{client_id}-{codice}-{periodo}` |
| `client_id` | ref | |
| `codice_adempimento` | testo | es. `IVA_MENSILE`, `LIPE_T2`, `F24_RITENUTE`, `BILANCIO` |
| `descrizione` | testo | |
| `periodo_riferimento` | testo | `2026-07`, `2026-T2`, `2025` |
| `data_scadenza` | data | dopo slittamenti |
| `data_interna_documenti` | data | T-10 |
| `data_interna_lavorazione` | data | T-5 |
| `data_interna_approvazione` | data | T-2 |
| `stato` | enum | da_avviare, documenti_mancanti, in_lavorazione, pronto, inviato, pagato, non_dovuto |
| `importo_previsto` | valuta | dal gestionale, mai stimato |
| `importo_definitivo` | valuta | |
| `codici_tributo` | testo | |
| `note` | testo lungo | |
| `fonte_data` | enum | calendario_base, provvedimento, manuale |
| `da_confermare` | bool | true se la data deriva da un provvedimento non ancora verificato |

## `documenti_attesi`

Alimenta `A3 · Esattore`: senza questa tabella i solleciti sono generici e quindi inutili.

| Campo | Tipo | Note |
|---|---|---|
| `doc_id` | testo | |
| `client_id` | ref | |
| `periodo` | testo | |
| `tipo` | enum | estratto_conto, fatture_attive, fatture_passive, corrispettivi, prima_nota, contratti, f24_pagato, altro |
| `obbligatorio` | bool | |
| `stato` | enum | atteso, ricevuto, incompleto, non_applicabile |
| `data_ricezione` | data | |
| `solleciti_inviati` | intero | |
| `data_ultimo_sollecito` | data | |
| `canale_ultimo_sollecito` | enum | |

## `f24`

| Campo | Tipo | Note |
|---|---|---|
| `f24_id` | testo | |
| `client_id` / `scadenza_id` | ref | |
| `importo_totale` | valuta | |
| `dettaglio_tributi` | json | `[{codice, periodo, importo}]` |
| `data_scadenza` | data | |
| `modalita_pagamento` | enum | delega_studio, autonomo_cliente |
| `stato` | enum | bozza, approvato, inviato_cliente, pagato, non_pagato, ravvedimento |
| `data_invio` / `data_pagamento` | data | |
| `conferma_cliente` | bool | |
| `approvato_da` | testo | **obbligatorio prima di `inviato_cliente`** |

## `parcelle`

| Campo | Tipo | Note |
|---|---|---|
| `parcella_id` | testo | |
| `client_id` | ref | |
| `numero` / `data_emissione` / `data_scadenza` | | |
| `imponibile` / `iva` / `totale` | valuta | |
| `stato` | enum | emessa, incassata_parziale, incassata, insoluta, contestata |
| `incassato` | valuta | |
| `iban_noto` | testo | IBAN da cui il cliente ha già pagato: abilita l'abbinamento automatico in `W06` |
| `giorni_scaduto` | calcolato | |
| `fascia` | calcolato | 0-30, 31-60, 61-90, oltre_90 |
| `solleciti` | intero | |
| `escalation` | enum | nessuna, email_1, email_2, telefonata, blocco_servizio |

## `comunicazioni`

Registro di tutto ciò che esce. Serve al lavoro e serve alla conformità: è la
prova documentale di quali output AI sono stati rivisti e da chi.

| Campo | Tipo | Note |
|---|---|---|
| `com_id` | testo | |
| `client_id` | ref | |
| `tipo` | enum | template usato |
| `canale` | enum | |
| `generata_da` | testo | `agent:A5` |
| `approvata_da` | testo | iniziali operatore, **vuoto = non inviabile** |
| `data_generazione` / `data_invio` | timestamp | |
| `contenuto` | testo lungo | testo effettivamente inviato |
| `dati_iniettati` | json | valori usati nei segnaposto, per audit |
| `esito` | enum | inviata, aperta, risposta, bounce |

## `anomalie`

| Campo | Tipo | Note |
|---|---|---|
| `anomalia_id` | testo | |
| `client_id` | ref | |
| `tipo` | enum | quadratura, salto_numerazione, aliquota_anomala, scostamento_iva, documento_mancante, f24_non_pagato, dato_incoerente |
| `gravita` | enum | info, attenzione, critica |
| `descrizione` | testo | cosa non torna, con i numeri |
| `rilevata_da` | testo | `agent:A7` |
| `stato` | enum | aperta, in_verifica, risolta, falso_positivo |

## `registro_ai`

Richiesto dall'impianto di conformità (`04-ai-act.md`). Una riga per sistema/uso AI.

| Campo | Tipo | Note |
|---|---|---|
| `uso_id` | testo | |
| `denominazione` | testo | |
| `fornitore` / `modello` | testo | |
| `finalita` | testo | |
| `dati_trattati` | testo | categorie, presenza di dati personali o particolari |
| `classificazione_rischio` | enum | minimo, limitato, alto, vietato |
| `ruolo_studio` | enum | deployer, provider | |
| `presidio_umano` | testo | chi controlla cosa, prima di quale rilascio |
| `base_giuridica_gdpr` | testo | |
| `dpa_firmato` | bool | |
| `training_su_dati_disattivato` | bool | |
| `data_valutazione` / `prossima_revisione` | data | |

---

## Relazioni

```
clienti 1 ── n scadenze ── 1 f24
   │            │
   │            └── n documenti_attesi
   ├── n parcelle
   ├── n comunicazioni
   └── n anomalie

registro_ai  (trasversale, non legato al cliente)
```

## Regole di integrità

- Una `comunicazione` con importi non può passare a `inviata` senza `approvata_da`.
- Un `f24` non può passare a `inviato_cliente` senza `approvato_da`.
- Una `scadenza` in stato `pagato` richiede un `f24` collegato in stato `pagato`.
- Ogni campo scritto da un agente porta `updated_by = agent:<nome>`: dev'essere
  sempre possibile distinguere ciò che ha scritto una macchina da ciò che ha
  scritto una persona.
