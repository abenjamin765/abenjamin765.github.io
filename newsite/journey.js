(() => {
  const experienceEase = getComputedStyle(document.getElementById('experience') || document.documentElement)
    .getPropertyValue('--experience-ease-out').trim() || 'cubic-bezier(0.23, 1, 0.32, 1)';
  const strip = document.querySelector('.employer-strip');
  if (strip) {
    const toggle = strip.querySelector('.employer-toggle');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let manuallyPaused = false;
    let inView = false;
    const updateVisibility = () => strip.classList.toggle('is-out-of-view', !inView || document.hidden);
    const updatePreference = () => {
      strip.classList.toggle('is-enhanced', !reduced.matches);
      toggle.hidden = reduced.matches;
    };
    toggle.addEventListener('click', () => {
      manuallyPaused = !manuallyPaused;
      strip.classList.toggle('is-paused', manuallyPaused);
      toggle.querySelector('img').src = manuallyPaused ? 'img/icons/play.svg' : 'img/icons/pause.svg';
      toggle.title = manuallyPaused ? 'Resume logos' : 'Pause logos';
      toggle.setAttribute('aria-label', manuallyPaused ? 'Resume logos' : 'Pause logos');
    });
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      updateVisibility();
    }).observe(strip);
    document.addEventListener('visibilitychange', updateVisibility);
    reduced.addEventListener('change', updatePreference);
    updatePreference();
    updateVisibility();
  }

  const more = document.querySelector('.experience-more');
  if (more) {
    const toggle = more.querySelector('.experience-more-toggle');
    const content = more.querySelector('.experience-more-content');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let expanded = false;
    let animation = null;
    const settle = (keepControlVisible = false) => {
      animation?.cancel();
      animation = null;
      content.hidden = !expanded;
      content.inert = !expanded;
      if (keepControlVisible && !expanded) {
        const bounds = toggle.getBoundingClientRect();
        if (bounds.top < 24 || bounds.bottom > window.innerHeight - 100) {
          toggle.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
      }
    };
    settle();
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const height = content.hidden ? 0 : content.getBoundingClientRect().height;
      const opacity = content.hidden ? 0 : Number(getComputedStyle(content).opacity);
      expanded = !expanded;
      toggle.setAttribute('aria-expanded', String(expanded));
      animation?.cancel();
      animation = null;
      content.hidden = false;
      content.inert = !expanded;
      if (reduced.matches || !content.animate) {
        settle(true);
        return;
      }
      const next = content.animate([
        { height: `${height}px`, opacity },
        { height: expanded ? `${content.scrollHeight}px` : '0px', opacity: expanded ? 1 : 0 }
      ], { duration: 200, easing: experienceEase });
      animation = next;
      next.finished.then(() => {
        if (animation === next) settle(true);
      }).catch(() => { /* Interrupted slides restart from their current height. */ });
    });
    window.addEventListener('resize', () => { if (animation) settle(document.activeElement === toggle); });
    reduced.addEventListener('change', () => { if (reduced.matches) settle(document.activeElement === toggle); });
  }

  // Shared once-per-visit reading-group entrances. Earlier roles keep their disclosure slide.
  if ('IntersectionObserver' in window && 'animate' in Element.prototype) {
    for (const section of [...document.querySelectorAll('#experience, #work')]) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      const isExperience = section.id === 'experience';
      const entranceAttribute = `data-${section.id}-entrance`;
      const header = section.querySelector(isExperience ? '.experience-header' : '.work-header');
      const items = isExperience
        ? [...section.querySelectorAll('.experience-shell > .experience-list > .experience-entry')]
        : [...section.querySelectorAll('.work-showcase')];
      const groups = [
        { element: header, kind: 'header', distance: 12, duration: 480 },
        ...items.map(element => ({ element, kind: 'row', distance: 12, duration: 440 }))
      ].filter(group => group.element).map(group => ({ ...group, state: 'pending', animation: null }));
      let entranceObserver;

      const settle = group => {
        group.state = 'settled';
        group.element.removeAttribute(entranceAttribute);
        entranceObserver?.unobserve(group.element);
        const animation = group.animation;
        group.animation = null;
        animation?.cancel();
        if (group.kind === 'logos') group.element.classList.remove('is-entering');
      };
      const settleAll = () => groups.forEach(settle);
      const reveal = (group, delay) => {
        // A background preview must not consume an entrance before it is seen.
        if (document.hidden) return;
        entranceObserver.unobserve(group.element);
        if (reduced.matches || group.element.contains(document.activeElement)) {
          settle(group);
          return;
        }
        try {
          group.state = 'running';
          const animation = group.element.animate([
            { transform: `translateY(${group.distance}px)`, opacity: 0 },
            { transform: 'translateY(0px)', opacity: 1 }
          ], { duration: group.duration, delay, easing: experienceEase, fill: 'both' });
          group.animation = animation;
          group.element.setAttribute(entranceAttribute, 'running');
          animation.finished.then(() => {
            if (group.animation === animation) settle(group);
          }).catch(() => {
            // Finish visibly if another action interrupts the entrance.
            if (group.animation === animation) settle(group);
          });
        } catch {
          settle(group);
        }
      };
      const revealBatch = elements => {
        const eligible = groups.filter(group => group.state === 'pending' && elements.has(group.element));
        const includesHeader = eligible.some(group => group.kind === 'header');
        let roleIndex = 0;
        eligible.forEach(group => {
          // A short beat makes the entrance perceptible without holding up reading.
          const delay = group.kind === 'header' ? 60
            : group.kind === 'logos' ? (includesHeader ? 160 : 60)
            : (includesHeader ? 260 : 60) + roleIndex++ * 70;
          reveal(group, delay);
        });
      };
      const isInViewingArea = element => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0
          && rect.top < window.innerHeight - 64 && rect.bottom > 0
          && rect.left < window.innerWidth && rect.right > 0;
      };
      const revealCurrentViewport = () => {
        if (document.hidden) return;
        revealBatch(new Set(groups.filter(group => isInViewingArea(group.element)).map(group => group.element)));
      };

      try {
        entranceObserver = new IntersectionObserver(entries => {
          revealBatch(new Set(entries.filter(entry => entry.isIntersecting && entry.intersectionRect.height > 0 && isInViewingArea(entry.target)).map(entry => entry.target)));
        }, { rootMargin: '0px 0px -64px 0px', threshold: 0 });
        section.addEventListener('focusin', event => {
          const group = groups.find(candidate => candidate.element.contains(event.target));
          if (group && group.state !== 'settled') settle(group);
        });
        section.addEventListener('pointerdown', event => {
          const group = groups.find(candidate => candidate.element.contains(event.target));
          if (group && group.state !== 'settled') settle(group);
        });
        reduced.addEventListener('change', () => { if (reduced.matches) settleAll(); });
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) groups.filter(group => group.state === 'running').forEach(settle);
          else revealCurrentViewport();
        });
        window.addEventListener('beforeprint', settleAll);
        window.addEventListener('pageshow', revealCurrentViewport);
        window.addEventListener('hashchange', revealCurrentViewport);
        groups.forEach(group => entranceObserver.observe(group.element));
        if (reduced.matches) {
          settleAll();
        } else {
          // Arm only after observation and interruption handling are established.
          groups.forEach(group => {
            group.element.setAttribute(entranceAttribute, 'pending');
            if (group.kind === 'logos') group.element.classList.add('is-entering');
          });
          if (location.hash === `#${section.id}`) requestAnimationFrame(revealCurrentViewport);
          if (section.contains(document.activeElement)) {
            const focused = groups.find(group => group.element.contains(document.activeElement));
            if (focused) settle(focused);
          }
        }
      } catch {
        settleAll();
        entranceObserver?.disconnect();
      }
    }
  }

  // A single customer insight appears on hover, keyboard focus, or a touch tap.
  const preview = document.querySelector('.intro-browser');
  if (preview) {
    const content = preview.querySelector('.intro-browser-content');
    const toggle = preview.querySelector('.intro-browser-toggle');
    const quote = preview.querySelector('.intro-quote-overlay');
    const hover = matchMedia('(hover: hover) and (pointer: fine)');
    const showQuote = visible => {
      content.classList.toggle('is-quote-visible', visible);
      toggle.setAttribute('aria-expanded', String(visible));
      toggle.setAttribute('aria-label', `${visible ? 'Hide' : 'Show'} customer quote about reposting jobs`);
      quote.setAttribute('aria-hidden', String(!visible));
    };
    toggle.hidden = false;
    preview.addEventListener('pointerenter', event => {
      if (hover.matches && event.pointerType !== 'touch') showQuote(true);
    });
    preview.addEventListener('pointerleave', () => {
      if (hover.matches && !toggle.matches(':focus-visible')) showQuote(false);
    });
    toggle.addEventListener('focus', () => {
      if (toggle.matches(':focus-visible')) showQuote(true);
    });
    toggle.addEventListener('blur', () => showQuote(false));
    toggle.addEventListener('click', () => showQuote(toggle.getAttribute('aria-expanded') !== 'true'));
    toggle.addEventListener('keydown', event => {
      if (event.key === 'Escape') { showQuote(false); event.preventDefault(); }
    });
    document.addEventListener('pointerdown', event => {
      if (!preview.contains(event.target)) showQuote(false);
    });
  }

  const links = [...document.querySelectorAll('.site-nav--item')];
  const panels = [...document.querySelectorAll('main > .panel')];
  let navigationFrame = null;
  const updateNavigation = () => {
    navigationFrame = null;
    const readingLine = Math.min(innerHeight * .3, 200);
    const current = panels.find(panel => {
      const bounds = panel.getBoundingClientRect();
      return bounds.top <= readingLine && bounds.bottom > readingLine;
    }) || panels[0];
    links.forEach(link => {
      const active = link.hash === '#' + current?.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const scheduleNavigation = () => {
    if (navigationFrame === null) navigationFrame = requestAnimationFrame(updateNavigation);
  };
  addEventListener('scroll', scheduleNavigation, { passive: true });
  addEventListener('resize', scheduleNavigation);
  addEventListener('hashchange', scheduleNavigation);
  updateNavigation();
})();
