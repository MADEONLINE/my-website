# A5 · Voce dello Studio

> *"Cosa invii ai tuoi clienti?"* — F24, riepiloghi, scadenze, richieste di
> documenti, bilanci, parcelle. Ogni volta riscritti a mano.

`A5` genera l'email **con i dati dentro**. La differenza tra un template e questo
sistema è che il template va riempito, e riempirlo è il lavoro.

## Innesco
Chiamato dagli altri agenti (`A2`, `A3`, `A4`, `A6`) oppure su richiesta diretta:
*"scrivi a Rossi che l'F24 è pronto"*.

## Input
Template in `templates/email/` · dati del cliente da `clienti` (nome referente,
tono, canale) · dati specifici dell'evento (importi, date, elenchi) dalle tabelle.

## Sei famiglie

| Template | Chi lo chiama | Approvazione |
|---|---|---|
| `01-sollecito-documenti` | `A3` | automatica fino al 2° sollecito |
| `02-liquidazione-iva` | `A4` | **obbligatoria** (contiene importi) |
| `03-f24-in-scadenza` | `A4` | **obbligatoria** (contiene importi) |
| `04-riepilogo-mensile` | `A4` | **obbligatoria** |
| `05-scadenze-del-mese` | `A2` | automatica se nessuna voce `da_confermare` |
| `06-sollecito-parcella` | `A6` | **obbligatoria** dal 2° sollecito |

## Regole di scrittura

1. **Il dato in alto.** L'informazione operativa (importo, data, cosa fare) sta
   nelle prime tre righe. Il contesto viene dopo, per chi lo vuole.
2. **Oggetto che si legge nella notifica.** `Rossi Srl · F24 IVA €4.312,00 ·
   scadenza 20/08` batte `Comunicazione dallo Studio`.
3. **Una sola azione richiesta** per email. Se le azioni sono due, sono due email
   o è una telefonata.
4. **Niente gergo non necessario.** "Liquidazione periodica" resta; "trattasi di"
   e "con la presente si comunica" no.
5. **Tono del cliente, non tono generico.** Il campo `tono_comunicazione` esiste
   per questo: formale / cordiale / diretto.
6. **Mai un segnaposto vuoto.** Se un dato manca, l'email non si genera: si apre
   un'anomalia. `€{{importo}}` che arriva al cliente è un incidente.

## Ciclo di approvazione

```
generazione → coda "da approvare" → revisione (una persona) → invio → registrazione
```

La coda si approva in blocco: l'operatore vede le 12 email in una schermata, con i
dati evidenziati, e rilascia. Il tempo risparmiato sta nella preparazione, non nel
saltare il controllo — che è anche il presidio richiesto da AI Act e L. 132/2025
(vedi `docs/04-ai-act.md`).

## Guardrail
- Nessuna email con importi parte senza `approvata_da`.
- Nessuna interpretazione normativa nel testo: se il cliente ha chiesto un parere,
  `A5` prepara la bozza e la marca **"richiede risposta professionale"**.
- Nessuna promessa di scadenza non presente in `scadenze`.
- Ogni invio scrive una riga in `comunicazioni`, con i dati iniettati, per audit.
