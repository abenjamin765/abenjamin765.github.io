/* Native details stay usable without JavaScript. Pointer motion is interruptible;
   keyboard activation and reduced-motion preferences take effect immediately. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controllers = [];

  document.querySelectorAll('details.case-disclosure').forEach((details) => {
    const summary = details.querySelector('summary');
    const body = details.querySelector('.case-disclosure__body');
    if (!summary || !body) return;
    let intendedOpen = details.open;
    let animation = null;

    function finish() {
      const previous = animation;
      animation = null;
      if (previous) previous.cancel();
      details.open = intendedOpen;
      details.classList.remove('is-animating');
      details.dataset.expanded = String(intendedOpen);
      body.inert = !intendedOpen;
    }

    function toggle(animate) {
      const startHeight = details.getBoundingClientRect().height;
      intendedOpen = !intendedOpen;
      if (body.contains(document.activeElement) && !intendedOpen) {
        summary.focus({ preventScroll: true });
      }
      if (!animate || reducedMotion.matches || typeof details.animate !== 'function') {
        finish();
        return;
      }
      if (animation) animation.cancel();
      // Measure natural open and closed heights before painting either state.
      details.classList.remove('is-animating');
      details.open = intendedOpen;
      const endHeight = details.getBoundingClientRect().height;
      details.open = true;
      details.dataset.expanded = String(intendedOpen);
      body.inert = !intendedOpen;
      details.classList.add('is-animating');
      const next = details.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: intendedOpen ? 220 : 180, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'both' }
      );
      animation = next;
      next.onfinish = () => { if (animation === next) finish(); };
    }

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      toggle(event.detail > 0);
    });
    details.addEventListener('toggle', () => {
      if (animation) return;
      intendedOpen = details.open;
      details.dataset.expanded = String(intendedOpen);
      body.inert = !intendedOpen;
    });
    finish();
    controllers.push(finish);
  });

  // A resized viewport or preference change should never leave clipped content.
  window.addEventListener('resize', () => controllers.forEach((finish) => finish()));
  reducedMotion.addEventListener('change', () => controllers.forEach((finish) => finish()));
})();
