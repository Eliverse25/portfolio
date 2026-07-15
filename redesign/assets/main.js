(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sc = document.getElementById("scroll");
  var wall = document.getElementById("top");
  var studio = document.getElementById("studio");

  /* ---------- past-wall state (sidebar/logo fade in, chevron out) ---------- */
  function onScroll() {
    var threshold = wall.offsetHeight - innerHeight * 0.6;
    document.body.classList.toggle("past-wall", sc.scrollTop > threshold);
  }
  sc.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  // wall height changes as images load — keep the state honest
  if ("ResizeObserver" in window) new ResizeObserver(onScroll).observe(wall);
  window.addEventListener("load", onScroll);

  /* ---------- chevron: jump to studio ---------- */
  document.querySelector(".more").addEventListener("click", function () {
    studio.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- sidebar / menu smooth scroll (inside container) ---------- */
  [].forEach.call(document.querySelectorAll("[data-scroll]"), function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      var t = id && document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      closeMenu();
      t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ---------- reveals (root = internal scroller) ---------- */
  var rvs = [].slice.call(document.querySelectorAll(".rv"));
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var sibs = [].slice.call(el.parentElement.querySelectorAll(":scope > .rv"));
        el.style.transitionDelay = Math.max(0, sibs.indexOf(el)) * 70 + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { root: sc, threshold: 0.15 });
    rvs.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rvs.forEach(function (el) { el.classList.add("in"); }); }, 5000);
  } else {
    rvs.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- reel ---------- */
  var video = document.querySelector(".reel video");
  var pill = document.querySelector("[data-reel]");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { video.muted = true; var p = video.play(); p && p.catch && p.catch(function(){}); }
        else video.pause();
      });
    }, { root: sc, threshold: 0.3 }).observe(video);
  }
  if (pill) pill.addEventListener("click", function () {
    video.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    video.muted = !video.muted;
    if (video.muted === false) { video.currentTime = 0; }
    var p = video.play(); p && p.catch && p.catch(function(){});
  });

  /* ---------- work drawer ---------- */
  var drawer = document.getElementById("drawer");
  var scrim = document.getElementById("scrim");
  function openDrawer() { drawer.classList.add("open"); scrim.classList.add("on"); closeMenu(); }
  function closeDrawer() { drawer.classList.remove("open"); scrim.classList.remove("on"); }
  [].forEach.call(document.querySelectorAll("[data-drawer]"), function (b) { b.addEventListener("click", openDrawer); });
  drawer.querySelector("[data-close]").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); closeMenu(); } });

  /* tabs filter */
  var tabs = [].slice.call(drawer.querySelectorAll("[data-tab]"));
  var cards = [].slice.call(drawer.querySelectorAll(".dcard"));
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
      var f = t.getAttribute("data-tab");
      cards.forEach(function (c) {
        c.style.display = (f === "all" || c.getAttribute("data-cat") === f) ? "" : "none";
      });
    });
  });

  /* ---------- mobile menu ---------- */
  var mmenu = document.getElementById("mmenu");
  function closeMenu() { mmenu.classList.remove("open"); }
  var mbtn = document.querySelector("[data-menu]");
  if (mbtn) mbtn.addEventListener("click", function () { mmenu.classList.add("open"); });
  mmenu.querySelector("[data-close-menu]").addEventListener("click", closeMenu);
})();
