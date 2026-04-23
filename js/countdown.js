/* ═══════════════════════════════════════════════════════
   Registration deadline countdown
   Drops into any [data-countdown] element.
   Reads deadline from data-countdown-deadline (ISO 8601).
═══════════════════════════════════════════════════════ */
(function () {
  const DEADLINE = new Date('2026-04-24T12:00:00+02:00');

  const strings = {
    en: {
      closesPrefix: 'Registration closes',
      dateLabel:    'Fri 24 April, 12:00',
      remaining:    (t) => `· ${t} left`,
      closed:       'Registration closed',
      days: 'd', hours: 'h', mins: 'm', secs: 's',
    },
    de: {
      closesPrefix: 'Anmeldeschluss',
      dateLabel:    'Fr 24. April, 12:00',
      remaining:    (t) => `· noch ${t}`,
      closed:       'Anmeldung geschlossen',
      days: 'T', hours: 'Std', mins: 'Min', secs: 'Sek',
    },
  };

  function getLang() {
    return (localStorage.getItem('tm-lang') || document.documentElement.lang || 'en').startsWith('de') ? 'de' : 'en';
  }

  function formatRemaining(ms, L) {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    if (h >= 1) return `${h}${L.hours} ${m}${L.mins}`;
    if (m >= 1) return `${m}${L.mins} ${s}${L.secs}`;
    return `${s}${L.secs}`;
  }

  function render() {
    const L = strings[getLang()];
    const now = new Date();
    const diff = DEADLINE - now;
    const expired = diff <= 0;

    document.querySelectorAll('[data-countdown]').forEach((el) => {
      if (expired) {
        el.classList.add('countdown--expired');
        el.innerHTML = `<span class="countdown__icon" aria-hidden="true">🔒</span><span class="countdown__text">${L.closed}</span>`;
      } else {
        const urgent = diff < 24 * 3600 * 1000;
        el.classList.toggle('countdown--urgent', urgent);
        el.innerHTML =
          `<span class="countdown__icon" aria-hidden="true">⏳</span>` +
          `<span class="countdown__text">` +
            `<strong>${L.closesPrefix} ${L.dateLabel}</strong> ` +
            `<span class="countdown__remaining">${L.remaining(formatRemaining(diff, L))}</span>` +
          `</span>`;
      }
    });
  }

  function start() {
    if (!document.querySelector('[data-countdown]')) return;
    render();
    // Tick every second when <1h, else every minute — saves CPU.
    setInterval(() => {
      const diff = DEADLINE - new Date();
      if (diff < 3600 * 1000 || diff <= 0) render();
    }, 1000);
    setInterval(render, 60 * 1000);
    // Re-render on language toggle
    window.addEventListener('storage', render);
    document.addEventListener('click', (e) => {
      if (e.target.closest('#langToggle, #langToggleFooter, #langEn, #langDe')) {
        setTimeout(render, 50);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
