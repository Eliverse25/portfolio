(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sc = document.getElementById("scroll");
  var wall = document.getElementById("top");
  var studio = document.getElementById("studio");

  /* =========================================================
     IMAGE WALL — flex columns + entry rise + per-column lag
     (the reference builds the wall from _column divs that
      trail the scroll at slightly different rates)
     ========================================================= */
  var cols = [];
  function buildWall() {
    var tiles = [].slice.call(wall.querySelectorAll("a"));
    var n = innerWidth < 560 ? 3 : innerWidth < 900 ? 4 : innerWidth < 1280 ? 6 : 7;
    wall.textContent = "";
    cols = [];
    for (var i = 0; i < n; i++) {
      var c = document.createElement("div");
      c.className = "wcol";
      wall.appendChild(c);
      cols.push(c);
    }
    tiles.forEach(function (t, i) { cols[i % n].appendChild(t); });
    // stagger column tops slightly (ragged top rhythm, like the reference)
    cols.forEach(function (c, i) { c.style.marginTop = (i % 2 ? -34 : 0) - (i % 3) * 18 + "px"; });
  }
  buildWall();

  /* entry: columns rise into place once first images are ready */
  function wallIn() {
    if (wall.classList.contains("wall-in")) return;
    requestAnimationFrame(function () { wall.classList.add("wall-in"); });
    setTimeout(function () { wall.classList.add("wall-live"); }, 1700);
  }
  var probe = wall.querySelector("img");
  if (probe && !probe.complete) probe.addEventListener("load", wallIn, { once: true });
  setTimeout(wallIn, 900); // never wait forever

  /* per-column lag: columns chase the scroll with different stiffness */
  if (!reduce) {
    var LAG = [0.16, 0.11, 0.19, 0.09, 0.14, 0.08, 0.12];
    var pos = [];
    var raf = null;
    function tick() {
      var target = sc.scrollTop;
      var live = false;
      cols.forEach(function (c, i) {
        if (pos[i] == null) pos[i] = target;
        pos[i] += (target - pos[i]) * LAG[i % LAG.length];
        var d = target - pos[i];
        if (Math.abs(d) > 0.4) live = true; else pos[i] = target, d = 0;
        c.style.transform = d ? "translateY(" + d.toFixed(1) + "px)" : "";
      });
      raf = live ? requestAnimationFrame(tick) : null;
    }
    sc.addEventListener("scroll", function () {
      if (!raf && sc.scrollTop < wall.offsetHeight + innerHeight) raf = requestAnimationFrame(tick);
    }, { passive: true });
  }

  var rebuildT;
  addEventListener("resize", function () {
    clearTimeout(rebuildT);
    rebuildT = setTimeout(function () { buildWall(); wall.classList.add("wall-in"); }, 200);
  });

  /* ---------- past-wall state ---------- */
  function onScroll() {
    var threshold = wall.offsetHeight - innerHeight * 0.6;
    document.body.classList.toggle("past-wall", sc.scrollTop > threshold);
  }
  sc.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if ("ResizeObserver" in window) new ResizeObserver(onScroll).observe(wall);
  addEventListener("load", onScroll);

  /* ---------- chevron ---------- */
  document.querySelector(".more").addEventListener("click", function () {
    studio.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- nav scroll ---------- */
  [].forEach.call(document.querySelectorAll("[data-scroll]"), function (a) {
    a.addEventListener("click", function (e) {
      var t = document.querySelector(a.getAttribute("href") || "");
      if (!t) return;
      e.preventDefault();
      closeMenu();
      t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ---------- reveals ---------- */
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
  if (video && "IntersectionObserver" in window) {
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
    if (!video.muted) video.currentTime = 0;
    var p = video.play(); p && p.catch && p.catch(function(){});
  });

  /* =========================================================
     WORK DRAWER + PROJECT DETAIL
     ========================================================= */
  var PROJECTS = {
    stormbit: {
      name: "Stormbit", meta: "Web3 · DeFi — 2025 · Branding, UI/UX, Product",
      sum: "A full-cycle Web3 finance product: from brand identity to a lending and earning experience built for a global launch at ETHCC Cannes.",
      did: ["Brand identity and the lightning mark", "End-to-end UI/UX for earn and borrow flows", "Launch campaign and event key visuals"],
      link: "https://stormbit.finance", img: "assets/work/stormbit.webp"
    },
    kibble: {
      name: "Kibble Exchange", meta: "Web3 · DEX on TON — 2024 · UI/UX, Game design",
      sum: "A decentralized exchange on the TON network, paired with a Telegram minigame that reached 700,000 players in its first week.",
      did: ["Swap and trading interface design", "Telegram minigame UX and onboarding", "TON Meetup Vietnam 2024 event branding"],
      link: "https://kibble.exchange", img: "assets/work/kibble.webp"
    },
    qash: {
      name: "Qash", meta: "Web3 · Finance — 2026 · Landing, Banners, Team lead",
      sum: "Landing page design, banner systems and design team leadership for a Web3 finance platform built around vaults and yield.",
      did: ["Landing page and marketing visuals", "Banner system across campaigns", "Leading the design team and reviews"],
      link: "https://qash-landing.vercel.app/", img: "assets/work/qash.webp"
    },
    polypay: {
      name: "PolyPay", meta: "Web3 · Payments — 2025 · Brand, UI/UX, Team lead",
      sum: "Brand identity and the full journey from MVP to final UI for a crypto payments and payroll platform, with team management throughout.",
      did: ["Brand identity and app icon", "MVP to final product UI", "Multi-signature transfers and batch approvals", "Market positioning visuals"],
      link: "https://polypay.pro/", img: "assets/work/polypay.webp"
    },
    oneplan: {
      name: "OnePlan Travel", meta: "Mobile · Travel — 2025 · Co-founder & CEO, Product",
      sum: "An iOS app for planning group travel, where I led both the product and the company as co-founder and CEO.",
      did: ["Product vision and roadmap", "End-to-end iOS app design", "Itinerary and shared-expense flows"],
      link: "https://apps.apple.com/vn/app/oneplan-travel/id6761648165", img: "assets/work/oneplan.webp"
    },
    trumchinese: {
      name: "Trùm Chinese", meta: "Mobile · Education — 2024 · UI/UX, Product",
      sum: "A language-learning app that reached a 4.8-star rating and a top-5 education spot in Vietnam by teaching Chinese through stories and AI translation.",
      did: ["Story reader and lesson UI", "AI translation experience", "Voice and character system"],
      link: "https://apps.apple.com/vn/app/tr%C3%B9m-chinese-ti%E1%BA%BFng-trung-hsk/id6468914724", img: "assets/work/trumchinese.webp"
    },
    gearrunner: {
      name: "Gear Runner", meta: "Mobile · Game — 2024 · UI/UX, UX research",
      sum: "Mobile game UI and user-behavior research for a move-to-earn experience that rewards real-world activity with gear and progression.",
      did: ["Game UI and inventory system", "Activity and health tracking screens", "User-behavior research"],
      link: "https://apps.apple.com/vn/app/gear-runner/id6758157431", img: "assets/work/gearrunner.webp"
    }
  };

  var drawer = document.getElementById("drawer");
  var scrim = document.getElementById("scrim");
  var dview = document.getElementById("dview");
  function openDrawer() { drawer.classList.add("open"); scrim.classList.add("on"); closeMenu(); }
  function closeDrawer() { drawer.classList.remove("open"); scrim.classList.remove("on"); setTimeout(function(){ dview.classList.remove("show"); }, 450); }
  [].forEach.call(document.querySelectorAll("[data-drawer]"), function (b) { b.addEventListener("click", openDrawer); });
  [].forEach.call(drawer.querySelectorAll("[data-close]"), function (b) { b.addEventListener("click", closeDrawer); });
  scrim.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (dview.classList.contains("show")) dview.classList.remove("show");
    else { closeDrawer(); closeMenu(); }
  });

  /* card click -> detail */
  function showProject(key) {
    var p = PROJECTS[key];
    if (!p) return;
    document.getElementById("dv-img").src = p.img;
    document.getElementById("dv-img").alt = p.name;
    document.getElementById("dv-name").textContent = p.name;
    document.getElementById("dv-meta").textContent = p.meta;
    document.getElementById("dv-sum").textContent = p.sum;
    var ul = document.getElementById("dv-did");
    ul.textContent = "";
    p.did.forEach(function (d) { var li = document.createElement("li"); li.textContent = d; ul.appendChild(li); });
    document.getElementById("dv-link").href = p.link;
    dview.classList.add("show");
    dview.querySelector(".dview__body").scrollTop = 0;
  }
  [].forEach.call(drawer.querySelectorAll(".dcard"), function (card) {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      showProject(card.getAttribute("data-project"));
    });
  });
  dview.querySelector("[data-back]").addEventListener("click", function () { dview.classList.remove("show"); });

  /* tabs filter */
  var tabs = [].slice.call(drawer.querySelectorAll("[data-tab]"));
  var cards = [].slice.call(drawer.querySelectorAll(".dcard"));
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
      var f = t.getAttribute("data-tab");
      cards.forEach(function (c) { c.style.display = (f === "all" || c.getAttribute("data-cat") === f) ? "" : "none"; });
    });
  });

  /* ---------- mobile menu ---------- */
  var mmenu = document.getElementById("mmenu");
  function closeMenu() { mmenu.classList.remove("open"); }
  var mbtn = document.querySelector("[data-menu]");
  if (mbtn) mbtn.addEventListener("click", function () { mmenu.classList.add("open"); });
  mmenu.querySelector("[data-close-menu]").addEventListener("click", closeMenu);
})();
