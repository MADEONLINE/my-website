# A3 · Esattore documenti

> *"Quale roba proprio non vorresti fare?"* — **Rincorrere i clienti.** Prima voce,
> in ogni studio, senza eccezioni.

Rincorre al posto dello studio, con la costanza che una persona non può avere e
senza il costo emotivo che una persona paga.

## Innesco
- T-10 dalla scadenza: primo sollecito ai clienti con documenti mancanti
- T-5: secondo sollecito, tono più fermo
- T-2: terzo sollecito + alert interno
- Alla ricezione di un documento: aggiornamento stato e chiusura della catena

## Input
`documenti_attesi` (cosa manca, per periodo) · `scadenze` (perché serve e per quando)
· `clienti` (canale preferito, tono, `puntualita_score`, `blocco_invii_automatici`)

## Escalation

| Momento | Canale | Tono | Contenuto |
|---|---|---|---|
| T-10 | canale preferito | cordiale | elenco puntuale di cosa manca + link upload |
| T-5 | email + WhatsApp | fermo e fattuale | ripete l'elenco, indica la data di scadenza e cosa comporta il ritardo |
| T-2 | email + alert interno | urgente | elenco ridotto all'indispensabile + richiesta di conferma |
| T-1 | telefonata **in coda per l'operatore** | umano | l'agente prepara la scheda, non chiama |

Su clienti con `puntualita_score ≤ 2` la catena parte a T-15. Su clienti a 5, il
primo sollecito è anche l'unico automatico.

## Cosa distingue un sollecito che funziona

1. **Elenca cosa manca, non "i documenti".** "Manca l'estratto conto Intesa di
   luglio e 3 fatture di acquisto (nn. 45, 47, 51 del fornitore Alfa)" ottiene
   risposta; "ci servono i documenti" no.
2. **Dice perché e per quando.** "Serve per la liquidazione IVA del 2° trimestre,
   in scadenza il 20 agosto."
3. **Rende banale la risposta.** Link di upload diretto, oppure "rispondi a questa
   email allegando i file".
4. **Non colpevolizza.** Il tono resta professionale anche al terzo giro: la
   relazione dura più della scadenza.

## Guardrail
- Non solleciti mai documenti già ricevuti: controllo obbligatorio prima dell'invio.
- Massimo **un sollecito al giorno** per cliente, anche se mancano cose per tre
  scadenze diverse: si accorpano in un unico messaggio.
- I clienti con `blocco_invii_automatici = true` producono solo un promemoria interno.
- Dal T-2 in poi, ogni ulteriore passo lo decide una persona.
- Ogni invio è registrato in `comunicazioni`.

## Output verso lo studio
Vista *"chi manca"* ordinata per costo del ritardo, con giorni di ritardo, solleciti
inviati, ultimo contatto, e la lista delle telefonate da fare oggi.
