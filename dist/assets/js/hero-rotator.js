(function () {
  const slot = document.querySelector('.folio-hero__rotator');
  if (!slot) return;
  const words = Array.from(slot.querySelectorAll('.folio-hero__word'));
  const toggle = document.querySelector('.folio-motion-toggle');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const statement = document.querySelector('.folio-hero__statement');
  const heading = document.querySelector('.folio-hero__title');
  function fitStatement() {
    if (!statement || !heading) return;
    const style = window.getComputedStyle(heading);
    const baseSize = parseFloat(style.fontSize);
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none;';
    probe.style.font = style.font;
    probe.style.letterSpacing = style.letterSpacing;
    document.body.appendChild(probe);
    let widest = 0;
    words.forEach(word => {
      probe.textContent = 'Then we ship something ' + word.textContent.trim();
      widest = Math.max(widest, probe.getBoundingClientRect().width);
    });
    probe.remove();
    if (widest > 0) statement.style.fontSize = Math.min(baseSize, baseSize * (statement.clientWidth - 2) / widest) + 'px';
  }
  if (statement) new ResizeObserver(fitStatement).observe(statement);
  document.fonts.ready.then(fitStatement);
  window.addEventListener('resize', fitStatement);
  fitStatement();
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
