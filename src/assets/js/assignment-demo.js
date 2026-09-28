document.addEventListener("DOMContentLoaded", () => {
  const demo = document.querySelector(".folio-demo__canvas");

  if (!demo) return;

  const assignments = Array.from(demo.querySelectorAll(".folio-demo__assignment"));
  const groups = Array.from(demo.querySelectorAll(".folio-demo__group"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const runningAnimations = new WeakMap();
  const heightDuration = 240;
  const tableDuration = 180;
  const tableDelay = 60;
  const groupContentDelay = 40;
  const closeDelay = 60;
  const easing = "cubic-bezier(0.23, 1, 0.32, 1)";

  function clearSize(disclosure) {
    disclosure.style.removeProperty("height");
    disclosure.style.removeProperty("overflow");
    disclosure.classList.remove("folio-demo__disclosure--animating");
    disclosure.classList.remove("folio-demo__disclosure--closing");
  }

  function stopAnimation(disclosure) {
    const runningAnimation = runningAnimations.get(disclosure);

    if (!runningAnimation) return;

    disclosure.style.height = `${disclosure.getBoundingClientRect().height}px`;
    disclosure.removeEventListener("transitionend", runningAnimation.onTransitionEnd);
    window.clearTimeout(runningAnimation.timeout);
    disclosure.classList.remove("folio-demo__disclosure--animating");
    disclosure.classList.remove("folio-demo__disclosure--closing");
    runningAnimations.delete(disclosure);
  }

  function animateContent(content, entering, delay = 0) {
    content.getAnimations().forEach((animation) => animation.cancel());

    const animation = content.animate(
      reduceMotion.matches
        ? entering
          ? [{ opacity: 0 }, { opacity: 1 }]
          : [{ opacity: 1 }, { opacity: 0 }]
        : entering
          ? [
              { opacity: 0, transform: "translateY(8px)" },
              { opacity: 1, transform: "translateY(0)" },
            ]
          : [
              { opacity: 1, transform: "translateY(0)" },
              { opacity: 0, transform: "translateY(-8px)" },
            ],
      {
        duration: tableDuration,
        delay: reduceMotion.matches ? 0 : delay,
        easing,
        fill: "both",
      },
    );

    if (entering) animation.finished.then(() => animation.cancel(), () => {});
  }

  function revealTable(assignment) {
    animateContent(assignment.querySelector(".folio-demo__student-progress"), true, tableDelay);
  }

  function concealContent(disclosure, selector) {
    animateContent(disclosure.querySelector(selector), false);
  }

  function getCellValue(row, key) {
    if (key === "student") return row.querySelector("th").textContent.trim();

    if (key === "status") {
      const status = row.cells[0].nextElementSibling.textContent.trim();

      if (status === "Not started") return 0;
      if (status === "In progress") return 1;
      return 2;
    }

    const result = row.cells[2].textContent.trim();
    return result === "—" ? null : Number.parseInt(result, 10);
  }

  function sortTable(table, key, direction) {
    const body = table.tBodies[0];
    const rows = Array.from(body.rows);
    const multiplier = direction === "ascending" ? 1 : -1;

    rows.sort((firstRow, secondRow) => {
      const firstValue = getCellValue(firstRow, key);
      const secondValue = getCellValue(secondRow, key);

      if (firstValue === null && secondValue === null) {
        return getCellValue(firstRow, "student").localeCompare(getCellValue(secondRow, "student"));
      }

      if (firstValue === null) return 1;
      if (secondValue === null) return -1;

      if (typeof firstValue === "string") {
        return firstValue.localeCompare(secondValue) * multiplier;
      }

      if (firstValue !== secondValue) return (firstValue - secondValue) * multiplier;

      return getCellValue(firstRow, "student").localeCompare(getCellValue(secondRow, "student"));
    });

    rows.forEach((row) => body.append(row));
    table.dataset.sortKey = key;
    table.dataset.sortDirection = direction;

    table.querySelectorAll("th[aria-sort]").forEach((heading) => {
      heading.setAttribute("aria-sort", heading.querySelector("[data-sort-key]").dataset.sortKey === key ? direction : "none");
    });
  }

  function setUpSorting(table) {
    sortTable(table, "status", "ascending");

    table.querySelectorAll(".folio-demo__sort-button").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.sortKey;
        const direction = table.dataset.sortKey === key && table.dataset.sortDirection === "ascending" ? "descending" : "ascending";

        sortTable(table, key, direction);
      });
    });
  }

  function setDisclosureOpen(disclosure, shouldOpen, animate, onOpen, onClose) {
    stopAnimation(disclosure);

    if (disclosure.open === shouldOpen) return;

    if (!animate || reduceMotion.matches) {
      disclosure.open = shouldOpen;

      if (shouldOpen && reduceMotion.matches && animate) onOpen?.();

      return;
    }

    const startHeight = disclosure.getBoundingClientRect().height;
    const summaryHeight = disclosure.querySelector("summary").getBoundingClientRect().height;

    disclosure.style.height = `${startHeight}px`;
    disclosure.style.overflow = "hidden";

    let endHeight = summaryHeight;

    if (shouldOpen) {
      disclosure.open = true;
      endHeight = disclosure.scrollHeight;
      onOpen?.();
    } else {
      onClose?.();
    }

    const finish = () => {
      const runningAnimation = runningAnimations.get(disclosure);

      if (!runningAnimation) return;

      disclosure.removeEventListener("transitionend", runningAnimation.onTransitionEnd);
      window.clearTimeout(runningAnimation.timeout);

      if (!shouldOpen) disclosure.open = false;

      clearSize(disclosure);
      runningAnimations.delete(disclosure);
    };

    const onTransitionEnd = (event) => {
      if (event.target === disclosure && event.propertyName === "height") finish();
    };
    const timeout = window.setTimeout(finish, heightDuration + (shouldOpen ? 0 : closeDelay) + 80);

    runningAnimations.set(disclosure, { onTransitionEnd, timeout });
    disclosure.addEventListener("transitionend", onTransitionEnd);
    disclosure.classList.add("folio-demo__disclosure--animating");
    if (!shouldOpen) disclosure.classList.add("folio-demo__disclosure--closing");

    window.requestAnimationFrame(() => {
      if (runningAnimations.has(disclosure)) {
        disclosure.style.height = `${endHeight}px`;
      }
    });
  }

  function setAssignmentOpen(assignment, shouldOpen, animate) {
    const parentGroup = assignment.closest(".folio-demo__group");

    if (shouldOpen && parentGroup) parentGroup.setAttribute("open", "");

    setDisclosureOpen(
      assignment,
      shouldOpen,
      animate,
      () => revealTable(assignment),
      () => concealContent(assignment, ".folio-demo__student-progress"),
    );
  }

  function setGroupOpen(group, shouldOpen, animate) {
    setDisclosureOpen(
      group,
      shouldOpen,
      animate,
      () => animateContent(group.querySelector(".folio-demo__group-content"), true, groupContentDelay),
      () => concealContent(group, ".folio-demo__group-content"),
    );
  }

  assignments.forEach((assignment) => {
    const summary = assignment.querySelector("summary");

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      const shouldOpen = !assignment.open;
      const animate = event.detail !== 0;

      if (shouldOpen) {
        assignments.forEach((otherAssignment) => {
          if (otherAssignment !== assignment && otherAssignment.open) {
            setAssignmentOpen(otherAssignment, false, animate);
          }
        });
      }

      setAssignmentOpen(assignment, shouldOpen, animate);
    });
  });

  groups.forEach((group) => {
    const summary = group.querySelector(":scope > summary");

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      setGroupOpen(group, !group.open, event.detail !== 0);
    });
  });

  demo.querySelectorAll(".folio-demo__table").forEach(setUpSorting);
});
