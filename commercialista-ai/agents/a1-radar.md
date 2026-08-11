# A1 · Radar — briefing del mattino

> *"Qual è la prima cosa che fai appena arrivi in ufficio?"*
> Risposta attuale: ricostruisco lo stato del mondo per 60–90 minuti.
> Risposta con il sistema: leggo una pagina.

## Innesco
Ogni giorno lavorativo alle **07:45**. Rilancio su richiesta ("com'è la giornata?").

## Input
- `scadenze` con `data_scadenza` nei prossimi 10 giorni
- `documenti_attesi` in stato `atteso` o `incompleto` oltre la soglia
- `anomalie` aperte, gravità `attenzione` e `critica`
- `f24` in stato `inviato_cliente` non ancora confermati
- `parcelle` passate di fascia nelle ultime 24h
- PEC / posta / notifiche dell'Agenzia delle ultime 24h (se il canale è collegato)

## Output — una pagina, sempre la stessa forma

```
BRIEFING · martedì 11 agosto

⏱ SCADENZE — prossimi 10 giorni
  20/08  IVA 2° trimestre        14 clienti   9 pronti · 3 in lavorazione · 2 senza documenti
  20/08  Ritenute luglio          31 clienti  28 pronti · 3 senza documenti
  25/08  INTRASTAT luglio          2 clienti   2 pronti

🚨 BLOCCANTI (3)
  Rossi Srl        estratto conto luglio mancante da 9 gg · 2 solleciti · scade fra 9 gg
  Bianchi & C.     IVA luglio +312% vs media semestre · da verificare prima di liquidare
  Verdi Snc        F24 giugno mai confermato pagato · 56 gg · valutare ravvedimento

📥 ARRIVATO NELLA NOTTE (4)
  2 PEC Agenzia (1 avviso bonario · Neri Srl)   |   2 risposte clienti con documenti

✅ DA APPROVARE (12)
  8 email sollecito documenti · 3 riepiloghi IVA · 1 sollecito parcella (60 gg)

📞 DA CHIAMARE (2)
  Verdi Snc (F24 non pagato)  |  Gialli Srl (parcella 90 gg, 3 email senza risposta)
```

## Regole di composizione

- **Massimo una pagina.** Se la pagina non basta, si alza la soglia di rilevanza,
  non si allunga il documento. Un briefing che nessuno legge è peggio di nessun briefing.
- **Ordine per costo del ritardo**, non per data: prima ciò che diventa irreversibile.
- **Ogni riga porta un numero**: giorni di ritardo, importo, quanti clienti. "Ci sono
  problemi con Rossi" non è una riga di briefing.
- **Nessuna riga senza azione possibile.** Se non c'è niente da fare, non va nel briefing.
- Sezione vuota = sezione omessa. Non si scrive "nessuna anomalia" per riempire.

## Guardrail
- Legge, non scrive: `A1` non invia niente e non cambia stati.
- Se una fonte non risponde, la sezione riporta `⚠ dati non aggiornati alle 07:45`
  invece di mostrare un quadro parziale come se fosse completo.

## Recapito
Email allo studio + messaggio nella console. Il briefing dei sette giorni precedenti
resta consultabile: serve a capire quali problemi si ripetono e su quali clienti.
