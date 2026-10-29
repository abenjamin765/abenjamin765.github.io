(() => {
  const carousel = document.querySelector('[data-work-carousel]');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('[data-work-slide]')];
  const controls = carousel.querySelector('.work-controls');
  const previous = carousel.querySelector('[data-work-previous]');
  const next = carousel.querySelector('[data-work-next]');
  const count = carousel.querySelector('.work-count');
  const status = carousel.querySelector('.work-status');
  if (slides.length < 2 || !controls || !previous || !next || !count || !status) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ease = getComputedStyle(document.getElementById('experience') || document.documentElement)
    .getPropertyValue('--experience-ease-out').trim() || 'cubic-bezier(0.23, 1, 0.32, 1)';
  let index = 0;
  let busy = false;
  let transition = null;

  const select = (destination, announce = true) => {
    slides.forEach((slide, i) => {
      const active = i === destination;
      slide.classList.toggle('is-active', active);
      slide.inert = !active;
      if (active) slide.removeAttribute('aria-hidden');
      else slide.setAttribute('aria-hidden', 'true');
    });
    index = destination;
    count.textContent = `${index + 1} of ${slides.length}`;
    if (announce) status.textContent = `${index + 1} of ${slides.length}: ${slides[index].dataset.project}`;
  };
  const release = () => {
    busy = false;
    previous.removeAttribute('aria-disabled');
    next.removeAttribute('aria-disabled');
  };
  const finish = () => {
    if (!transition) return;
    const current = transition;
    transition = null;
    current.animation?.cancel();
    select(current.destination);
    release();
  };
  const fade = async (slide, from, to, duration, current) => {
    const animation = slide.animate([{ opacity: from }, { opacity: to }], { duration, easing: ease, fill: 'both' });
    current.animation = animation;
    await animation.finished.catch(() => {});
    if (current.animation === animation) current.animation = null;
    animation.cancel();
  };
  const decode = async slide => {
    const image = slide.querySelector('img');
    if (!image) return;
    image.loading = 'eager';
    if (image.complete && !image.naturalWidth) image.src = image.getAttribute('src');
    if (image.decode) await image.decode();
    else if (!image.complete) await new Promise((resolve, reject) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', reject, { once: true });
    });
    if (!image.naturalWidth) throw new Error('Image unavailable');
  };
  const change = async direction => {
    if (busy) return;
    busy = true;
    previous.setAttribute('aria-disabled', 'true');
    next.setAttribute('aria-disabled', 'true');
    const destination = (index + direction + slides.length) % slides.length;
    try {
      await decode(slides[destination]);
    } catch {
      status.textContent = 'This case study image could not load. Please try again.';
      release();
      return;
    }
    if (reduced.matches || document.hidden || !('animate' in Element.prototype)) {
      select(destination);
      release();
      return;
    }
    const current = { destination, animation: null };
    transition = current;
    try {
      await fade(slides[index], 1, 0, 120, current);
      if (transition !== current) return;
      select(destination, false);
      await fade(slides[destination], 0, 1, 180, current);
      if (transition === current) finish();
    } catch {
      if (transition === current) finish();
    }
  };
  try {
    previous.addEventListener('click', () => { void change(-1); });
    next.addEventListener('click', () => { void change(1); });
    reduced.addEventListener('change', () => { if (reduced.matches) finish(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) finish(); });
    window.addEventListener('beforeprint', finish);
    slides.forEach((slide, i) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} of ${slides.length}: ${slide.dataset.project}`);
    });
    carousel.setAttribute('aria-roledescription', 'carousel');
    select(0, false);
    carousel.classList.add('is-enhanced');
    controls.hidden = false;
  } catch {
    carousel.classList.remove('is-enhanced');
    carousel.removeAttribute('aria-roledescription');
    slides.forEach(slide => {
      slide.inert = false;
      slide.classList.remove('is-active');
      ['aria-hidden', 'aria-label', 'aria-roledescription', 'role'].forEach(name => slide.removeAttribute(name));
    });
    controls.hidden = true;
  }
})();
