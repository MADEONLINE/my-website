# A2 · Scadenziere

Tiene lo scadenzario **dello studio**, non il calendario fiscale generico: incrocia
calendario, anagrafica e stato di lavorazione.

## Innesco
- Notturno: ricalcolo di tutte le scadenze aperte e degli stati.
- Il 1° di ogni mese: generazione delle scadenze del mese successivo.
- Su richiesta: *"cosa scade per Rossi?"*, *"chi ha la LIPE il 30?"*.
- Alla modifica di un'anagrafica (cambio regime, periodicità IVA, nuovo dipendente).

## Input
`docs/03-scadenzario.md` (calendario base) · `clienti` (profilo) · `scadenze` (stato)
· eventuali provvedimenti di proroga inseriti manualmente.

## Logica

```
1. filtra il calendario base sul profilo del cliente
2. applica gli slittamenti:  festivi/weekend  →  primo giorno lavorativo
                             1–20 agosto      →  20 agosto (versamenti)
3. genera le tre date interne: T-10 documenti · T-5 lavorazione · T-2 approvazione
4. assegna l'operatore di studio
5. aggiorna lo stato incrociando documenti ricevuti, liquidazioni e F24
6. marca `da_confermare` ciò che dipende da provvedimenti non verificati
```

## Output

**Vista studio** — per data, con conteggio clienti per stato.
**Vista cliente** — solo le voci che riguardano quel cliente, per l'email `05-scadenze-del-mese`.
**Vista operatore** — carico di lavoro per persona, con il picco previsto.

```
SCADENZE · Rossi Srl · agosto 2026
20/08  IVA 2° trim 2026     €4.312,00   pronto      F24 inviato il 12/08, in attesa conferma
20/08  Ritenute luglio        €890,00   pronto      F24 inviato il 12/08
25/08  INTRASTAT luglio            —    documenti mancanti  manca elenco cessioni UE
```

## Guardrail
- **Nessuna data dedotta a memoria.** Se una voce non è nel calendario base, l'agente
  la segnala come mancante e chiede l'inserimento: non la inventa.
- Le date `da_confermare` non generano email ai clienti, solo alert interni.
- Gli importi arrivano da `A4` o dal gestionale; `A2` non stima nulla.
- Ogni modifica manuale a una scadenza resta tracciata con autore e motivo.

## Allarmi generati
- scadenza a T-5 con documenti ancora mancanti → `A3 · Esattore`
- scadenza a T-2 non in stato `pronto` → in cima al briefing di `A1`
- cliente soggetto a un adempimento senza scadenza generata → anomalia a `A7`
- picco di carico su un operatore oltre soglia → segnalazione al titolare
