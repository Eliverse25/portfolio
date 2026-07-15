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
  var NOTE = "Built solo, end-to-end: from the first design to the live product — no frontend developers involved.";
  var PROJECTS = {
    quantum3labs: {
      name: "Quantum3 Labs", meta: "Web3 · Studio — 2024–Present · Product Designer, Design Lead",
      sum: "The Web3 studio behind Stormbit, Qash and Prism — where I lead design across the whole product suite, including the studio's own site.",
      did: ["Design direction across the product suite", "Studio website and brand touchpoints", "Working hand-in-hand with engineering on every release"],
      note: NOTE, link: "https://www.quantum3labs.com/", img: "assets/work/quantum3labs.webp"
    },
    stormbit: {
      name: "Stormbit", meta: "Web3 · DeFi — 2025 · Branding, UI/UX, Product",
      sum: "A full-cycle Web3 finance product: from brand identity to a lending and earning experience built for a global launch at ETHCC Cannes.",
      did: ["Brand identity and the lightning mark", "End-to-end UI/UX for earn and borrow flows", "Launch campaign and event key visuals"],
      note: NOTE, link: "https://stormbit.finance", img: "assets/work/stormbit.webp"
    },
    kibble: {
      name: "Kibble Exchange", meta: "Web3 · DEX on TON — 2024 · UI/UX, Game design",
      sum: "A decentralized exchange on the TON network, paired with a Telegram minigame that reached 700,000 players in its first week.",
      did: ["Swap and trading interface design", "Telegram minigame UX and onboarding", "TON Meetup Vietnam 2024 event branding"],
      note: NOTE, link: "https://kibble.exchange", img: "assets/work/kibble.webp"
    },
    qash: {
      name: "Qash", meta: "Web3 · Finance — 2026 · Landing, Banners, Team lead",
      sum: "Landing page design, banner systems and design team leadership for a Web3 finance platform built around vaults and yield.",
      did: ["Landing page and marketing visuals", "Banner system across campaigns", "Leading the design team and reviews"],
      note: NOTE, link: "https://www.qash.finance/", img: "assets/work/qash.webp"
    },
    polypay: {
      name: "PolyPay", meta: "Web3 · Payments — 2025 · Brand, UI/UX, Team lead",
      sum: "Brand identity and the full journey from MVP to final UI for a crypto payments and payroll platform, with team management throughout.",
      did: ["Brand identity and app icon", "MVP to final product UI", "Multi-signature transfers and batch approvals", "Market positioning visuals"],
      note: NOTE, link: "https://polypay.pro/", img: "assets/work/polypay.webp"
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
    prismpay: {
      name: "Prism Pay", meta: "Mobile · Payments — 2025 · UI/UX, Product",
      sum: "A QR-code payment app for spending digital assets on everyday purchases — part of the crypto finance suite I design at Quantum3labs, alongside Stormbit and Qash.",
      did: ["End-to-end payment flows — scan, pay, receive", "QR and wallet UX aimed at non-crypto-native users", "Design language shared with the Qash product family"],
      link: "",
      appstore: "https://apps.apple.com/us/app/prism-pay/id6768889220",
      googleplay: "https://play.google.com/store/apps/details?id=quantum3labs.prismapp",
      img: "assets/work/prismpay.webp"
    },
    getgoldy: {
      name: "Get Goldy", meta: "Mobile · Fintech — 2025 · UI/UX, Product",
      sum: "A gold-savings app for the Vietnamese market: buy gold by the fraction, watch your stash grow piece by piece, and keep bills in one place. Tích vàng nhẹ tênh, từng ngày tiền lên.",
      did: ["Savings flows — buy by fraction, track every piece you own", "Bills and receipts management", "Warm, collectible visual language with 3D gold artifacts"],
      link: "", img: "assets/work/getgoldy.webp"
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
    var lk = document.getElementById("dv-link");
    lk.href = p.link || "#";
    lk.style.display = p.link ? "" : "none";
    var note = document.getElementById("dv-note");
    note.textContent = p.note || "";
    note.style.display = p.note ? "" : "none";
    var stores = document.getElementById("dv-stores");
    var as = document.getElementById("dv-appstore");
    var gp = document.getElementById("dv-gplay");
    as.href = p.appstore || "#";
    gp.href = p.googleplay || "#";
    as.style.display = p.appstore ? "" : "none";
    gp.style.display = p.googleplay ? "" : "none";
    stores.style.display = (p.appstore || p.googleplay) ? "" : "none";
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

/* =========================================================
   HIRE ME — guided chat (static; ends in a prefilled email)
   ========================================================= */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hirep = document.getElementById("hirep");
  var chat = document.getElementById("chat");
  if (!hirep || !chat) return;
  var started = false, answers = {};

  function put(node) {
    chat.appendChild(node);
    requestAnimationFrame(function () { requestAnimationFrame(function () { node.classList.add("in"); }); });
    hirep.scrollTop = hirep.scrollHeight;
    return node;
  }
  function label(text, you) {
    var d = document.createElement("div");
    d.className = "who" + (you ? " you" : "");
    if (you) d.textContent = "You";
    else d.innerHTML = "<b>Danny</b> UI/UX & Product Designer";
    chat.appendChild(d);
  }
  function bubble(text, cls) {
    var d = document.createElement("div");
    d.className = "msg " + (cls || "");
    d.textContent = text;
    return put(d);
  }
  function avatar() {
    var d = document.createElement("div");
    d.className = "avatar";
    d.textContent = "D.";
    return put(d);
  }
  function typing(fn, delay) {
    if (reduce) { fn(); return; }
    var t = document.createElement("div");
    t.className = "msg typing in";
    t.innerHTML = "<i></i><i></i><i></i>";
    chat.appendChild(t); hirep.scrollTop = hirep.scrollHeight;
    setTimeout(function () { t.remove(); fn(); }, delay || 750);
  }
  function form(lblText, inputHTML, okText, onOk) {
    var d = document.createElement("div");
    d.className = "msg form";
    d.innerHTML = '<div class="lbl"></div>' + inputHTML + '<button class="ok" type="button">' + okText + "</button>";
    d.querySelector(".lbl").textContent = lblText;
    put(d);
    var field = d.querySelector("input,textarea");
    setTimeout(function () { field.focus(); }, 350);
    function submit() {
      var v = field.value.trim();
      if (!v) { field.focus(); return; }
      d.remove();
      onOk(v);
    }
    d.querySelector(".ok").addEventListener("click", submit);
    field.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && field.tagName === "INPUT") { e.preventDefault(); submit(); }
    });
  }

  function start() {
    if (started) return; started = true;
    label("Danny");
    bubble("Good day 🤝");
    typing(function () {
      bubble("I'm Danny 👋");
      avatar();
      setTimeout(function () {
        label("", true);
        bubble("👋", "you");
        bubble("Nice to meet you, Danny!", "you");
        setTimeout(askName, reduce ? 0 : 500);
      }, reduce ? 0 : 600);
    }, 800);
  }
  function askName() {
    form("My name is", '<input type="text" autocomplete="name" placeholder="Your name">', "OK ⏎", function (v) {
      answers.name = v;
      bubble(v, "you");
      typing(function () {
        label("Danny");
        bubble("Nice to meet you, " + v + "! Where can I reach you?");
        setTimeout(askEmail, reduce ? 0 : 400);
      });
    });
  }
  function askEmail() {
    form("You can reach me at", '<input type="email" autocomplete="email" placeholder="you@company.com">', "OK ⏎", function (v) {
      answers.email = v;
      bubble(v, "you");
      typing(function () {
        label("Danny");
        bubble("And what are we building together? ✨");
        setTimeout(askProject, reduce ? 0 : 400);
      });
    });
  }
  function askProject() {
    form("The project", '<textarea placeholder="A few lines about your product, timeline, budget…"></textarea>', "Send it ↗", function (v) {
      answers.project = v;
      bubble(v.length > 140 ? v.slice(0, 140) + "…" : v, "you");
      typing(function () {
        label("Danny");
        bubble("Perfect — your email app is opening. Hit send and I'll reply within 24h 🚀");
        var body = "Hi Danny,%0D%0A%0D%0A" + encodeURIComponent(v) + "%0D%0A%0D%0A" +
          encodeURIComponent(answers.name) + " — " + encodeURIComponent(answers.email);
        setTimeout(function () {
          location.href = "mailto:eliuniversestu@gmail.com?subject=" +
            encodeURIComponent("Project inquiry — " + answers.name) + "&body=" + body;
        }, reduce ? 0 : 900);
      });
    });
  }

  [].forEach.call(document.querySelectorAll("[data-hire]"), function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      hirep.classList.add("open");
      var mm = document.getElementById("mmenu"); if (mm) mm.classList.remove("open");
      setTimeout(start, reduce ? 0 : 450);
    });
  });
  document.querySelector("[data-hire-close]").addEventListener("click", function () { hirep.classList.remove("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") hirep.classList.remove("open"); });
})();
