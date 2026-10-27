/* One-time reading entrances. Content is visible unless enhancement succeeds. */
(() => {
  const root = document.querySelector('[data-case-scroll]');
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (!root || document.hidden || reduced?.matches || !('IntersectionObserver' in window)) return;

  const elements = [...root.querySelectorAll([
    '.case-cover',
    '.case-facts dl > div',
    '.case-chapter-body > h2',
    '.case-chapter-body > .case-prose',
    '.case-chapter-body > .case-decision',
    '.case-chapter-body > .case-evidence',
    '.case-chapter-body > .case-disclosure',
    '.case-outcome-inner',
    '.case-next'
  ].join(','))];
  const groups = elements.map(element => ({element, state:'pending', timer:0}));
  const duration = parseFloat(getComputedStyle(root).getPropertyValue('--case-reveal-duration')) || 1400;
  let observer;
  let scrollFrame = 0;

  const settle = group => {
    clearTimeout(group.timer);
    group.state = 'settled';
    group.element.dataset.caseReveal = 'settled';
    group.element.style.removeProperty('transition-delay');
    observer?.unobserve(group.element);
  };
  const settleAll = () => {
    groups.forEach(settle);
    observer?.disconnect();
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
  };
  const reveal = (group, delay) => {
    observer.unobserve(group.element);
    if (reduced?.matches || document.hidden || group.element.contains(document.activeElement)) {
      settle(group);
      return;
    }
    group.state = 'running';
    group.element.style.transitionDelay = `${delay}ms`;
    group.element.dataset.caseReveal = 'visible';
    group.timer = setTimeout(() => settle(group), duration + delay + 50);
  };

  try {
    observer = new IntersectionObserver(entries => {
      try {
        const entering = new Set(entries.filter(entry => entry.isIntersecting).map(entry => entry.target));
        groups.filter(group => group.state === 'pending' && entering.has(group.element))
          .forEach((group, index) => reveal(group, Math.min(index, 2) * 180));
      } catch { settleAll(); }
    }, {rootMargin:'0px 0px -64px 0px', threshold:0});

    // Never hide content already visible, including a restored scroll position.
    groups.forEach(group => {
      const box = group.element.getBoundingClientRect();
      if (box.top < innerHeight || group.element.contains(document.activeElement)) settle(group);
      else {
        group.element.dataset.caseReveal = 'pending';
        observer.observe(group.element);
      }
    });

    // Scroll checking only settles skipped content; CSS drives every animation.
    addEventListener('scroll', () => {
      if (scrollFrame || groups.every(group => group.state === 'settled')) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        groups.filter(group => group.state === 'pending' && group.element.getBoundingClientRect().bottom <= 0)
          .forEach(settle);
      });
    }, {passive:true});
    root.addEventListener('focusin', event => {
      groups.filter(group => group.element.contains(event.target)).forEach(settle);
    });
    root.addEventListener('pointerdown', event => {
      groups.filter(group => group.element.contains(event.target)).forEach(settle);
    }, {passive:true});
    // Keyboard navigation, search, anchor jumps, print and interruptions settle instantly.
    addEventListener('keydown', settleAll, {once:true});
    addEventListener('hashchange', settleAll);
    addEventListener('beforeprint', settleAll);
    addEventListener('resize', settleAll);
    addEventListener('pageshow', event => { if (event.persisted) settleAll(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) settleAll(); });
    reduced?.addEventListener('change', event => { if (event.matches) settleAll(); });
  } catch { settleAll(); }
})();
