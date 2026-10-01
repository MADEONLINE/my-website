# Sito Dr.ssa Elisa Marzaro · Medico Veterinario

Sito statico (HTML/CSS/JS, nessun framework) collegato a Netlify. Dermatologia e medicina interna di cani e gatti, area Miranese (VE).

## Struttura

| File | Contenuto |
|---|---|
| `index.html` | Home: hero split-screen, chi sono, competenze, segnali da non ignorare, percorso visita, vlog (anteprima), FAQ, contatti con modulo |
| `dermatologia.html` | Pagina SEO dedicata alla dermatologia veterinaria |
| `medicina-interna.html` | Pagina SEO dedicata alla medicina interna veterinaria |
| `vlog.html` | Tutti gli episodi del vlog (foto animate) |
| `privacy.html`, `grazie.html` | Informativa privacy e pagina di conferma del modulo |
| `assets/css/style.css` | Design system (palette azzurro/blu, layout, animazioni) |
| `assets/js/main.js` | Navigazione, reveal on scroll, player del vlog |
| `assets/js/vlog-data.js` | **Elenco episodi del vlog** (titoli, didascalie, foto) |
| `assets/img/` | Immagini. Quelle attuali sono **placeholder SVG** da sostituire |
| `llms.txt`, `robots.txt`, `sitemap.xml` | Ottimizzazione per motori di ricerca e sistemi AI |
| `netlify.toml` | Header di sicurezza, cache, URL puliti |
| `archivio/` | Vecchia landing "Super Master AI Vet 2026" (non più pubblicata) |

## Da completare prima della pubblicazione

1. **Foto reali** (dalla bozza Canva): sostituire i file in `assets/img/` mantenendo i nomi, oppure aggiornare i percorsi nell'HTML.
   - `portrait.svg` → ritratto della dottoressa (hero, formato verticale 4:5)
   - `about.svg` → foto in ambulatorio (sezione Chi sono)
   - `derm.svg`, `med.svg` → foto per i due blocchi competenze (orizzontali)
   - `vlog/epN-1..3` → tre foto per ogni episodio (verticali 4:5). Aggiornare `src` in `assets/js/vlog-data.js`
   - `og.svg` → immagine di anteprima social 1200×630 (meglio in JPG/PNG)
2. **Dati di contatto**: cercare e sostituire in tutti i file HTML e in `llms.txt`
   - `+39 000 000 0000` e `+390000000000` (telefono), `390000000000` (link WhatsApp)
   - `info@elisamarzaro.it`, `Via da confermare, 1`, orari `Lun–Ven 9:00–19:00 · Sab 9:00–13:00`
   - `n. iscrizione da inserire` (Ordine dei Medici Veterinari), `P.IVA da inserire`
3. **Dominio**: sostituire `https://www.elisamarzaro.it` in HTML, `sitemap.xml`, `robots.txt`, `llms.txt`.
4. **Mappa**: incollare l'iframe di Google Maps nel blocco `.map` di `index.html` (commento già presente).
5. **Modulo**: il form usa Netlify Forms (`data-netlify="true"`). Dopo il primo deploy attivare le notifiche email in Netlify → Forms.
6. **Vlog con video reali**: in `vlog-data.js` aggiungere `video: "https://www.youtube.com/embed/ID"` a un episodio per usare un video al posto delle foto animate.
7. Verificare i contenuti clinici e biografici con la dottoressa (in particolare la menzione dell'anestesia come competenza complementare).

## Sviluppo locale

Aprire `index.html` nel browser oppure `python3 -m http.server 8080` nella cartella del progetto.
