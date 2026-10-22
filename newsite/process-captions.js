(() => {
  const captions = [...document.querySelectorAll('#process .process-layer-caption')];
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (!captions.length || reduced?.matches || !('IntersectionObserver' in window) ||
      !('animate' in Element.prototype) || !window.CSS?.supports('clip-path', 'inset(0 round 30px)')) return;

  const duration = 500;
  const groups = [];
  const cleanups = [];
  const listen = (target, type, handler, options) => {
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  };
  let observer;
  let resizeFrame = 0;
  let scrollFrame = 0;
  let input = 'pointer';

  const cancel = group => {
    group.animations.forEach(animation => animation.cancel());
    group.animations = [];
  };
  const finish = group => {
    group.state = 'open';
    group.caption.dataset.captionState = 'open';
    group.surface.style.clipPath = group.openClip;
    group.badge.style.transform = 'none';
    group.description.style.opacity = '1';
    group.description.style.transform = 'none';
    cancel(group);
    observer?.unobserve(group.caption);
  };
  const restore = group => {
    group.state = 'open';
    cancel(group);
    group.surface.remove();
    group.badge.style.removeProperty('transform');
    group.description.style.removeProperty('opacity');
    group.description.style.removeProperty('transform');
    group.caption.classList.remove('is-caption-reveal');
    delete group.caption.dataset.captionState;
  };
  const measure = group => {
    const box = group.caption.getBoundingClientRect();
    const badge = group.badge.getBoundingClientRect();
    const closedWidth = Math.min(box.width, badge.width + 8);
    const closedHeight = Math.min(box.height, badge.height + 8);
    const side = Math.max(0, (box.width - closedWidth) / 2);
    // Keep the closed pill attached to the well, including stacked mobile captions.
    const top = Math.max(0, box.height - closedHeight);
    group.closedClip = `inset(${top}px ${side}px 0px ${side}px round 30px)`;
    group.openClip = `inset(0px 0px 0px 0px round ${getComputedStyle(group.caption).borderRadius})`;
    group.closedBadge = `translate(${side + 4 - group.badge.offsetLeft}px, ${top + 4 - group.badge.offsetTop}px)`;
    group.surface.style.clipPath = group.closedClip;
    group.badge.style.transform = group.closedBadge;
    group.description.style.opacity = '0';
    group.description.style.transform = 'translateX(12px)';
  };
  const reveal = group => {
    if (group.state !== 'closed') return;
    if (reduced?.matches || input === 'keyboard' || document.hidden) {
      finish(group);
      return;
    }
    group.state = 'opening';
    group.caption.dataset.captionState = 'opening';
    const easing = getComputedStyle(group.caption).getPropertyValue('--story-ease-out').trim() ||
      'cubic-bezier(0.23, 1, 0.32, 1)';
    try {
      group.animations.push(group.surface.animate(
        [{ clipPath: group.closedClip }, { clipPath: group.openClip }],
        { duration, easing, fill: 'both' }));
      group.animations.push(group.badge.animate(
        [{ transform: group.closedBadge }, { transform: 'translate(0px, 0px)' }],
        { duration, easing, fill: 'both' }));
      group.animations.push(group.description.animate([
        { opacity: 0, transform: 'translateX(12px)' },
        { opacity: 1, transform: 'translateX(0px)' }
      ], { duration: 250, delay: 250, easing, fill: 'both' }));
      Promise.all(group.animations.map(animation => animation.finished)).then(() => {
        if (group.state === 'opening') finish(group);
      }).catch(() => {
        if (group.state === 'opening') finish(group);
      });
    } catch {
      finish(group);
    }
  };

  try {
    for (const caption of captions) {
      const badge = caption.querySelector('h3');
      const description = caption.querySelector('p');
      if (!badge || !description) continue;
      const surface = document.createElement('span');
      surface.className = 'caption-reveal-surface';
      surface.setAttribute('aria-hidden', 'true');
      const group = { caption, badge, description, surface, state: 'closed', animations: [] };
      groups.push(group);
      caption.prepend(surface);
      caption.classList.add('is-caption-reveal');
      caption.dataset.captionState = 'closed';
      measure(group);
    }
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const group = groups.find(item => item.caption === entry.target);
        if (!group || group.state !== 'closed') continue;
        if (entry.boundingClientRect.bottom < 0) finish(group);
        else if (entry.isIntersecting) reveal(group);
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.25 });
    groups.forEach(group => observer.observe(group.caption));

    // A large scroll jump can skip both IntersectionObserver threshold crossings.
    listen(window, 'scroll', () => {
      if (scrollFrame || groups.every(group => group.state === 'open')) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        groups.filter(group => group.state === 'closed').forEach(group => {
          if (group.caption.getBoundingClientRect().bottom < 0) finish(group);
        });
      });
    }, { passive: true });

    listen(document, 'keydown', () => {
      input = 'keyboard';
      groups.filter(group => group.state === 'opening').forEach(finish);
    });
    for (const type of ['wheel', 'touchstart', 'pointerdown']) {
      listen(window, type, () => { input = 'pointer'; }, { passive: true });
    }
    listen(window, 'resize', () => {
      cancelAnimationFrame(resizeFrame);
      groups.filter(group => group.state === 'opening').forEach(finish);
      resizeFrame = requestAnimationFrame(() => {
        for (const group of groups) {
          if (group.state !== 'closed') continue;
          if (reduced?.matches) finish(group);
          else measure(group);
        }
      });
    });
    listen(document, 'visibilitychange', () => {
      if (document.hidden) groups.filter(group => group.state === 'opening').forEach(finish);
    });
    const preferenceChanged = () => {
      if (reduced.matches) groups.forEach(finish);
    };
    if (reduced?.addEventListener) listen(reduced, 'change', preferenceChanged);
    else if (reduced?.addListener) {
      reduced.addListener(preferenceChanged);
      cleanups.push(() => reduced.removeListener(preferenceChanged));
    }
    listen(window, 'beforeprint', () => groups.forEach(finish));
  } catch {
    observer?.disconnect();
    cancelAnimationFrame(resizeFrame);
    cancelAnimationFrame(scrollFrame);
    cleanups.forEach(remove => remove());
    groups.forEach(restore);
  }
})();
