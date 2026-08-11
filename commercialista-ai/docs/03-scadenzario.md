# 03 · Scadenzario fiscale — base di conoscenza

Base ricorrente su cui `A2 · Scadenziere` costruisce lo scadenzario **per cliente**.

> ⚠️ **Da riverificare ogni anno prima dell'uso.** Proroghe, decreti e slittamenti
> cambiano le date reali quasi ogni stagione. Questo file è il telaio: la fonte
> autorevole resta il calendario fiscale dell'Agenzia delle Entrate e le circolari
> dell'anno in corso. L'agente **non deve dedurre date a memoria**: legge questa
> tabella, applica le regole di slittamento, e se una scadenza risulta modificata da
> un provvedimento la segnala come *"da confermare"* invece di ricalcolarla da sé.

---

## Regole di slittamento (si applicano prima di qualsiasi calcolo)

1. **Giorno non lavorativo** — scadenza che cade di sabato, domenica o festivo
   slitta al primo giorno lavorativo successivo.
2. **Sospensione feriale dei versamenti** — i versamenti con scadenza dal 1° al 20
   agosto si considerano tempestivi se effettuati entro il 20 agosto.
3. **Modello F24 e giorni bancari** — l'addebito richiede che la delega sia
   trasmessa entro i termini dell'intermediario: lo studio anticipa di norma di
   2 giorni lavorativi.
4. **Anticipo interno di studio** — ogni scadenza esterna genera scadenze interne a
   T-10 (documenti), T-5 (lavorazione), T-2 (approvazione e invio).

---

## Ricorrenze mensili

| Giorno | Adempimento | A chi si applica |
|---|---|---|
| 16 | Versamento IVA mensile (codici tributo 6001–6012) | Contribuenti IVA mensili |
| 16 | Versamento ritenute d'acconto operate nel mese precedente (es. 1040 lavoro autonomo, 1001 lavoro dipendente) | Sostituti d'imposta |
| 16 | Versamento contributi INPS dipendenti | Datori di lavoro |
| 16 | Versamento addizionali regionali/comunali trattenute | Sostituti d'imposta |
| 25 | Elenchi INTRASTAT mensili | Soggetti sopra soglia con scambi UE |
| Fine mese | Registrazione fatture e corrispettivi del mese | Tutti i soggetti IVA |
| Entro 12 gg dall'operazione | Emissione fattura elettronica immediata | Tutti i soggetti IVA |
| Entro il 15 del mese successivo | Emissione fatture differite del mese precedente | Soggetti con DDT |
| Entro il 15 del mese successivo | Trasmissione dati acquisti transfrontalieri via SdI | Soggetti con operazioni estere |

## Ricorrenze trimestrali

| Scadenza | Adempimento | Note |
|---|---|---|
| 16 maggio | Versamento IVA 1° trimestre | Maggiorazione interessi 1% |
| 20 agosto | Versamento IVA 2° trimestre | Slittamento feriale già incorporato |
| 16 novembre | Versamento IVA 3° trimestre | |
| Saldo annuale | 4° trimestre | Confluisce nel saldo IVA annuale, non ha versamento autonomo |
| 31 maggio | LIPE 1° trimestre | Comunicazione liquidazioni periodiche |
| 30 settembre | LIPE 2° trimestre | |
| 30 novembre | LIPE 3° trimestre | |
| 28 febbraio | LIPE 4° trimestre | Assorbita se la dichiarazione IVA annuale è presentata entro febbraio |
| 16 feb / 16 mag / 20 ago / 16 nov | Contributi fissi INPS artigiani e commercianti | Quota fissa; l'eccedenza segue i termini dei redditi |

## Ricorrenze annuali

| Periodo indicativo | Adempimento | Note |
|---|---|---|
| 16 marzo | Tassa annuale vidimazione libri sociali | Società di capitali |
| 16 marzo | Certificazione Unica: trasmissione e consegna | **Verificare l'anno**: per i redditi di lavoro autonomo il termine è stato differito rispetto ai dipendenti |
| 16 marzo | Saldo IVA annuale (o rateizzazione / differimento con maggiorazione) | |
| 1 febbraio – 30 aprile | Dichiarazione IVA annuale | Finestra di presentazione |
| 30 aprile / 29 giugno | Approvazione bilancio d'esercizio | 120 giorni, o 180 nei casi previsti dallo statuto/legge |
| +30 gg dall'approvazione | Deposito bilancio al Registro Imprese | |
| 16 giugno | Acconto IMU | Se posseduti immobili |
| 30 giugno | Saldo e primo acconto imposte sui redditi, IRAP, cedolare, contributi eccedenti | Differimento con maggiorazione 0,40% nei termini previsti; per i soggetti ISA verificare le proroghe dell'anno |
| Estate | Adesione/rinnovo Concordato Preventivo Biennale | **Termine variabile per anno d'imposta: verificare** |
| 30 novembre | Secondo o unico acconto imposte sui redditi | |
| 31 ottobre | Presentazione Modello Redditi e IRAP | Verificare eventuali proroghe |
| 31 ottobre | Modello 770 | |
| 16 dicembre | Saldo IMU | |
| 27 dicembre | Acconto IVA | Metodo storico / previsionale / effettivo |
| Entro fine anno | Diritto annuale CCIAA | Versato con il primo acconto redditi |

## Adempimenti non fiscali da tracciare

Spesso dimenticati, sempre costosi:

- rinnovo firma digitale e PEC (con preavviso 60 giorni);
- rinnovo cariche sociali e revisore;
- autovalutazione del rischio antiriciclaggio e aggiornamento dell'adeguata verifica;
- rinnovo contratti di locazione e relative imposte di registro;
- scadenze contributive di casse professionali;
- rinnovo deleghe al cassetto fiscale.

---

## Come l'agente costruisce lo scadenzario del singolo cliente

```
per ogni cliente:
    profilo = anagrafica(regime, periodicità IVA, sostituto d'imposta,
                         dipendenti, immobili, operazioni estere, forma giuridica)
    voci = calendario_base filtrato su profilo
    per ogni voce:
        data_esterna  = applica_slittamenti(data_nominale)
        data_interna  = [T-10 documenti, T-5 lavorazione, T-2 approvazione]
        stato         = da_avviare | documenti_mancanti | in_lavorazione |
                        pronto | inviato | pagato | non_dovuto
        titolare      = operatore assegnato
```

Tre principi non negoziabili:

1. **Nessuna data inventata.** Se una voce non è nel calendario base o è marcata
   *da confermare*, l'agente la espone come tale e non la trasforma in una scadenza
   attiva verso il cliente.
2. **Gli importi vengono dal gestionale.** L'agente non stima quanto si paga: lo
   legge, e se il dato manca scrive "importo non disponibile".
3. **Le scadenze mancanti sono un'anomalia**, non un silenzio. Se un cliente
   soggetto a IVA mensile non ha una liquidazione al giorno 12, `A7 · Sentinella`
   apre un alert.
