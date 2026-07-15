(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero line reveal on load
  function heroIn() { document.querySelector(".hero").classList.add("loaded"); }
  if (document.readyState === "complete") heroIn();
  else window.addEventListener("load", heroIn);

  // Scroll reveal (staggered per section)
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var sibs = [].slice.call(el.parentElement.querySelectorAll(":scope > .reveal"));
        var i = sibs.indexOf(el);
        el.style.transitionDelay = Math.max(0, i) * 80 + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    [].forEach.call(document.querySelectorAll(".reveal"), function (el) { io.observe(el); });
    // safety: reveal everything after 5s no matter what
    setTimeout(function () { [].forEach.call(document.querySelectorAll(".reveal"), function (el) { el.classList.add("in"); }); }, 5000);
  } else {
    [].forEach.call(document.querySelectorAll(".reveal"), function (el) { el.classList.add("in"); });
  }

  // Work: thumbnail follows cursor within a row
  if (window.matchMedia && matchMedia("(hover:hover) and (pointer:fine)").matches && !reduce) {
    [].forEach.call(document.querySelectorAll(".work__item"), function (item) {
      var thumb = item.querySelector(".work__thumb");
      if (!thumb) return;
      item.addEventListener("mousemove", function (ev) {
        var r = item.getBoundingClientRect();
        var x = ev.clientX - r.left;
        thumb.style.left = Math.max(0, Math.min(r.width - thumb.offsetWidth, x - thumb.offsetWidth / 2)) + "px";
      });
    });
  }

  // Mobile menu
  var burger = document.querySelector(".nav__burger");
  var menu = document.getElementById("mobmenu");
  var close = menu && menu.querySelector(".mobmenu__close");
  function toggle(open) { menu.classList[open ? "add" : "remove"]("open"); document.body.style.overflow = open ? "hidden" : ""; }
  if (burger) burger.addEventListener("click", function () { toggle(true); });
  if (close) close.addEventListener("click", function () { toggle(false); });
  if (menu) [].forEach.call(menu.querySelectorAll("a"), function (a) { a.addEventListener("click", function () { toggle(false); }); });

  // Smooth-scroll for same-page anchors
  [].forEach.call(document.querySelectorAll('a[href^="#"]'), function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });
})();
