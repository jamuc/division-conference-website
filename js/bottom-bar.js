/* ═══════════════════════════════════════════════════════
   Sticky bottom bar — mobile news-ticker carousel
   · Rotates between sponsors and upcoming conference
   · Auto-advance with pause on swipe
   · Swipe left/right on touch devices
═══════════════════════════════════════════════════════ */
(function initBottomBarTicker() {
  const bar = document.getElementById('bottomBar');
  if (!bar) return;

  const slides = Array.from(bar.querySelectorAll('.bottom-bar__slide'));
  if (slides.length < 2) return;

  const mq = window.matchMedia('(max-width: 640px)');
  const INTERVAL = 5000;
  const SWIPE_THRESHOLD = 40;

  let idx = 0;
  let timer = null;
  let userInteracted = false;

  function show(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
  }

  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }

  function start() {
    stop();
    if (!mq.matches || userInteracted) return;
    timer = setInterval(next, INTERVAL);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Swipe handling on the bar itself
  let startX = null, startY = null;
  bar.addEventListener('touchstart', (e) => {
    if (!mq.matches || e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  bar.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    startX = startY = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      userInteracted = true;
      stop();
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  // Restart / stop when viewport crosses the mobile breakpoint
  const onMqChange = () => {
    if (mq.matches) {
      show(idx);
      start();
    } else {
      stop();
      // Desktop: show every slide via CSS; clear transient inline state
      slides.forEach(s => s.classList.remove('is-active'));
      slides[0].classList.add('is-active');
    }
  };
  if (mq.addEventListener) mq.addEventListener('change', onMqChange);
  else if (mq.addListener) mq.addListener(onMqChange);

  show(0);
  start();
})();
