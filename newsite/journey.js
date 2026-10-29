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

  const preview = document.querySelector('.intro-browser');
  if (preview) {
    const content = preview.querySelector('.intro-browser-content');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const app = preview.querySelector('.indeed-app');
    const camera = preview.querySelector('.indeed-camera');
    const date = preview.querySelector('[data-indeed-date]');
    const staleJob = preview.querySelector('[data-indeed-job="ux-manager"]');
    const staleTitle = staleJob?.querySelector('.indeed-job__title');
    const staleIdentity = staleJob?.querySelector('.indeed-job__identity');
    const firstJob = preview.querySelector('[data-indeed-job="customer-service"]');
    const plus = preview.querySelector('.indeed-plus');
    const pulse = preview.querySelector('.indeed-plus-pulse');
    const cursor = preview.querySelector('.indeed-cursor');
    const pane = preview.querySelector('.indeed-jobs-pane');
    const list = preview.querySelector('.indeed-jobs');
    const duplicate = preview.querySelector('[data-indeed-job="ux-manager-copy"]');
    const count = preview.querySelector('.indeed-open-count');
    const cameraEase = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const play = (element, keyframes, options) => element.animate(keyframes, { fill: 'forwards', ...options }).finished.catch(() => {});
    const fitScale = () => app.getBoundingClientRect().width / 928;
    const localPoint = element => {
      const appBox = app.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      const fit = fitScale();
      return {
        x: (box.left + box.width / 2 - appBox.left) / fit,
        y: (box.top + box.height / 2 - appBox.top) / fit
      };
    };
    const cursorTo = (point, duration) => {
      const current = getComputedStyle(cursor).transform;
      const from = current === 'none' ? `translate(${point.x}px, ${point.y}px)` : current;
      return play(cursor, [
        { opacity: 1, transform: from },
        { opacity: 1, transform: `translate(${point.x}px, ${point.y}px)` }
      ], { duration, easing: cameraEase });
    };
    const scrollPane = (top, duration) => new Promise(resolve => {
      const from = pane.scrollTop;
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t * t * (3 - 2 * t);
        pane.scrollTop = from + (top - from) * eased;
        if (t < 1) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    const scanOffset = () => {
      const fit = fitScale();
      const target = staleTitle || date;
      return Math.max(0, (target.getBoundingClientRect().top - pane.getBoundingClientRect().top) / fit + pane.scrollTop - 28);
    };
    const copyDates = [
      'April 28, 2024',
      'May 19, 2024',
      'June 9, 2024',
      'June 30, 2024',
      'July 21, 2024',
      'August 11, 2024',
      'September 1, 2024',
      'September 22, 2024'
    ];
    let openCount = 4;
    const insertCopy = (postedDate, popMs) => {
      const row = duplicate.cloneNode(true);
      row.hidden = false;
      row.removeAttribute('hidden');
      row.querySelector('[data-indeed-copy-date]').textContent = `Posted: ${postedDate}`;
      const fit = fitScale();
      const visibleRows = [...list.querySelectorAll('.indeed-job:not([hidden])')];
      const first = new Map(visibleRows.map(item => [item, item.getBoundingClientRect()]));
      const anchor = visibleRows[0] || duplicate;
      list.insertBefore(row, anchor);
      openCount += 1;
      count.textContent = String(openCount);
      visibleRows.forEach(item => {
        const dy = (first.get(item).top - item.getBoundingClientRect().top) / fit;
        if (Math.abs(dy) > 0.5) {
          item.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: Math.min(280, popMs), easing: experienceEase });
        }
      });
      count.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: Math.min(280, popMs), easing: cameraEase });
      return play(row, [
        { opacity: 0, transform: 'scale(.86)' },
        { opacity: 1, transform: 'scale(1.05)', offset: .7 },
        { opacity: 1, transform: 'scale(1)' }
      ], { duration: popMs, easing: experienceEase });
    };
    const clickPlus = plusPoint => {
      play(cursor, [
        { transform: `translate(${plusPoint.x}px, ${plusPoint.y}px) scale(1)` },
        { transform: `translate(${plusPoint.x}px, ${plusPoint.y}px) scale(.84)` },
        { transform: `translate(${plusPoint.x}px, ${plusPoint.y}px) scale(1)` }
      ], { duration: 180, easing: 'ease-in-out' });
      pulse.animate([
        { opacity: .72, transform: 'scale(.35)' },
        { opacity: 0, transform: 'scale(1.85)' }
      ], { duration: 440, easing: 'ease-out' });
    };
    const showEndState = () => {
      copyDates.forEach(postedDate => insertCopy(postedDate, 1));
      content.classList.remove('is-quote-visible');
      pane.scrollTop = 0;
    };
    const playStory = async () => {
      if (!camera || !duplicate || !date || !staleIdentity || !plus || !cursor || !pane) return;
      if (reduced.matches || !camera.animate) {
        showEndState();
        return;
      }
      content.classList.add('is-quote-visible');
      await wait(420);
      await wait(4000);
      content.classList.remove('is-quote-visible');
      await wait(500);
      const scanTarget = scanOffset();
      const glanceTarget = Math.max(0, Math.round(scanTarget * 0.45));
      const startPoint = localPoint(firstJob.querySelector('.indeed-job__title'));
      cursor.style.opacity = '1';
      await play(cursor, [
        { opacity: 0, transform: `translate(${startPoint.x + 36}px, ${startPoint.y - 28}px)` },
        { opacity: 1, transform: `translate(${startPoint.x}px, ${startPoint.y}px)` }
      ], { duration: 520, easing: cameraEase });
      await wait(180);
      const scanScroll = scrollPane(glanceTarget, 720);
      await wait(160);
      await cursorTo(localPoint(firstJob), 560);
      await scanScroll;
      await wait(220);
      const settleScroll = scrollPane(scanTarget, 880);
      await wait(120);
      await cursorTo(localPoint(date), 780);
      await settleScroll;
      await wait(400);
      const zoomPoint = localPoint(staleIdentity);
      camera.style.transformOrigin = `${zoomPoint.x}px ${zoomPoint.y}px`;
      await play(camera, [{ transform: 'scale(1)' }, { transform: 'scale(1.72)' }], { duration: 900, easing: cameraEase });
      await wait(400);
      await play(date, [
        { color: '#595959', transform: 'translateX(0)' },
        { color: '#cf3a4e', transform: 'translateX(-4px)', offset: .22 },
        { color: '#cf3a4e', transform: 'translateX(5px)', offset: .44 },
        { color: '#cf3a4e', transform: 'translateX(-3px)', offset: .66 },
        { color: '#cf3a4e', transform: 'translateX(2px)', offset: .84 },
        { color: '#595959', transform: 'translateX(0)' }
      ], { duration: 640, easing: 'ease-in-out' });
      await wait(600);
      await play(camera, [{ transform: 'scale(1.72)' }, { transform: 'scale(1)' }], { duration: 700, easing: cameraEase });
      await wait(300);
      await scrollPane(0, 640);
      await wait(180);
      const plusPoint = localPoint(plus);
      await cursorTo(plusPoint, 800);
      await wait(200);
      const spaced = [
        { date: copyDates[0], pause: 700 },
        { date: copyDates[1], pause: 400 },
        { date: copyDates[2], pause: 900 }
      ];
      for (const beat of spaced) {
        clickPlus(plusPoint);
        await insertCopy(beat.date, 360);
        await wait(beat.pause);
      }
      for (const postedDate of copyDates.slice(3)) {
        clickPlus(plusPoint);
        insertCopy(postedDate, 180);
        await wait(110);
      }
      await wait(900);
      await play(cursor, [{ opacity: 1 }, { opacity: 0 }], { duration: 280 });
    };
    const introPreview = document.querySelector('.intro-preview');
    if (introPreview && duplicate && 'IntersectionObserver' in window) {
      const storyObserver = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        storyObserver.disconnect();
        playStory();
      }, { threshold: 0.45 });
      storyObserver.observe(introPreview);
    } else if (duplicate) playStory();
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
