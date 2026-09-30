(function () {
  var rotator = document.querySelector(".folio-hero__rotator");
  if (!rotator) return;

  var words = Array.prototype.slice.call(rotator.querySelectorAll(".folio-hero__word"));
  if (!words.length) return;

  var mark = rotator.parentElement;
  var text = rotator.closest(".folio-hero__text");
  var kicker = text ? text.querySelector(".folio-hero__kicker") : null;
  var dek = text ? text.querySelector(".folio-hero__dek") : null;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var index = 0;
  var hold = 2200;
  var lastSpace = -1;
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  function widthOf(word) {
    return word.getBoundingClientRect().width;
  }

  function fit(word) {
    rotator.style.width = Math.ceil(widthOf(word)) + "px";
  }

  function textWidth(font, value) {
    ctx.font = font;
    return ctx.measureText(value).width;
  }

  function fitType() {
    if (!text) return;
    var available = text.clientWidth;
    if (!available) return;
    lastSpace = available;

    var headline = words.reduce(function (widest, word) {
      var width = textWidth(
        "700 38px \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        "Then we ship something " + word.textContent.trim()
      );
      return Math.max(widest, width);
    }, 0);

    var markScale = headline > available ? (available / headline) * 0.98 : 1;
    mark.style.whiteSpace = "nowrap";
    mark.style.fontSize = Math.max(12, 38 * markScale) + "px";

    if (kicker) {
      var kickerWidth = textWidth(
        "400 24px \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        kicker.textContent.trim()
      );
      var kickerScale = kickerWidth > available ? (available / kickerWidth) * 0.98 : 1;
      kicker.style.whiteSpace = "nowrap";
      kicker.style.fontSize = Math.max(12, 24 * kickerScale) + "px";
    }

    if (dek) {
      dek.style.fontSize = Math.max(13, 15 * markScale) + "px";
    }

    fit(words[index]);
  }

  function start() {
    fitType();
    if (reduce) return;

    words[0].classList.add("is-current");
    rotator.classList.add("folio-hero--motion");
    fit(words[0]);

    window.setInterval(function () {
      var previous = words[index];
      index = (index + 1) % words.length;
      var next = words[index];

      previous.classList.remove("is-current");
      previous.classList.add("is-leaving");
      next.classList.remove("is-leaving");
      next.classList.remove("is-current");
      void next.offsetWidth;
      next.classList.add("is-current");
      fit(next);

      window.setTimeout(function () {
        previous.classList.remove("is-leaving");
      }, 600);
    }, hold);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
  } else {
    start();
  }

  if (text && window.ResizeObserver) {
    new ResizeObserver(function () {
      var available = text.clientWidth;
      if (Math.abs(available - lastSpace) < 1) return;
      fitType();
    }).observe(text);
  }
})();
