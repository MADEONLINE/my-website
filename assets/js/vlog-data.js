/* Episodi del vlog.
   Ogni episodio è costruito da 3 foto animate (Ken Burns) con didascalia,
   oppure da un video esterno (campo "video": URL embed YouTube/Vimeo).
   Per sostituire le foto: caricare i file in assets/img/vlog/ e aggiornare "src".
   anim: zoom | pan | drift | rise
*/
window.VLOG_EPISODES = [
  {
    id: 'ep1',
    tag: 'Dermatologia',
    title: 'Prurito nel cane: da dove si comincia',
    dur: '3 foto · 20 s',
    summary: 'Il percorso diagnostico del prurito, spiegato con calma: parassiti, allergie, infezioni secondarie.',
    frames: [
      { src: 'assets/img/vlog/ep1-1.svg', anim: 'zoom', alt: 'Visita dermatologica: osservazione della cute del cane', caption: 'Il prurito non è una diagnosi ma un sintomo. Prima di tutto escludiamo i parassiti, poi le infezioni secondarie.' },
      { src: 'assets/img/vlog/ep1-2.svg', anim: 'pan', alt: 'Esame citologico al microscopio', caption: 'La citologia in ambulatorio dice subito se ci sono batteri o lieviti: cambia la terapia nel giro di pochi minuti.' },
      { src: 'assets/img/vlog/ep1-3.svg', anim: 'drift', alt: 'Proprietario e cane sereni a fine visita', caption: 'Solo a questo punto si parla di allergia. Una dieta privativa ben fatta vale più di qualunque test rapido.' }
    ]
  },
  {
    id: 'ep2',
    tag: 'Dermatologia',
    title: 'Otite ricorrente: perché torna sempre',
    dur: '3 foto · 20 s',
    summary: 'L’orecchio è pelle. Se l’otite si ripresenta, la causa è quasi sempre fuori dall’orecchio.',
    frames: [
      { src: 'assets/img/vlog/ep2-1.svg', anim: 'rise', alt: 'Esame otoscopico', caption: 'Otoscopia e citologia del cerume: ogni otite ha una firma microbiologica diversa.' },
      { src: 'assets/img/vlog/ep2-2.svg', anim: 'zoom', alt: 'Pulizia auricolare', caption: 'Pulizia corretta a casa: mostro al proprietario come farla senza stress per l’animale.' },
      { src: 'assets/img/vlog/ep2-3.svg', anim: 'pan', alt: 'Cane con orecchie sane', caption: 'Trattare la causa primaria, non solo il sintomo: è l’unico modo per interrompere il ciclo.' }
    ]
  },
  {
    id: 'ep3',
    tag: 'Medicina interna',
    title: 'Beve e urina di più: cosa significa',
    dur: '3 foto · 20 s',
    summary: 'Poliuria e polidipsia sono il campanello di molte malattie interne: come le indaghiamo.',
    frames: [
      { src: 'assets/img/vlog/ep3-1.svg', anim: 'zoom', alt: 'Gatto che beve dalla ciotola', caption: 'Misurare quanto beve l’animale in 24 ore è il primo esame, e lo fa il proprietario a casa.' },
      { src: 'assets/img/vlog/ep3-2.svg', anim: 'drift', alt: 'Analisi di laboratorio', caption: 'Esame delle urine ed esami del sangue: reni, fegato, glicemia e ormoni in un’unica seduta.' },
      { src: 'assets/img/vlog/ep3-3.svg', anim: 'rise', alt: 'Ecografia addominale', caption: 'L’ecografia completa il quadro e ci permette di impostare un piano terapeutico su misura.' }
    ]
  },
  {
    id: 'ep4',
    tag: 'Medicina interna',
    title: 'Il gatto anziano: controlli che fanno la differenza',
    dur: '3 foto · 20 s',
    summary: 'Dopo i 10 anni il gatto cambia in silenzio: pressione, reni, tiroide. Un check-up annuale basta.',
    frames: [
      { src: 'assets/img/vlog/ep4-1.svg', anim: 'pan', alt: 'Gatto anziano in visita', caption: 'Perdita di peso lenta e pelo opaco sono spesso i primi segni di malattia renale o ipertiroidismo.' },
      { src: 'assets/img/vlog/ep4-2.svg', anim: 'zoom', alt: 'Misurazione della pressione', caption: 'La misurazione della pressione è indolore e rivela danni che altrimenti scopriremmo troppo tardi.' },
      { src: 'assets/img/vlog/ep4-3.svg', anim: 'drift', alt: 'Proprietario con il gatto a casa', caption: 'Con una diagnosi precoce il gatto anziano vive più a lungo e meglio. E il proprietario sa cosa aspettarsi.' }
    ]
  },
  {
    id: 'ep5',
    tag: 'Dietro le quinte',
    title: 'Una giornata in ambulatorio',
    dur: '3 foto · 20 s',
    summary: 'Come organizzo le visite, perché dedico tempo alla storia clinica e cosa succede dopo.',
    frames: [
      { src: 'assets/img/vlog/ep5-1.svg', anim: 'rise', alt: 'Ambulatorio al mattino', caption: 'Ogni visita specialistica dura almeno 40 minuti: la storia clinica è metà della diagnosi.' },
      { src: 'assets/img/vlog/ep5-2.svg', anim: 'pan', alt: 'Microscopio e strumenti', caption: 'Microscopio, otoscopio, ecografo: la maggior parte degli esami si fa subito, senza rimandare.' },
      { src: 'assets/img/vlog/ep5-3.svg', anim: 'zoom', alt: 'Referto consegnato al proprietario', caption: 'A fine visita il proprietario esce con un referto scritto e un piano chiaro. Niente dubbi a casa.' }
    ]
  },
  {
    id: 'ep6',
    tag: 'Consigli',
    title: 'Cosa portare alla prima visita',
    dur: '3 foto · 20 s',
    summary: 'Tre cose che accelerano la diagnosi: referti precedenti, foto delle lesioni e il diario dei sintomi.',
    frames: [
      { src: 'assets/img/vlog/ep6-1.svg', anim: 'zoom', alt: 'Cartella clinica e referti', caption: 'Portate tutti i referti e i farmaci usati finora, anche quelli che “non hanno funzionato”.' },
      { src: 'assets/img/vlog/ep6-2.svg', anim: 'drift', alt: 'Foto delle lesioni sul telefono', caption: 'Le lesioni cambiano: una foto di quando il problema era al massimo vale più di mille parole.' },
      { src: 'assets/img/vlog/ep6-3.svg', anim: 'rise', alt: 'Diario dei sintomi', caption: 'Un diario dei sintomi di 2 settimane ci dice se c’è una stagionalità o un legame con il cibo.' }
    ]
  }
];
