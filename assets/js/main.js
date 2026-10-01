/* Dr.ssa Elisa Marzaro — script condiviso
   - header/nav (stato scroll, menu mobile, voce attiva)
   - reveal on scroll
   - player "vlog" costruito da foto animate (Ken Burns) o da video esterno
*/
(function () {
  'use strict';

  /* ---------- Header ---------- */
  var top = document.querySelector('.top');
  var onScroll = function () {
    if (!top) return;
    top.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var sheet = document.querySelector('.sheet');
  var openBtn = document.querySelector('[data-open-menu]');
  var closeBtns = document.querySelectorAll('[data-close-menu]');
  function openSheet() { if (!sheet) return; sheet.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeSheet() { if (!sheet) return; sheet.classList.remove('open'); document.body.style.overflow = ''; }
  if (openBtn) openBtn.addEventListener('click', openSheet);
  closeBtns.forEach(function (b) { b.addEventListener('click', closeSheet); });
  if (sheet) sheet.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeSheet); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeSheet(); closePlayer(); } });

  /* ---------- Reveal ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  document.querySelectorAll('.reveal,.clip-reveal').forEach(function (el) {
    if (io) io.observe(el); else el.classList.add('in');
  });

  /* ---------- Voce attiva nel rail (solo pagina con sezioni) ---------- */
  var railLinks = document.querySelectorAll('.rail-nav a[href^="#"], .top-links a[href^="#"]');
  var sections = [];
  railLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var s = document.getElementById(id);
    if (s && sections.indexOf(s) < 0) sections.push(s);
  });
  if (sections.length && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        railLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ---------- Vlog player ---------- */
  var episodes = window.VLOG_EPISODES || [];
  var player = document.querySelector('.player');
  if (!player) return;
  var stage = player.querySelector('.player-stage');
  var cap = player.querySelector('.player-cap');
  var bar = player.querySelector('.player-bar i');
  var dots = player.querySelector('.player-dots');
  var timer = null, frameIdx = 0, current = null, startedAt = 0, FRAME_MS = 6500;

  function closePlayer() {
    if (!player.classList.contains('open')) return;
    player.classList.remove('open');
    document.body.style.overflow = '';
    clearInterval(timer); timer = null;
    stage.innerHTML = '';
    if (lastTrigger) lastTrigger.focus();
  }
  var lastTrigger = null;

  function renderFrame(i) {
    var ep = current;
    var imgs = stage.querySelectorAll('img');
    imgs.forEach(function (im, k) {
      im.classList.remove('on', 'anim-zoom', 'anim-pan', 'anim-drift', 'anim-rise');
      if (k === i) { void im.offsetWidth; im.classList.add('on', 'anim-' + (ep.frames[k].anim || 'zoom')); }
    });
    var f = ep.frames[i];
    cap.innerHTML = '<span class="eyebrow">' + ep.tag + ' · ' + (i + 1) + '/' + ep.frames.length + '</span>' +
      '<h3>' + ep.title + '</h3><p>' + (f.caption || '') + '</p>';
    dots.querySelectorAll('i').forEach(function (d, k) { d.classList.toggle('on', k === i); });
    startedAt = Date.now();
  }
  function tick() {
    var p = Math.min(1, (Date.now() - startedAt) / FRAME_MS);
    bar.style.width = (p * 100) + '%';
    if (p >= 1) { frameIdx = (frameIdx + 1) % current.frames.length; renderFrame(frameIdx); }
  }
  function openEpisode(id, trigger) {
    var ep = episodes.filter(function (e) { return e.id === id; })[0];
    if (!ep) return;
    current = ep; frameIdx = 0; lastTrigger = trigger || null;
    stage.innerHTML = '';
    dots.innerHTML = '';
    if (ep.video) {
      var fr = document.createElement('iframe');
      fr.src = ep.video; fr.allow = 'autoplay; fullscreen; picture-in-picture'; fr.title = ep.title;
      stage.appendChild(fr);
      cap.innerHTML = '<span class="eyebrow">' + ep.tag + '</span><h3>' + ep.title + '</h3><p>' + (ep.summary || '') + '</p>';
      bar.style.width = '100%';
    } else {
      ep.frames.forEach(function (f, k) {
        var im = document.createElement('img');
        im.src = f.src; im.alt = f.alt || ep.title; im.loading = 'eager';
        stage.appendChild(im);
        var d = document.createElement('i'); dots.appendChild(d);
      });
      renderFrame(0);
      clearInterval(timer);
      timer = setInterval(tick, 120);
    }
    player.classList.add('open');
    document.body.style.overflow = 'hidden';
    player.querySelector('[data-close-player]').focus();
  }
  document.querySelectorAll('[data-episode]').forEach(function (b) {
    b.addEventListener('click', function () { openEpisode(b.getAttribute('data-episode'), b); });
  });
  player.querySelectorAll('[data-close-player]').forEach(function (b) { b.addEventListener('click', closePlayer); });
  player.addEventListener('click', function (e) { if (e.target === player) closePlayer(); });
  var prev = player.querySelector('[data-prev]'), next = player.querySelector('[data-next]');
  if (prev) prev.addEventListener('click', function () { if (!current || current.video) return; frameIdx = (frameIdx - 1 + current.frames.length) % current.frames.length; renderFrame(frameIdx); });
  if (next) next.addEventListener('click', function () { if (!current || current.video) return; frameIdx = (frameIdx + 1) % current.frames.length; renderFrame(frameIdx); });

  /* Apertura diretta via hash (#vlog-ep-1) */
  var m = location.hash.match(/^#vlog-(.+)$/);
  if (m) openEpisode(m[1]);
})();
