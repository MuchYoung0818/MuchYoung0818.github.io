/* ============================================================
   《闻迹风云汇》C 端重设计 · proto.js
   唯一导航来源：注入 PC 侧栏 / 移动 tabbar / 顶栏
   交互：seg 分段器、引文卡展开
   ============================================================ */
(function () {
  "use strict";

  var ICONS = {
    radar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 12l6-4"/></svg>',
    watch: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.9 6.26 6.6.56-5 4.36 1.5 6.45L12 16.9l-6 3.73 1.5-6.45-5-4.36 6.6-.56L12 2z"/></svg>',
    review: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>',
    market: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-6 3 3 5-8"/></svg>'
  };

  /* nav-config（对应真实 MVP 的四大功能区） */
  var NAV_CONFIG = [
    { id: "radar",   label: "板块雷达", href: "radar.html",   icon: "radar",  badge: 0 },
    { id: "watch",   label: "自选",     href: "watchlist.html", icon: "watch", badge: 0 },
    { id: "review",  label: "复核",     href: "review.html",  icon: "review", badge: 4 },
    { id: "market",  label: "行情核验", href: "market.html",  icon: "market", badge: 0 }
  ];

  var PAGE_ALIASES = { "event": "radar" };

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
      var cls = (kind === "tab" ? "tab-item" : "nav-item") + (n.id === page ? " active" : "");
      nodes.push(el('<a class="' + cls + '" href="' + n.href + '" title="' + esc(n.label) + '">' +
        ICONS[n.icon] + "<span>" + esc(n.label) + "</span>" + badge + "</a>"));
    });
    return nodes;
  }

  function inject() {
    var shell = document.getElementById("shell");
    if (!shell) return;
    var title = shell.dataset.title || "";
    var sub = shell.dataset.sub || "";

    var side = el(
      '<aside class="sidebar">' +
        '<div class="logo"><div class="logo-mark">汇</div><div><span class="logo-name">闻迹风云汇</span>' +
        '<span class="logo-tag">FYHUI · 事件研究，不猜涨跌</span></div></div>' +
        '<nav class="nav" id="protoNav"></nav>' +
        '<div class="side-foot">真实项目 C 端重设计<br><a href="index.html">案例封面</a> · <a href="../../docs/fengyunhui-README.md">设计说明</a></div>' +
      "</aside>"
    );
    var navBox = side.querySelector("#protoNav");
    buildNav("side").forEach(function (n) { navBox.appendChild(n); });

    var col = el('<div class="content-col"></div>');
    var bar = el('<header class="topbar"><div><div class="t-title" style="font-weight:650">' + esc(title) + "</div>" +
                 (sub ? '<div class="t-sub">' + esc(sub) + "</div>" : "") + "</div></header>");
    while (shell.firstChild) col.appendChild(shell.firstChild);
    col.insertBefore(bar, col.firstChild);

    shell.appendChild(side);
    shell.appendChild(col);

    var tab = el('<nav class="tabbar" id="protoTabbar"></nav>');
    buildNav("tab").forEach(function (n) { tab.appendChild(n); });
    document.body.appendChild(tab);
  }

  function bindInteractions() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".seg-btn");
      if (btn) {
        var seg = btn.closest(".seg");
        if (seg) seg.querySelectorAll(".seg-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
        var scope = btn.closest("[data-seg-scope]");
        var mode = btn.dataset.seg || "";
        if (scope && mode) {
          scope.setAttribute("data-mode", mode);
          scope.querySelectorAll("[data-seg-pane]").forEach(function (p) {
            p.classList.toggle("active", p.dataset.segPane === mode);
          });
        }
        return;
      }
      var src = e.target.closest("[data-quote]");
      if (src) {
        var q = document.getElementById(src.dataset.quote);
        if (q) { q.classList.toggle("open"); e.preventDefault(); }
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
