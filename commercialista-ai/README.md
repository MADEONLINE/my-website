# Assistente Commercialista AI — Sistema Agenti

Sistema di agenti AI per le **soluzioni amministrative e gestionali di uno studio
commercialista italiano**. Non è un chatbot che "sa di fisco": è un impianto
operativo che risponde con **automazioni, workflow ed email popolate di dati reali**
(scadenze, importi, codici tributo, stato documenti, incassi).

Progettato attorno a sei domande fatte al commercialista:

| Domanda | Cosa produce il sistema | Agente |
|---|---|---|
| Qual è la prima cosa che fai appena arrivi in ufficio? | Briefing delle 8:00 con scadenze a 10 giorni, anomalie, code di lavoro | `A1 · Radar` |
| Quale roba proprio non vorresti fare? | Solleciti documenti, quadrature, inserimenti, rincorsa incassi | `A3`, `A6`, `A7` |
| Cosa fai ogni mese? | Ciclo IVA → LIPE → F24 → ritenute, chiuso cliente per cliente | `A4 · Liquidatore` |
| Cosa invii ai tuoi clienti? | Email con dati, F24, prospetti, riepiloghi mensili | `A5 · Voce dello Studio` |
| Scadenze | Scadenzario per cliente + calendario fiscale con proroghe | `A2 · Scadenziere` |
| Pagamenti | Doppio binario: F24 verso l'Erario + parcelle verso lo studio | `A4` + `A6 · Cassiere` |
| AI Act — come muoversi per essere in regola | Registro usi AI, policy, informative, formazione, presidio umano | `A8 · Garante` |

---

## Struttura

```
commercialista-ai/
├── docs/
│   ├── 01-mappa-studio.md        Le sei domande → risposte tipo → automazioni
│   ├── 02-intake.md              Questionario di taratura sullo studio reale
│   ├── 03-scadenzario.md         Calendario fiscale e regole di slittamento
│   ├── 04-ai-act.md              Conformità AI Act + L. 132/2025 + GDPR
│   └── 05-dati.md                Modello dati (tabelle, campi, chiavi)
├── agents/                       9 agenti: 1 orchestratore + 8 specialisti
├── workflows/
│   ├── README.md                 W01–W09: trigger, passi, guardrail, output
│   └── n8n/                      Due workflow importabili in n8n
├── templates/email/              6 template email con segnaposto dati
└── demo/index.html               Console dimostrativa (dati fittizi)
```

## Come funziona

1. **Il dato sta fuori dall'AI.** La verità è nel gestionale, nel cassetto fiscale,
   nel foglio scadenze, nella banca. Gli agenti leggono, correlano e scrivono —
   non ricordano e non inventano importi.
2. **Un agente = un mestiere.** Ogni agente ha un innesco, un input dichiarato,
   un output verificabile e una regola di escalation all'umano.
3. **Ogni output fiscale passa da un umano.** Nessuna email con importi, nessun
   F24, nessuna comunicazione all'Agenzia parte senza approvazione. È un requisito
   di qualità e, insieme, il presidio richiesto da AI Act e L. 132/2025.
4. **Le automazioni sono a doppio stadio**: l'agente *prepara* (bozza in coda),
   l'operatore *rilascia* (un click). Il tempo si risparmia nella preparazione,
   non saltando il controllo.

## Avvio in 5 passi

1. Compila `docs/02-intake.md` con il commercialista (45 minuti).
2. Crea le tabelle di `docs/05-dati.md` su Airtable o Google Sheet.
3. Attiva `W01` (raccolta documenti) e `W03` (scadenze cliente): sono quelle che
   restituiscono più tempo nella prima settimana.
4. Attiva `A1 · Radar` come primo tocco della giornata.
5. Apri il cantiere AI Act con `docs/04-ai-act.md` — registro e informativa
   prima di mettere l'assistente davanti ai clienti.

## Avvertenze

- Gli importi, i codici tributo e le date usati negli esempi sono **fittizi**.
- Il calendario in `docs/03-scadenzario.md` va **riverificato ogni anno**: proroghe,
  decreti e slittamenti cambiano le date reali.
- `docs/04-ai-act.md` è **guida operativa, non parere legale**. Le valutazioni di
  classificazione del rischio e le clausole contrattuali vanno validate da un legale.
