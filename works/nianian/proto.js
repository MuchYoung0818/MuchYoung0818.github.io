/* ============================================================
   《念念》原型导航引擎 · proto.js
   唯一导航来源：注入 PC 侧栏 / 移动 tabbar / 顶栏
   交互：seg 分段器（data-mode 联动过滤 + 面板切换）、引文卡展开、chip 填入
   页面内禁止自建导航与硬编码色值
   ============================================================ */
(function () {
  "use strict";

  var ICONS = {
    chat: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    memory: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',
    care: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    profile: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
  };

  /* nav-config：模块开关/排序/角标统一在此维护（PRD G1） */
  var NAV_CONFIG = [
    { id: "chat",    label: "对话", href: "chat.html",    icon: "chat",    badge: 0 },
    { id: "memory",  label: "记忆", href: "memory.html",  icon: "memory",  badge: 3 },
    { id: "care",    label: "关怀", href: "care.html",    icon: "care",    badge: 0 },
    { id: "profile", label: "我的", href: "profile.html", icon: "profile", badge: 0 }
  ];

  /* 子页面归属：不在常驻导航，但高亮其父项 */
  var PAGE_ALIASES = {
    "chat-empty": "chat",
    "memory-detail": "memory",
    "memory-review": "memory",
    "conflict": "memory"
  };

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function buildNav(kind) {
    var shell = document.getElementById("shell");
    var page = shell ? (PAGE_ALIASES[shell.dataset.page] || shell.dataset.page) : "";
    var nodes = [];
    NAV_CONFIG.forEach(function (n) {
      var badge = n.badge ? '<span class="n-badge num">' + n.badge + "</span>" : "";
      var cls = "nav-item" + (n.id === page ? " active" : "");
      var html = '<a class="' + (kind === "tab" ? "tab-item" : cls) + (n.id === page ? " active" : "") +
                 '" href="' + n.href + '" title="' + esc(n.label) + '">' +
                 ICONS[n.icon] + "<span>" + esc(n.label) + "</span>" + badge + "</a>";
      nodes.push(el(html));
    });
    return nodes;
  }

  function inject() {
    var shell = document.getElementById("shell");
    if (!shell) return;
    var title = shell.dataset.title || "";
    var sub = shell.dataset.sub || "";

    /* PC 侧栏 */
    var side = el(
      '<aside class="sidebar">' +
        '<div class="logo"><div class="logo-mark">念</div><div><span class="logo-name">念念</span>' +
        '<span class="logo-tag">NIANNIAN · 记得你，也让你放心</span></div></div>' +
        '<nav class="nav" id="protoNav"></nav>' +
        '<div class="side-foot">求职案例《念念》<br><a href="index.html">案例封面</a> · <a href="../../docs/nianian-03-PRD.md">PRD</a> · <a href="../../docs/nianian-01-竞品拆解报告.md">拆解报告</a></div>' +
      "</aside>"
    );
    var navBox = side.querySelector("#protoNav");
    buildNav("side").forEach(function (n) { navBox.appendChild(n); });

    /* 内容列 + 顶栏 */
    var col = el('<div class="content-col"></div>');
    var bar = el('<header class="topbar"><div><div class="t-title" style="font-weight:650">' + esc(title) + "</div>" +
                 (sub ? '<div class="t-sub">' + esc(sub) + "</div>" : "") + "</div></header>");
    while (shell.firstChild) col.appendChild(shell.firstChild);
    col.insertBefore(bar, col.firstChild);

    shell.appendChild(side);
    shell.appendChild(col);

    /* 移动 tabbar */
    var tab = el('<nav class="tabbar" id="protoTabbar"></nav>');
    buildNav("tab").forEach(function (n) { tab.appendChild(n); });
    document.body.appendChild(tab);
  }

  /* ---------- 全局交互 ---------- */
  function bindInteractions() {
    /* seg 分段器：激活态 + 作用域 data-mode 联动（过滤与面板切换共用） */
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".seg-btn");
      if (btn) {
        var seg = btn.closest(".seg");
        if (seg) seg.querySelectorAll(".seg-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
        var scope = btn.closest("[data-seg-scope]") || document.body;
        var mode = btn.dataset.seg || "";
        if (mode) {
          scope.setAttribute("data-mode", mode);
          scope.querySelectorAll("[data-seg-pane]").forEach(function (p) {
            p.classList.toggle("active", p.dataset.segPane === mode);
          });
        }
        return;
      }

      /* 引文卡展开（G4 证据可点） */
      var src = e.target.closest("[data-quote]");
      if (src) {
        var q = document.getElementById(src.dataset.quote);
        if (q) { q.classList.toggle("open"); e.preventDefault(); }
        return;
      }

      /* 话题 chip 填入输入框 */
      var chip = e.target.closest(".chip");
      if (chip) {
        var ta = document.querySelector(".input-row textarea");
        if (ta) { ta.value = chip.dataset.fill || chip.textContent.trim(); ta.focus(); }
        return;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    inject();
    bindInteractions();
    window.__protoReady = true;
  });
})();
