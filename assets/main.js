/* dannyxs.com — behaviors for the tabbed-portfolio layout */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isDesktop = function () { return window.matchMedia("(min-width: 1024px)").matches; };

  var EMAIL = "eliuniversestu@gmail.com";

  /* ---------- projects registry (order = page order) ---------- */
  var PROJECTS = [
    { id: "quantum3labs", name: "Quantum3 Labs", group: "Web3" },
    { id: "stormbit", name: "Stormbit", group: "Web3" },
    { id: "kibble", name: "Kibble Exchange", group: "Web3" },
    { id: "qash", name: "Qash", group: "Web3" },
    { id: "polypay", name: "PolyPay", group: "Web3" },
    { id: "prismpay", name: "Prism Pay", group: "Mobile Apps" },
    { id: "getgoldy", name: "Get Goldy", group: "Mobile Apps" },
    { id: "oneplan", name: "OnePlan Travel", group: "Mobile Apps" },
    { id: "trumchinese", name: "Trùm Chinese", group: "Mobile Apps" },
    { id: "gearrunner", name: "Gear Runner", group: "Mobile Apps" }
  ];

  /* ---------- the About letter (shared desktop + mobile) ---------- */
  var LETTER = [
    'I’m Dinh Phan Nhat Nam — everyone calls me Danny. A Product Designer from Vietnam.',
    'Over the past five years I’ve designed more than 30 products across Web3, education and IoT — and somewhere along the way, design stopped being a job and became the way I look at everything.',
    'Today I lead design at <a class="txtlink" href="https://www.quantum3labs.com/" target="_blank" rel="noreferrer">Quantum3 Labs</a>, the studio behind Stormbit, Qash and Prism Pay. In Web3 I don’t stop at the mockup: I design and build the product end-to-end, no frontend developers involved.',
    'I also co-founded <a class="txtlink" href="https://apps.apple.com/vn/app/oneplan-travel/id6761648165" target="_blank" rel="noreferrer">OnePlan Travel</a>, an iOS app for planning group trips — my turn on the founder’s side of the table.',
    'Along the way the work picked up two Awwwards mentions and a top-3 shirt design at Superteam Malaysia.',
    'And the beer mug in the corner? That’s the unofficial logo. If you’re ever in Ho Chi Minh City, the first round’s on me.'
  ];
  document.querySelectorAll("[data-letter]").forEach(function (el) {
    el.innerHTML = LETTER.map(function (p) { return "<p>" + p + "</p>"; }).join("");
  });

  /* ---------- clock ---------- */
  function fmt(tz) {
    return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(new Date());
  }
  function tickClock() {
    var here = fmt("Asia/Ho_Chi_Minh");
    var yours = fmt(undefined);
    var txt = (here === yours)
      ? "It’s " + here + " in Ho Chi Minh City."
      : "It’s " + here + " in Ho Chi Minh City, and " + yours + " where you are.";
    document.querySelectorAll("[data-clock]").forEach(function (el) { el.textContent = txt; });
  }
  tickClock();
  setInterval(tickClock, 15000);

  /* ---------- typed greeting ---------- */
  (function () {
    var h = new Date().getHours();
    var word = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    var msg = word + ", I’m Danny!";
    var targets = document.querySelectorAll("[data-typed]");
    if (reduceMotion) {
      targets.forEach(function (t) { t.textContent = msg; });
      return;
    }
    var i = 0;
    setTimeout(function type() {
      i++;
      targets.forEach(function (t) { t.textContent = msg.slice(0, i); });
      if (i < msg.length) setTimeout(type, 42 + Math.random() * 46);
    }, 500);
  })();

  /* ---------- navigation ---------- */
  var mainEl = document.getElementById("main");
  var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".sidebar .tab"));
  var pillLabel = document.getElementById("pill-label");
  var pillIcon = document.getElementById("pill-icon");

  function projectOf(id) {
    for (var i = 0; i < PROJECTS.length; i++) if (PROJECTS[i].id === id) return PROJECTS[i];
    return null;
  }
  function iconOf(id) { return id === "welcome" ? "assets/favicon-32.png" : "assets/icons/" + id + ".png"; }
  function nameOf(id) { var p = projectOf(id); return p ? p.name : "Home"; }

  var mobCurrent = "welcome";

  function goTo(id) {
    if (isDesktop()) {
      var sec = document.getElementById(id);
      if (sec) sec.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    } else {
      // mobile: swap pages
      document.querySelectorAll(".page.proj.mob-open, .mob-about.mob-open").forEach(function (el) {
        el.classList.remove("mob-open");
      });
      mobCurrent = id;
      if (id === "welcome") {
        mainEl.classList.remove("mob-in-proj");
        window.scrollTo(0, 0);
      } else {
        mainEl.classList.add("mob-in-proj");
        var sec2 = document.getElementById(id);
        if (sec2) sec2.classList.add("mob-open");
        window.scrollTo(0, 0);
      }
      pillLabel.textContent = nameOf(id);
      pillIcon.src = iconOf(id);
      document.querySelectorAll(".sheet .s-row[data-goto]").forEach(function (r) {
        r.classList.toggle("cur", r.getAttribute("data-goto") === id);
      });
    }
    closeSheet();
  }

  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-goto]");
    if (g) { goTo(g.getAttribute("data-goto")); return; }
    var back = e.target.closest("[data-back]");
    if (back) { goTo("welcome"); return; }
  });

  /* sidebar active state follows scroll (desktop) */
  var activeId = "welcome";
  function currentPage() {
    var mid = window.scrollY + window.innerHeight / 2;
    var best = pages[0], bestD = Infinity;
    pages.forEach(function (p) {
      var top = p.offsetTop, c = top + p.offsetHeight / 2;
      var d = Math.abs(c - mid);
      if (d < bestD) { bestD = d; best = p; }
    });
    return best;
  }
  function updateActive() {
    if (!isDesktop()) return;
    var p = currentPage();
    p.classList.add("seen");
    if (p.id !== activeId) {
      activeId = p.id;
      tabs.forEach(function (t) { t.classList.toggle("active", t.getAttribute("data-goto") === activeId); });
      syncVideos(activeId);
    }
  }
  var lastRun = 0;
  window.addEventListener("scroll", function () {
    var now = Date.now();
    if (now - lastRun < 80) return;
    lastRun = now;
    updateActive();
    setTimeout(updateActive, 140); // settle after snap
  }, { passive: true });
  window.addEventListener("resize", updateActive);
  updateActive();

  /* group collapse */
  document.querySelectorAll(".ghead").forEach(function (h) {
    h.addEventListener("click", function () {
      var body = document.getElementById(h.getAttribute("data-group"));
      var closed = h.classList.toggle("closed");
      if (body) body.classList.toggle("hidden", closed);
    });
  });

  /* ---------- avatar popover ---------- */
  var meBtn = document.getElementById("me-btn");
  var meMenu = document.getElementById("me-menu");
  if (meBtn) {
    meBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      meMenu.hidden = !meMenu.hidden;
    });
    document.addEventListener("click", function (e) {
      if (!meMenu.hidden && !e.target.closest(".me-wrap")) meMenu.hidden = true;
    });
  }

  /* ---------- copy email ---------- */
  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      function done() {
        btn.classList.add("copied");
        setTimeout(function () { btn.classList.remove("copied"); }, 1400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = EMAIL; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (err) {}
        document.body.removeChild(ta); done();
      }
    });
  });

  /* ---------- omnibox search ---------- */
  var omniWrap = document.getElementById("omni-wrap");
  var omniInput = document.getElementById("omni-input");
  var omniDrop = document.getElementById("omni-drop");
  var omniList = document.getElementById("omni-list");
  var omniSel = 0;

  function omniResults(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return PROJECTS.filter(function (p) {
      return (p.name + " " + p.group + " " + p.id).toLowerCase().indexOf(q) !== -1;
    });
  }
  function renderOmni(res) {
    if (!res.length) {
      omniList.innerHTML = '<div class="omni-empty">No matches — try a project name.</div>';
      return;
    }
    omniList.innerHTML = res.map(function (p, i) {
      return '<button type="button" class="omni-row' + (i === omniSel ? " sel" : "") + '" data-omni="' + p.id + '">' +
        '<img src="' + iconOf(p.id) + '" alt="">' +
        '<span class="r-name">' + p.name + '</span>' +
        '<span class="r-group">' + p.group + '</span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 4v7a4 4 0 0 1-4 4H4"/><path d="m9 10-5 5 5 5"/></svg>' +
        "</button>";
    }).join("");
  }
  function updateOmni() {
    var v = omniInput.value;
    omniWrap.classList.toggle("filled", v.length > 0);
    var res = omniResults(v);
    if (v.trim()) {
      if (omniSel >= res.length) omniSel = 0;
      renderOmni(res);
      omniDrop.hidden = false;
    } else {
      omniDrop.hidden = true;
    }
  }
  function closeOmni() {
    omniInput.value = "";
    omniSel = 0;
    updateOmni();
  }
  if (omniInput) {
    omniInput.addEventListener("input", function () { omniSel = 0; updateOmni(); });
    omniInput.addEventListener("keydown", function (e) {
      var res = omniResults(omniInput.value);
      if (e.key === "ArrowDown") { e.preventDefault(); if (res.length) { omniSel = (omniSel + 1) % res.length; renderOmni(res); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (res.length) { omniSel = (omniSel - 1 + res.length) % res.length; renderOmni(res); } }
      else if (e.key === "Enter") { if (res.length) { goTo(res[omniSel].id); closeOmni(); omniInput.blur(); } }
      else if (e.key === "Escape") { closeOmni(); omniInput.blur(); }
    });
    omniDrop.addEventListener("mousedown", function (e) {
      var row = e.target.closest("[data-omni]");
      if (row) { e.preventDefault(); goTo(row.getAttribute("data-omni")); closeOmni(); omniInput.blur(); }
    });
    omniWrap.querySelector(".clear").addEventListener("click", function () { closeOmni(); omniInput.focus(); });
    document.addEventListener("click", function (e) {
      if (!omniDrop.hidden && !e.target.closest("#omni-wrap")) omniDrop.hidden = true;
    });
    omniInput.addEventListener("focus", updateOmni);
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        goTo("welcome");
        setTimeout(function () { omniInput.focus(); }, 350);
      }
    });
  }

  /* ---------- video players ---------- */
  var players = [];
  document.querySelectorAll(".stage-video").forEach(function (stage) {
    var v = stage.querySelector(".vmain");
    var bg = stage.querySelector(".vbg");
    var ctrl = stage.querySelector(".vctrl");
    var pp = ctrl.querySelector(".pp");
    var seek = ctrl.querySelector(".seek");
    var fill = ctrl.querySelector(".fill");
    var knob = ctrl.querySelector(".knob");
    var pageEl = stage.closest(".page");

    function play() {
      v.play().catch(function () {});
      if (bg && isDesktop()) bg.play().catch(function () {});
      ctrl.classList.add("playing");
      pp.title = "Pause";
    }
    function pause() {
      v.pause(); if (bg) bg.pause();
      ctrl.classList.remove("playing");
      pp.title = "Play";
    }
    pp.addEventListener("click", function () { v.paused ? play() : pause(); });
    v.addEventListener("click", function () { v.paused ? play() : pause(); });
    v.addEventListener("timeupdate", function () {
      if (!v.duration) return;
      var p = (v.currentTime / v.duration) * 100;
      fill.style.width = p + "%";
      knob.style.left = p + "%";
      seek.setAttribute("aria-valuenow", Math.round(p));
      if (bg && Math.abs(bg.currentTime - v.currentTime) > 0.35) bg.currentTime = v.currentTime;
    });
    function seekTo(clientX) {
      var r = seek.querySelector(".track").getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      if (v.duration) v.currentTime = p * v.duration;
    }
    var dragging = false;
    seek.addEventListener("pointerdown", function (e) { dragging = true; seek.setPointerCapture(e.pointerId); seekTo(e.clientX); });
    seek.addEventListener("pointermove", function (e) { if (dragging) seekTo(e.clientX); });
    seek.addEventListener("pointerup", function () { dragging = false; });
    players.push({ pageId: pageEl.id, play: play, pause: pause, video: v });
  });
  function syncVideos(activeId) {
    if (!players) return;
    players.forEach(function (p) {
      if (p.pageId === activeId) { if (!reduceMotion) p.play(); }
      else p.pause();
    });
  }

  /* ---------- shot viewers (segmented images + phone flows) ---------- */
  document.querySelectorAll("[data-viewer]").forEach(function (stage) {
    var shotsBox = stage.querySelector("[data-shots]");
    var shots = Array.prototype.slice.call(shotsBox.querySelectorAll(".shot"));
    var segs = Array.prototype.slice.call(stage.querySelectorAll("[data-seg] > button"));
    var next = stage.querySelector("[data-next]");
    var fsbtn = stage.querySelector("[data-fullscreen]");
    var idx = 0;
    var isFlow = stage.hasAttribute("data-flow");

    // measure the first image to size the shots box
    function size() {
      var img = shots[0].querySelector("img");
      if (!img.naturalWidth) return;
      var area = stage.querySelector(".canvasarea");
      var maxW = area.clientWidth - (isFlow ? 120 : 0);
      var maxH = area.clientHeight;
      if (!maxH || maxH < 40) maxH = area.clientHeight;
      var ratio = img.naturalWidth / img.naturalHeight;
      var w = maxW, h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      shotsBox.style.width = Math.round(w) + "px";
      shotsBox.style.height = Math.round(h) + "px";
    }
    var first = shots[0].querySelector("img");
    if (first.complete) size(); else first.addEventListener("load", size);
    window.addEventListener("resize", size);
    if ("ResizeObserver" in window) new ResizeObserver(size).observe(stage.querySelector(".canvasarea"));

    function show(i) {
      idx = (i + shots.length) % shots.length;
      shots.forEach(function (s, j) { s.classList.toggle("on", j === idx); });
      segs.forEach(function (s, j) { s.classList.toggle("on", j === idx); });
    }
    segs.forEach(function (s, j) { s.addEventListener("click", function () { show(j); }); });
    if (next) next.addEventListener("click", function () { show(idx + 1); });
    shotsBox.addEventListener("click", function () {
      if (isFlow) show(idx + 1);
      else if (fsbtn) openLightbox(shots[idx].querySelector("img").src);
    });
    shotsBox.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(idx + 1); }
    });
    if (fsbtn) fsbtn.addEventListener("click", function () {
      openLightbox(shots[idx].querySelector("img").src);
    });
  });

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector("img");
  function openLightbox(src) {
    lbImg.src = src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.closest("[data-lb-close]")) closeLightbox();
  });

  /* ---------- about dialog ---------- */
  var aboutDlg = document.getElementById("about-dlg");
  function openAbout() {
    if (isDesktop()) {
      aboutDlg.classList.add("open");
      aboutDlg.setAttribute("aria-hidden", "false");
    } else {
      // mobile: about is a page
      document.querySelectorAll(".page.proj.mob-open").forEach(function (el) { el.classList.remove("mob-open"); });
      mainEl.classList.add("mob-in-proj");
      mobCurrent = "mob-about";
      document.getElementById("mob-about").classList.add("mob-open");
      pillLabel.textContent = "About";
      pillIcon.src = "assets/favicon-32.png";
      window.scrollTo(0, 0);
      closeSheet();
    }
  }
  function closeAbout() {
    aboutDlg.classList.remove("open");
    aboutDlg.setAttribute("aria-hidden", "true");
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-about]")) { openAbout(); return; }
    if (e.target.closest("[data-about-close]")) { closeAbout(); return; }
  });
  document.querySelectorAll(".pola").forEach(function (p) {
    p.addEventListener("click", function () {
      var flipped = p.classList.toggle("flipped");
      p.setAttribute("aria-pressed", flipped ? "true" : "false");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (lightbox.classList.contains("open")) closeLightbox();
      else if (aboutDlg.classList.contains("open")) closeAbout();
      else closeSheet();
    }
  });

  /* ---------- mobile sheet ---------- */
  var pill = document.getElementById("mob-pill");
  var sheetScrim = document.getElementById("sheet-scrim");
  function openSheet() { document.body.classList.add("sheet-open"); }
  function closeSheet() { document.body.classList.remove("sheet-open"); }
  if (pill) pill.addEventListener("click", function () {
    document.body.classList.contains("sheet-open") ? closeSheet() : openSheet();
  });
  if (sheetScrim) sheetScrim.addEventListener("click", closeSheet);

  /* start the home video muted-paused; play videos only when visible */
  syncVideos("welcome");
})();
