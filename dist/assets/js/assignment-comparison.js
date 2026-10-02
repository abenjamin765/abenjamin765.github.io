document.addEventListener('DOMContentLoaded', () => {
  const comparison = document.querySelector('.assignment-comparison');
  if (!comparison) return;
  const tabs = [...comparison.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const tablist = comparison.querySelector('[role="tablist"]');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stage = document.createElement('div');
  stage.className = 'assignment-comparison__stage';
  panels[0].before(stage);
  panels.forEach(panel => stage.append(panel));
  let active = 0;
  let revision = 0;
  const animations = new Map();

  function select(index, focus = false, animate = false) {
    const previous = active;
    const ticket = ++revision;
    const snapshots = panels.map(panel => {
      const style = getComputedStyle(panel);
      return { visible: !panel.hidden, opacity: style.opacity, transform: style.transform };
    });
    animations.forEach(animation => animation.cancel());
    animations.clear();
    active = index;
    comparison.classList.toggle('assignment-comparison--instant', !animate || motionPreference.matches);
    tablist.style.setProperty('--comparison-index', index);
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].inert = i !== index;
      panels[i].setAttribute('aria-hidden', String(i !== index));
      panels[i].classList.toggle('assignment-comparison__panel--leaving', i !== index);
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
    if (!animate || index === previous || !panels[index].animate) return;

    const direction = index > previous ? 1 : -1;
    const reduced = motionPreference.matches;
    const duration = reduced ? 100 : 220;
    const easing = 'cubic-bezier(0.23, 1, 0.32, 1)';
    [previous, index].forEach(i => {
      const panel = panels[i];
      const entering = i === index;
      panel.hidden = false;
      const from = snapshots[i].visible
        ? { opacity: snapshots[i].opacity, transform: snapshots[i].transform }
        : { opacity: 0, transform: reduced ? 'none' : 'translateX(' + direction * 16 + 'px)' };
      const to = { opacity: entering ? 1 : 0, transform: reduced || entering ? 'none' : 'translateX(' + -direction * 12 + 'px)' };
      const animation = panel.animate([from, to], { duration: entering ? duration : Math.min(duration, 150), easing, fill: 'both' });
      animations.set(panel, animation);
      animation.finished.then(() => {
        if (ticket !== revision) return;
        panel.hidden = i !== active;
        panel.classList.remove('assignment-comparison__panel--leaving');
        animation.cancel();
        animations.delete(panel);
      }).catch(() => {});
    });
  }
  tablist.hidden = false;
  comparison.classList.add('assignment-comparison--enhanced');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => select(index, false, event.detail > 0));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - index;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(next, true); }
    });
  });
  motionPreference.addEventListener('change', () => select(active));
  select(0);
});
