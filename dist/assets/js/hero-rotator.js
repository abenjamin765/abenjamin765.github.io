(function () {
  const slot = document.querySelector('.folio-hero__rotator');
  if (!slot) return;
  const words = Array.from(slot.querySelectorAll('.folio-hero__word'));
  const toggle = document.querySelector('.folio-motion-toggle');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer = null, paused = false;
  function stop() { window.clearInterval(timer); timer = null; }
  function show(next) {
    words.forEach((word, i) => word.classList.toggle('is-current', i === next));
    index = next;
  }
  function sync() {
    stop();
    if (preference.matches) show(0);
    if (toggle) {
      toggle.hidden = preference.matches;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? 'Resume word rotation' : 'Pause word rotation';
    }
    if (!preference.matches && !paused && !document.hidden) {
      timer = window.setInterval(() => show((index + 1) % words.length), 2200);
    }
  }
  if (toggle) toggle.addEventListener('click', () => { paused = !paused; sync(); });
  preference.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  show(0); sync();
})();
