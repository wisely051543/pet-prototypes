/* 寵派小管家原型・使用者測試工具
   Loaded by every prototype with <script src="../test-kit/kit.js" data-proto="<folder>"></script> in <head>.
   Off by default: the prototype behaves exactly as before. ?test=1 turns test mode on for this browser tab (sessionStorage),
   so it survives links between prototypes; ?test=0 or 「結束測試」 turns it off.
   In test mode:
   - the 原型控制 strip is hidden;
   - 自由探索: each flow's first entry carries a hint dot (hover / focus / tap shows what the flow does; a dot whose flow has a
     guided tour offers 「一步一步帶我做」), other entries of the same flow show the tooltip without a dot, and features the
     prototype does not carry get a dashed 「示範未開放」 outline;
   - 引導: a tour opens on an intro card (who you are, the situation, every step by name, 「開始」), then walks the flow one
     action or one explanation per step; everything outside the current step sits under a dark overlay that blocks clicks;
     the step card says 第 n 步／共 N 步 and folds out the whole step list (done steps ticked and readable again, the current
     one bold); between steps the highlight breathes and the card says 準備中; a finished tour shows a summary of every step
     with 「練習下一個流程」 and 「給意見」 (no rating), or, when the tour was opened from the 測試入口頁, with
     「回到任務清單」 and 「下一個任務」 (the 測試 tab offers 回到任務清單 too); a reload mid-tour asks whether to start over;
   - a 測試 tab on the right edge holds 給意見, the tours of this page, 流程提示 on/off, 匯出回饋 and 結束測試.
   Feedback and tour events stay in this browser (localStorage, shared by every prototype on the same origin) until exported.
   Per-prototype data (hints and tours) lives in test-kit/flows/<folder>.js, loaded only in test mode; see flows/README.md.
   Director pages (prototypes/life/ 毛毛的一天, prototypes/sign-link/ 王太太收不到簽署連結, prototypes/open-day/ 毛孩日和開張, prototypes/contract-life/ 一份契約的一生, prototypes/monthly-fee/ 毛孩日和的月費, prototypes/allergy/ 阿福的過敏, prototypes/closure/ 臨時公休那天, prototypes/line-down/ LINE 當機的那一小時, prototypes/stay/ 毛毛住兩晚, prototypes/erase/ 郭太太的刪除申請, prototypes/suspend/ 毛孩日和被停權到恢復, prototypes/late-cancel/ 臨時取消和沒來的那天, prototypes/last-day/ 阿楷離職那天, prototypes/new-service/ 貓咪剃毛上架, prototypes/sms-quota/ 簡訊用量快爆了): tours marked life: true belong to their acts. They are left out of the 測試 tab and 練習下一個流程;
   inside the life page's frame (?life= and a parent window) the kit hides its tab, sends every event to the life page, opens 給意見 when
   the life page asks, and ends a tour on a card that points to the life page's 下一幕. */
(function () {
  'use strict';
  var script = document.currentScript;
  var PROTO = (script && script.dataset.proto) || (location.pathname.split('/').slice(-2, -1)[0] || 'index');
  var qs = new URLSearchParams(location.search);
  var store = {
    get: function (s, k) { try { return window[s].getItem(k); } catch (e) { return null; } },
    set: function (s, k, v) { try { window[s].setItem(k, v); } catch (e) { /* private mode: test mode still works for this page */ } },
    del: function (s, k) { try { window[s].removeItem(k); } catch (e) { /* ignore */ } }
  };
  var S = 'sessionStorage', L = 'localStorage';
  if (qs.get('test') === '1') store.set(S, 'pp-test', '1');
  if (qs.get('test') === '0') { ['pp-test', 'pp-task', 'pp-tour', 'pp-hints'].forEach(function (k) { store.del(S, k); }); }
  var on = qs.get('test') === '1' || store.get(S, 'pp-test') === '1';
  if (!on) return;
  var LIFE = qs.get('life') && window.parent !== window;
  if (qs.get('task')) store.set(S, 'pp-task', qs.get('task'));
  if (qs.get('tour')) store.set(S, 'pp-tour', JSON.stringify({id: qs.get('tour'), i: 0, fresh: true}));

  var root = document.documentElement;
  root.classList.add('pp-on');
  if (LIFE) root.classList.add('pp-life');
  root.style.setProperty('--protoh', '0px');

  /* per-prototype data: flows/<folder>.js calls PP.register(folder, {name, hints, tours}) */
  var DATA = {name: PROTO, hints: [], tours: []};
  /* a step can exist only on some screens (a 回到列表 button that only a narrow layout has): minWidth / maxWidth on the step;
     the steps are picked once, when the page opens */
  var fits = function (s) { return !(s.minWidth && innerWidth < s.minWidth) && !(s.maxWidth && innerWidth > s.maxWidth); };
  var forScreen = function (t) { var st = (t.steps || []).filter(fits); return st.length === (t.steps || []).length ? t : Object.assign({}, t, {steps: st}); };
  window.PP = {register: function (id, d) { if (id === PROTO) { DATA = {name: d.name || id, hints: d.hints || [], tours: (d.tours || []).map(forScreen), minWidth: d.minWidth || 0}; } }};
  var dataReady = new Promise(function (res) {
    var s = document.createElement('script');
    s.src = new URL('flows/' + PROTO + '.js', script ? script.src : location.href).href;
    s.onload = res; s.onerror = res;
    (document.head || root).appendChild(s);
  });

  /* ---------- styles: the prototype's own tokens with fallbacks; never persimmon (that is the product's action color) ---------- */
  var css = [
    '.pp-on .proto{display:none !important}',
    '.pp-life #pp-tab{display:none !important}',
    '#pp-layer,#pp-tour{position:fixed;inset:0;pointer-events:none;font-family:var(--font, -apple-system, "PingFang TC", sans-serif)}',
    '#pp-layer{z-index:2147482990}',
    '#pp-tour{z-index:2147483000}',
    /* hint dot: a blue 「?」 badge with a white rim and a soft halo, so it reads on light cards, dark rails and orange buttons alike */
    '.pp-dot{position:absolute;width:32px;height:32px;margin:-16px 0 0 -16px;padding:0;border:0;border-radius:50%;background:transparent;pointer-events:auto;cursor:pointer;display:grid;place-items:center;font-family:inherit}',
    '.pp-dot::before{content:"?";width:22px;height:22px;border-radius:50%;background:#1F6FEB;color:#fff;font-size:14px;font-weight:900;line-height:22px;text-align:center;box-shadow:0 0 0 2.5px #fff,0 0 0 6px rgba(31,111,235,.28),0 2px 8px rgba(0,0,0,.35)}',
    '.pp-dot:hover::before{background:#1558C7;transform:scale(1.08)}',
    '.pp-dot::after{content:"";position:absolute;width:22px;height:22px;border-radius:50%;border:3px solid #1F6FEB;opacity:0;animation:pp-ring 2s cubic-bezier(.16,1,.3,1) 3}',
    '@keyframes pp-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.4);opacity:0}}',
    '.pp-dot:focus-visible{outline:2px solid var(--focus, #2B211C);outline-offset:2px}',
    '.pp-stub{position:absolute;border:2px dashed var(--control-border, #9A8878);border-radius:12px}',
    '.pp-tip,.pp-pop{position:absolute;max-width:min(280px, calc(100vw - 24px));padding:9px 12px;border-radius:12px;background:var(--ink, #2B211C);color:var(--surface, #fff);font-size:.8125rem;font-weight:700;line-height:1.5;box-shadow:0 6px 20px rgba(43,33,28,.28);animation:pp-in .18s cubic-bezier(.16,1,.3,1)}',
    '.pp-tip b,.pp-pop b{display:block;font-size:.875rem;font-weight:900}',
    '.pp-pop{pointer-events:auto;padding:12px 14px}',
    '.pp-pop button{display:block;margin-top:10px;min-height:40px;padding:0 14px;border-radius:999px;border:0;background:var(--surface, #fff);color:var(--ink, #2B211C);font:800 .8125rem var(--font, sans-serif);cursor:pointer}',
    '.pp-pop button:focus-visible{outline:2px solid var(--surface, #fff);outline-offset:2px}',
    '@keyframes pp-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}',
    /* tour: four transparent blockers around the hole; the hole's own shadow dims the page, and it moves by transform */
    '#pp-tour [hidden]{display:none !important}',
    '.pp-dim{position:absolute;inset:0;background:rgba(20,13,9,.58);pointer-events:auto}',
    '.pp-block{position:absolute;pointer-events:auto}',
    '.pp-hole{position:absolute;left:0;top:0;border-radius:14px;box-shadow:0 0 0 3px var(--surface, #fff),0 0 0 6px var(--ink, #2B211C),0 0 0 200vmax rgba(20,13,9,.58);transition:transform .28s cubic-bezier(.16,1,.3,1)}',
    '.pp-hole::after{content:"";position:absolute;inset:-9px;border-radius:17px;border:3px solid var(--surface, #fff);opacity:0}',
    '.pp-hole.pp-settling::after{animation:pp-breathe 1.1s ease-in-out infinite}',
    '@keyframes pp-breathe{0%,100%{opacity:0}50%{opacity:.9}}',
    '.pp-cover{position:absolute;pointer-events:auto;cursor:progress}',
    '.pp-num{position:absolute;width:32px;height:32px;margin:-16px 0 0 -16px;border-radius:50%;display:grid;place-items:center;background:var(--ink, #2B211C);color:var(--surface, #fff);font:900 1rem/1 var(--font, sans-serif);box-shadow:0 0 0 3px var(--surface, #fff)}',
    '.pp-card{position:absolute;width:min(360px, calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto;padding:16px 16px 14px;border-radius:20px;background:var(--surface, #fff);color:var(--ink, #2B211C);box-shadow:0 14px 44px rgba(20,13,9,.4);pointer-events:auto;animation:pp-in .22s cubic-bezier(.16,1,.3,1);box-sizing:border-box}',
    '.pp-card.pp-wide{width:min(420px, calc(100vw - 24px))}',
    '.pp-card .pp-head{display:flex;align-items:center;gap:12px;margin-bottom:8px}',
    '.pp-card .pp-top{margin-bottom:6px}',
    '.pp-card .pp-big{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:var(--ink, #2B211C);color:var(--surface, #fff);font-size:1.25rem;font-weight:900}',
    '.pp-card .pp-of,.pp-card .pp-tt{display:block;font-size:.8125rem;font-weight:800;color:var(--ink-muted, #6E6058);line-height:1.4}',
    '.pp-card h2{font-size:1.0625rem;font-weight:900;line-height:1.35;margin:0}',
    '.pp-card .pp-h3{font-size:.8125rem;font-weight:900;color:var(--ink-muted, #6E6058);margin:14px 0 6px}',
    '.pp-card p{margin:4px 0 0;font-size:.9375rem;font-weight:700;line-height:1.55}',
    '.pp-card .pp-note{margin-top:10px;font-size:.8125rem;color:var(--ink-muted, #6E6058)}',
    '.pp-card .pp-prep{display:inline-block;margin-top:8px;padding:2px 10px;border-radius:999px;background:var(--sunk, #F1E7DC);font-size:.8125rem;font-weight:800;color:var(--ink-muted, #6E6058)}',
    '.pp-card .pp-fill{margin-top:10px;padding:8px 10px;border-radius:12px;background:var(--sunk, #F1E7DC);font-size:.875rem;font-weight:800;display:flex;align-items:center;justify-content:space-between;gap:8px}',
    '.pp-card .pp-peekbox{margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--sunk, #F1E7DC);font-size:.875rem}',
    '.pp-card .pp-peekbox b{display:block;font-weight:900}',
    '.pp-card .pp-peekbox p{font-size:.875rem}',
    '.pp-card .pp-toggle{display:flex;width:100%;justify-content:space-between;align-items:center;gap:8px;min-height:44px;margin-top:10px;padding:0 2px;border:0;border-top:1.5px solid var(--border, #EADFD3);background:transparent;color:var(--ink, #2B211C);font:800 .875rem var(--font, sans-serif);cursor:pointer}',
    '.pp-card .pp-cnt{display:flex;align-items:center;gap:8px;color:var(--ink-muted, #6E6058)}',
    '.pp-card .pp-chev{width:8px;height:8px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform .2s cubic-bezier(.16,1,.3,1)}',
    '.pp-card .pp-toggle[aria-expanded="true"] .pp-chev{transform:translateY(2px) rotate(-135deg)}',
    '.pp-card .pp-toggle:focus-visible,.pp-card .pp-steps button:focus-visible{outline:2px solid var(--focus, #2B211C);outline-offset:2px;border-radius:8px}',
    '.pp-steps{list-style:none;margin:2px 0 0;padding:0;display:grid;gap:2px;max-height:min(36vh, 280px);overflow:auto;overscroll-behavior:contain}',
    '.pp-steps li,.pp-steps li button{display:grid;grid-template-columns:24px 1fr;gap:8px;align-items:start;font-size:.875rem;font-weight:700;line-height:1.45;color:var(--ink-muted, #6E6058)}',
    '.pp-steps li{padding:4px 2px}',
    '.pp-steps li:has(button){display:block;padding:0}',
    '.pp-steps li button{width:100%;min-height:36px;padding:4px 2px;border:0;border-radius:8px;background:transparent;text-align:left;font:inherit;cursor:pointer}',
    '.pp-steps li button[aria-pressed="true"]{background:var(--sunk, #F1E7DC);color:var(--ink, #2B211C)}',
    '.pp-steps .pp-mk{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;border:1.5px solid var(--track, #E6D9CC);font-size:.75rem;font-weight:900;font-variant-numeric:tabular-nums}',
    '.pp-steps .pp-done .pp-mk{border-color:var(--ink, #2B211C);background:var(--ink, #2B211C);color:var(--surface, #fff)}',
    '.pp-steps .pp-now{color:var(--ink, #2B211C);font-weight:900}',
    '.pp-steps .pp-now .pp-mk{border-color:var(--ink, #2B211C);color:var(--ink, #2B211C)}',
    '.pp-steps.pp-all{max-height:min(34vh, 300px)}',
    '.pp-card .pp-acts{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap}',
    '.pp-link{min-height:44px;padding:0 4px;border:0;background:transparent;color:var(--ink-muted, #6E6058);font:800 .875rem var(--font, sans-serif);text-decoration:underline;text-underline-offset:3px;cursor:pointer}',
    '.pp-link:focus-visible{outline:2px solid var(--focus, #2B211C);outline-offset:2px;border-radius:6px}',
    '@media (max-width: 480px){.pp-card,.pp-card.pp-wide{width:calc(100vw - 16px)}}',
    /* tab, panel, toast */
    '#pp-tab{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:2147483001;display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 6px;border:0;border-radius:14px 0 0 14px;background:var(--rail, #2E211B);color:var(--rail-cur, #F6EFE7);font:900 .8125rem/1.2 var(--font, sans-serif);writing-mode:vertical-rl;letter-spacing:.12em;cursor:pointer;box-shadow:-2px 4px 14px rgba(43,33,28,.25);min-width:36px;min-height:72px}',
    '#pp-tab .pp-n{writing-mode:horizontal-tb;margin-top:4px;min-width:20px;padding:0 5px;border-radius:999px;background:var(--rail-cur, #F6EFE7);color:var(--rail, #2E211B);font-size:.6875rem;letter-spacing:0}',
    '#pp-tab:focus-visible{outline:2px solid var(--focus, #2B211C);outline-offset:2px}',
    '@media (max-width: 480px){#pp-tab{min-width:28px;min-height:60px;padding:8px 4px;font-size:.75rem;top:22%;transform:none}}',
    '#pp-panel{position:fixed;right:12px;top:50%;transform:translateY(-50%);z-index:2147483002;width:min(340px, calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto;padding:16px;border-radius:20px;background:var(--surface, #fff);color:var(--ink, #2B211C);box-shadow:0 12px 40px rgba(43,33,28,.28);font-family:var(--font, sans-serif);animation:pp-in .22s cubic-bezier(.16,1,.3,1)}',
    '#pp-panel h2{font-size:1rem;font-weight:900;margin:0 0 2px}',
    '#pp-panel h3{font-size:.8125rem;font-weight:900;color:var(--ink-muted, #6E6058);margin:14px 0 6px}',
    '#pp-panel .pp-sub{font-size:.8125rem;font-weight:700;color:var(--ink-muted, #6E6058);margin:0 0 12px}',
    '#pp-panel .pp-row{display:flex;gap:8px;flex-wrap:wrap}',
    '#pp-panel button,#pp-panel textarea,.pp-card button{font:inherit}',
    '.pp-btn{min-height:44px;padding:0 14px;border-radius:999px;border:1.5px solid var(--border, #EADFD3);background:var(--surface, #fff);color:var(--ink, #2B211C);font-weight:800 !important;font-size:.875rem !important;cursor:pointer}',
    '.pp-btn.pp-main,.pp-btn[aria-pressed="true"]{background:var(--ink, #2B211C);border-color:var(--ink, #2B211C);color:var(--surface, #fff)}',
    '.pp-btn[aria-disabled="true"]{border-style:dashed;color:var(--ink-muted, #6E6058);cursor:not-allowed}',
    '.pp-btn:focus-visible,#pp-panel textarea:focus-visible{outline:2px solid var(--focus, #2B211C);outline-offset:2px}',
    '.pp-list{display:grid;gap:6px;margin:0;padding:0;list-style:none}',
    '.pp-list button{width:100%;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:8px}',
    '.pp-list small{font-size:.75rem;font-weight:700;opacity:.75}',
    '#pp-panel label{display:block;font-size:.8125rem;font-weight:800;margin:12px 0 6px}',
    '#pp-panel textarea{width:100%;min-height:96px;padding:10px 12px;border-radius:12px;border:1.5px solid var(--control-border, #9A8878);background:var(--surface, #fff);color:var(--ink, #2B211C);font-size:1rem;resize:vertical;box-sizing:border-box}',
    '#pp-panel .pp-ctx{margin:10px 0 0;font-size:.75rem;font-weight:700;color:var(--ink-muted, #6E6058);line-height:1.5}',
    '#pp-panel .pp-err{display:block;margin-top:6px;font-size:.8125rem;font-weight:800;color:var(--danger, #B42318)}',
    '#pp-panel .pp-x{position:absolute;right:10px;top:10px;width:44px;height:44px;border:0;border-radius:50%;background:transparent;color:var(--ink-muted, #6E6058);font-size:1.25rem;cursor:pointer}',
    '#pp-panel .pp-foot{display:flex;justify-content:space-between;gap:8px;margin-top:14px;flex-wrap:wrap}',
    '.pp-picking, .pp-picking *{cursor:crosshair !important}',
    '#pp-pickbar{position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:2147483003;padding:10px 16px;border-radius:999px;background:var(--ink, #2B211C);color:var(--surface, #fff);font:800 .875rem var(--font, sans-serif);box-shadow:0 6px 20px rgba(43,33,28,.28)}',
    '#pp-toast{position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:2147483003;padding:12px 18px;border-radius:14px;background:var(--ink, #2B211C);color:var(--surface, #fff);font:800 .875rem var(--font, sans-serif);box-shadow:0 6px 20px rgba(43,33,28,.28);animation:pp-in .2s cubic-bezier(.16,1,.3,1)}',
    '.pp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
    '@media (prefers-reduced-motion: reduce){.pp-dot::after,.pp-tip,.pp-pop,.pp-card,#pp-panel,#pp-toast,.pp-hole.pp-settling::after{animation:none}.pp-hole.pp-settling::after{opacity:.6}.pp-hole,.pp-card .pp-chev{transition:none}}'
  ].join('\n');
  var styleEl = document.createElement('style'); styleEl.id = 'pp-style'; styleEl.textContent = css;
  (document.head || root).appendChild(styleEl);

  /* ---------- stores ---------- */
  var readJ = function (k) { try { return JSON.parse(store.get(L, k) || '[]'); } catch (e) { return []; } };
  var writeJ = function (k, a) { store.set(L, k, JSON.stringify(a)); };
  var roleOf = function () { var r = new URLSearchParams(location.search).get('role'); var sel = document.getElementById('p-role'); return r || (sel && sel.value) || ''; };
  var logEvent = function (type, extra) {
    var ev = {at: new Date().toISOString(), proto: PROTO, role: roleOf(), type: type};
    Object.keys(extra || {}).forEach(function (k) { ev[k] = extra[k]; });
    var a = readJ('pp-events'); a.push(ev); writeJ('pp-events', a);
    if (LIFE) try { window.parent.postMessage({pp: 'life-kit', ev: ev}, location.origin); } catch (e) { /* not our parent */ }
  };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); };
  var labelOf = function (el) { return ((el.getAttribute('aria-label') || el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim()).slice(0, 60); };
  /* what a person actually points at: an input inside a label is reached through the label */
  var boxOf = function (el) { return (el.matches && el.matches('input, select') && el.closest('label')) || el; };
  var shown = function (el) { var r = boxOf(el).getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; };
  var usable = function (el) { return el && shown(el) && el.getAttribute('aria-disabled') !== 'true' && !el.disabled; };

  var ready = function (fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); };
  ready(function () { dataReady.then(start); });

  function start() {
    var layer = document.createElement('div'); layer.id = 'pp-layer'; document.body.appendChild(layer);
    var tourLayer = document.createElement('div'); tourLayer.id = 'pp-tour'; document.body.appendChild(tourLayer);
    var live = document.createElement('div'); live.className = 'pp-sr'; live.setAttribute('aria-live', 'polite'); document.body.appendChild(live);
    var tip = null, tipFor = null, pop = null, picking = false, panel = null, lastFocus = null;
    var hintsOn = store.get(S, 'pp-hints') !== '0' && !store.get(S, 'pp-task');
    var tour = null;   /* {def, i, phase: 'act'|'wait'|'stuck'|'done', since, settleUntil, targets, clicked} */
    var tourById = function (id) { return DATA.tours.filter(function (t) { return t.id === id; })[0] || null; };

    /* ============ 自由探索: hint dots and tooltips ============ */
    var hintFor = function (el, rule) {
      if (rule.stub) return {stub: true};
      if (rule.by) {
        var text = labelOf(el), keys = Object.keys(rule.by).sort(function (a, b) { return b.length - a.length; });
        for (var i = 0; i < keys.length; i++) if (text.indexOf(keys[i]) === 0) { var v = rule.by[keys[i]]; return {t: v[0], d: v[1], tour: v[2] || rule.tour}; }
        return null;
      }
      return {t: rule.t, d: rule.d, tour: rule.tour};
    };
    var onTop = function (el, r) {
      if (!r.width || !r.height || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) return false;
      var x = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1), y = Math.min(Math.max(r.top + r.height / 2, 1), innerHeight - 1);
      var hit = document.elementFromPoint(x, y);
      return !!hit && (el === hit || el.contains(hit) || hit.contains(el));
    };
    var targets = [];
    var placeHints = function () {
      layer.querySelectorAll('.pp-dot, .pp-stub').forEach(function (n) { n.remove(); });
      targets = [];
      if (!hintsOn || picking || tour) return;
      var seen = new Set(), dotted = new Set();
      DATA.hints.forEach(function (rule) {
        document.querySelectorAll(rule.sel).forEach(function (el) {
          if (seen.has(el) || el.closest('#pp-panel, #pp-layer, #pp-tour, .proto') || el.getAttribute('aria-disabled') === 'true' || el.disabled) return;
          var h = hintFor(el, rule); if (!h) return;
          var r = boxOf(el).getBoundingClientRect(); if (!onTop(boxOf(el), r)) return;
          seen.add(el);
          if (h.stub) {
            var s = document.createElement('span'); s.className = 'pp-stub';
            s.style.left = (r.left - 3) + 'px'; s.style.top = (r.top - 3) + 'px'; s.style.width = (r.width + 6) + 'px'; s.style.height = (r.height + 6) + 'px';
            layer.appendChild(s);
            targets.push({el: el, h: {t: '示範未開放', d: '這個原型沒有做這個功能，點了只會出現提示'}}); return;
          }
          var i = targets.length; targets.push({el: el, h: h});
          if (rule.quiet || dotted.has(h.t)) return;
          dotted.add(h.t);
          var dot = document.createElement('button'); dot.type = 'button'; dot.className = 'pp-dot';
          dot.style.left = Math.min(r.right + 2, innerWidth - 14) + 'px'; dot.style.top = Math.max(r.top - 2, 14) + 'px';
          dot.setAttribute('aria-label', '提示：' + h.t + '，' + h.d + (h.tour && tourById(h.tour) ? '。可以一步一步帶你做' : ''));
          dot.dataset.i = i;
          layer.appendChild(dot);
        });
      });
      if (tipFor && !document.contains(tipFor.el)) hideTip();
    };
    var placeNear = function (node, r) {
      var w = node.offsetWidth, h = node.offsetHeight;
      node.style.left = Math.min(Math.max(r.left, 12), innerWidth - w - 12) + 'px';
      node.style.top = (r.bottom + 10 + h < innerHeight ? r.bottom + 10 : Math.max(r.top - h - 10, 12)) + 'px';
    };
    var showTip = function (el, h) {
      if (pop) return;
      if (!tip) { tip = document.createElement('div'); tip.className = 'pp-tip'; tip.setAttribute('role', 'tooltip'); tip.id = 'pp-tip'; layer.appendChild(tip); }
      tip.innerHTML = '<b>' + esc(h.t) + '</b>' + esc(h.d);
      tipFor = {el: el, h: h};
      placeNear(tip, boxOf(el).getBoundingClientRect());
      el.setAttribute('aria-describedby', ((el.getAttribute('aria-describedby') || '').replace(/\s*pp-tip/g, '') + ' pp-tip').trim());
    };
    var hideTip = function () {
      if (tipFor && tipFor.el) { var d = (tipFor.el.getAttribute('aria-describedby') || '').replace(/\s*pp-tip/g, '').trim(); if (d) tipFor.el.setAttribute('aria-describedby', d); else tipFor.el.removeAttribute('aria-describedby'); }
      if (tip) { tip.remove(); tip = null; } tipFor = null;
    };
    var hidePop = function (refocus) { if (pop) { var back = pop.back; pop.remove(); pop = null; if (refocus && back && document.contains(back)) back.focus(); } };
    var showPop = function (dot, t) {
      hideTip(); hidePop();
      var tr = t.h.tour && tourById(t.h.tour);
      pop = document.createElement('div'); pop.className = 'pp-pop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', t.h.t);
      pop.innerHTML = '<b>' + esc(t.h.t) + '</b>' + esc(t.h.d) + (tr ? '<button type="button" data-pp-tour="' + esc(tr.id) + '">一步一步帶我做</button>' : '');
      pop.back = dot; layer.appendChild(pop);
      placeNear(pop, boxOf(t.el).getBoundingClientRect());
      var b = pop.querySelector('button'); if (b) b.focus();
    };
    var targetOf = function (node) { for (var i = 0; i < targets.length; i++) if (targets[i].el === node || targets[i].el.contains(node) || boxOf(targets[i].el).contains(node)) return targets[i]; return null; };
    document.addEventListener('mouseover', function (e) { if (!hintsOn || picking || tour || pop) return; var t = targetOf(e.target); if (t) { if (!tipFor || tipFor.el !== t.el) showTip(t.el, t.h); } else if (tipFor && !(e.target.closest && e.target.closest('.pp-dot'))) hideTip(); }, true);
    document.addEventListener('focusin', function (e) { if (!hintsOn || tour || pop) return; var t = targetOf(e.target); if (t) showTip(t.el, t.h); else if (!(e.target.closest && e.target.closest('.pp-dot'))) hideTip(); }, true);
    layer.addEventListener('mouseover', function (e) { var d = e.target.closest('.pp-dot'); if (d && !pop) { var t = targets[+d.dataset.i]; if (t) showTip(t.el, t.h); } });
    layer.addEventListener('click', function (e) {
      var go = e.target.closest('[data-pp-tour]'); if (go) { hidePop(); startTour(go.dataset.ppTour); return; }
      var d = e.target.closest('.pp-dot'); if (!d) return; e.stopPropagation(); var t = targets[+d.dataset.i]; if (t) showPop(d, t);
    });
    document.addEventListener('click', function (e) {
      if (tip && !(e.target.closest && e.target.closest('.pp-dot'))) hideTip();
      if (pop && !(e.target.closest && e.target.closest('.pp-pop, .pp-dot'))) hidePop();
    }, true);

    /* ============ 引導: guided tours ============ */
    /* phases: intro (開場卡) → wait → act → … → finish → done (總結卡); stuck when a step's target never shows;
       resume after a reload asks whether to start over, since the prototype itself has gone back to its first state */
    var saveTour = function () {
      if (!tour) { store.del(S, 'pp-tour'); return; }
      store.set(S, 'pp-tour', JSON.stringify(tour.phase === 'intro' ? {id: tour.def.id, i: 0, fresh: true} : {id: tour.def.id, i: tour.i}));
    };
    var stepEls = function (step) {
      var all = [].slice.call(document.querySelectorAll(step.sel)).filter(function (el) { return !el.closest('#pp-tour, #pp-layer, #pp-panel') && shown(el); });
      if (step.group) return all;
      var first = all.filter(usable)[0] || all[0];
      return first ? [first] : [];
    };
    var unionRect = function (els) {
      var r = null;
      els.forEach(function (el) { var b = boxOf(el).getBoundingClientRect(); r = r ? {left: Math.min(r.left, b.left), top: Math.min(r.top, b.top), right: Math.max(r.right, b.right), bottom: Math.max(r.bottom, b.bottom)} : {left: b.left, top: b.top, right: b.right, bottom: b.bottom}; });
      return r;
    };
    var met = function (step) {
      var u = step.until; if (!u) return false;
      if (u.enabled) return usable(document.querySelector(u.enabled));
      if (u.appear) return [].slice.call(document.querySelectorAll(u.appear)).some(shown);
      if (u.value) { var f = document.querySelector(u.value[0]); return !!f && new RegExp(u.value[1]).test(f.value); }
      if (u.checked) { var c = document.querySelector(u.checked); return !!c && (c.checked === true || c.getAttribute('aria-checked') === 'true' || c.getAttribute('aria-pressed') === 'true'); }
      return false;
    };
    var listOpen = store.get(S, 'pp-steplist') === '1';
    var newTour = function (def, i, phase) { return {def: def, i: i || 0, phase: phase, since: Date.now(), startedAt: Date.now(), settleUntil: 0, clicked: false, peek: null}; };
    /* a tour needs the prototype as it first opens: once the tester has clicked around (or the tour wants another 身分), reload first */
    var touched = false;
    ['click', 'input'].forEach(function (t) { document.addEventListener(t, function (e) { if (!tour && e.isTrusted && !(e.target.closest && e.target.closest('#pp-layer, #pp-tour, #pp-panel, #pp-tab, #pp-toast'))) touched = true; }, true); });
    var queryOff = function (def) { var q = new URLSearchParams(location.search); return Object.keys(def.query || {}).some(function (k) { return def.query[k] === null ? q.has(k) : q.get(k) !== String(def.query[k]); }); };
    /* seed: scenario parameters a prototype reads once and then drops from the address, so they are checked against the address
       the page opened with (qs), not the current one */
    var seedOff = function (def) { return Object.keys(def.seed || {}).some(function (k) { return qs.get(k) !== String(def.seed[k]); }); };
    var startTour = function (id, opts) {
      var def = tourById(id); if (!def) return;
      if (touched || queryOff(def) || seedOff(def)) { reloadInto(def, !(opts && opts.skipIntro)); return; }
      hideTip(); hidePop(); closePanel(true);
      var direct = opts && opts.skipIntro;
      tour = newTour(def, 0, direct ? 'wait' : 'intro'); if (direct) touched = true;
      saveTour(); logEvent(direct ? 'tour-start' : 'tour-open', {tour: id});
      placeHints(); runTour();
    };
    var beginTour = function () {
      if (!tour) return;
      tour.phase = 'wait'; tour.i = 0; tour.since = tour.startedAt = Date.now(); tour.peek = null; touched = true;
      saveTour(); logEvent('tour-start', {tour: tour.def.id}); runTour();
    };
    var endTour = function (how) {
      if (!tour) return;
      if (how) logEvent(how, {tour: tour.def.id, step: tour.i + 1, of: tour.def.steps.length});
      tour = null; saveTour(); drawTour(); schedule();
    };
    /* a fresh prototype for a tour: reload with the tour's own query (身分 and the like) and start it without the intro */
    var reloadInto = function (def, intro) {
      store.set(S, 'pp-tour', JSON.stringify({id: def.id, i: 0, fresh: true, go: !intro}));
      var u = new URL(location.href); u.searchParams.delete('tour'); (def.query ? Object.keys(def.query) : []).forEach(function (k) { if (def.query[k] === null) u.searchParams.delete(k); else u.searchParams.set(k, def.query[k]); });
      Object.keys(def.seed || {}).forEach(function (k) { u.searchParams.set(k, def.seed[k]); });
      location.href = u.href;
    };
    var restartTour = function () { logEvent('tour-restart', {tour: tour.def.id, step: tour.i + 1}); reloadInto(tour.def, false); };
    var nextTourOf = function (def) { var all = DATA.tours.filter(function (t) { return !t.life; }), k = all.indexOf(def); return k >= 0 && all.length > 1 ? all[(k + 1) % all.length] : null; };
    /* opened from the 測試入口頁 (test.html): it leaves pp-entry, its own address and its task list in order, so a finished
       tour offers 回到任務清單 and the next task not yet done after this one, instead of the prototype's next tour */
    var entry = null; try { entry = JSON.parse(store.get(S, 'pp-entry') || 'null'); } catch (e) { entry = null; }
    if (entry && !(entry.back && Array.isArray(entry.list))) entry = null;
    var nextTaskOf = function (def) {
      if (!entry) return null;
      var keys = entry.list.map(function (x) { return x.key; }), k = keys.indexOf(PROTO + ':' + def.id); if (k < 0) return null;
      var done = {}; readJ('pp-events').forEach(function (e) { if (e.type === 'tour-done') done[e.proto + ':' + e.tour] = 1; });
      /* the same rule as test.html's 下一個: after this task, then round from the top; one that fits this screen first */
      var order = entry.list.slice(k + 1).concat(entry.list.slice(0, k + 1)).filter(function (x) { return !done[x.key]; });
      return order.filter(function (x) { return !(x.minW && innerWidth < x.minW); })[0] || order[0] || null;
    };
    /* back to the list: #done=<task> after a finished tour (the list counts 下一個 on from it), #next otherwise */
    var backToList = function (doneKey) { var u = new URL(entry.back); u.hash = doneKey ? 'done=' + encodeURIComponent(doneKey) : 'next'; location.href = u.href; };
    var waitTimer = 0;
    var runTour = function () {
      if (!tour) return;
      var step = tour.def.steps[tour.i];
      if (tour.phase === 'intro' || tour.phase === 'resume' || tour.phase === 'done' || tour.phase === 'stuck') { drawTour(); return; }
      if (tour.phase === 'finish') {
        if (!stepEls(step).length || Date.now() - tour.finishAt > 2500) { advance(); return; }
        clearTimeout(waitTimer); waitTimer = setTimeout(schedule, 200); drawTour(); return;
      }
      var els = stepEls(step);
      if (tour.phase === 'wait') {
        if (els.length && (step.group || usable(els[0]) || step.info)) {
          var settle = step.settle != null ? step.settle : step.info ? 300 : 650;
          tour.phase = 'act'; tour.since = Date.now(); tour.settleUntil = Date.now() + (tour.i ? settle : 0); tour.clicked = false;
          logEvent('tour-step', {tour: tour.def.id, step: tour.i + 1, of: tour.def.steps.length});
          var b = unionRect(els);
          /* off the window, or covered (a sticky dock, the edge of an inner scroll area): bring it into view */
          tourLayer.style.visibility = 'hidden'; var covered = !onTop(boxOf(els[0]), boxOf(els[0]).getBoundingClientRect()); tourLayer.style.visibility = '';
          if (b.top < 0 || b.bottom > innerHeight || covered) boxOf(els[0]).scrollIntoView({block: b.bottom - b.top > innerHeight * 0.7 ? 'start' : 'center'});
          live.textContent = '第 ' + (tour.i + 1) + ' 步，共 ' + tour.def.steps.length + ' 步：' + step.t + '。' + (step.d || '');
          if (!step.group && els[0].focus && !step.info) setTimeout(function () { if (tour && document.contains(els[0])) els[0].focus({preventScroll: true}); }, tour.settleUntil - Date.now() + 10);
          clearTimeout(waitTimer); waitTimer = setTimeout(schedule, Math.max(0, tour.settleUntil - Date.now()) + 20);
        } else if (Date.now() - tour.since > (step.timeout || 6000)) {
          tour.phase = 'stuck'; logEvent('tour-stuck', {tour: tour.def.id, step: tour.i + 1, of: tour.def.steps.length});
        } else { clearTimeout(waitTimer); waitTimer = setTimeout(schedule, 250); }
      } else if (tour.phase === 'act' && (tour.clicked && !step.until || met(step))) {
        advance(); return;
      }
      drawTour();
    };
    var advance = function () {
      if (!tour) return;
      tour.peek = null;
      if (tour.i >= tour.def.steps.length - 1) {
        /* the last action may still be saving (處理中): finish once its target has gone, or after 2.5 s */
        if (tour.phase === 'act' && !tour.def.steps[tour.i].info) { tour.phase = 'finish'; tour.finishAt = Date.now(); schedule(); return; }
        tour.phase = 'done'; tour.i = tour.def.steps.length; logEvent('tour-done', {tour: tour.def.id, ms: Date.now() - tour.startedAt}); store.del(S, 'pp-tour'); drawTour(); return;
      }
      tour.i++; tour.phase = 'wait'; tour.since = Date.now(); saveTour();
      setTimeout(schedule, 60);
    };

    /* ---------- the card ---------- */
    var allSteps = function (def, doneUpTo) {
      return '<ol class="pp-steps pp-all">' + def.steps.map(function (s, k) {
        var done = k < doneUpTo;
        return '<li' + (done ? ' class="pp-done"' : '') + '><span class="pp-mk" aria-hidden="true">' + (done ? '✓' : k + 1) + '</span><span>' + esc(s.t) + '</span></li>';
      }).join('') + '</ol>';
    };
    var stepList = function () {
      var def = tour.def, n = def.steps.length;
      var head = '<button class="pp-toggle" type="button" data-ppt="list" aria-expanded="' + listOpen + '" aria-controls="pp-steps"><span>全部步驟</span><span class="pp-cnt">做完 ' + tour.i + '／' + n + '<span class="pp-chev" aria-hidden="true"></span></span></button>';
      if (!listOpen) return head;
      return head + '<ol class="pp-steps" id="pp-steps">' + def.steps.map(function (s, k) {
        if (k < tour.i) return '<li class="pp-done"><button type="button" data-ppt="peek" data-v="' + k + '" aria-pressed="' + (tour.peek === k) + '"><span class="pp-mk" aria-hidden="true">✓</span><span>' + esc(s.t) + '<span class="pp-sr">，已完成，看這一步的說明</span></span></button></li>';
        if (k === tour.i) return '<li class="pp-now" aria-current="step"><span class="pp-mk" aria-hidden="true">' + (k + 1) + '</span><span>' + esc(s.t) + '</span></li>';
        return '<li><span class="pp-mk" aria-hidden="true">' + (k + 1) + '</span><span>' + esc(s.t) + '</span></li>';
      }).join('') + '</ol>';
    };
    /* a tour can need a wide screen (prototypes that turn read-only on a phone): minWidth on the tour or on the whole flows file */
    var minWidthOf = function (def) { return def.minWidth != null ? def.minWidth : (DATA.minWidth || 0); };
    var narrowFor = function (def) { return innerWidth < minWidthOf(def); };
    var cardHtml = function () {
      var def = tour.def, n = def.steps.length, step = def.steps[Math.min(tour.i, n - 1)];
      if (tour.phase === 'intro') {
        return '<div class="pp-top"><span class="pp-tt">引導' + (def.who ? '・你是' + esc(def.who) : '') + '・共 ' + n + ' 步</span><h2 id="pp-card-h" tabindex="-1">' + esc(def.title) + '</h2></div>' +
          (def.scene ? '<p>' + esc(def.scene) + '</p>' : '') +
          '<h3 class="pp-h3">會一步一步帶你做這些</h3>' + allSteps(def, 0) +
          (narrowFor(def) ? '<p class="pp-note pp-narrow">這個流程要在電腦或橫放的平板上操作（畫面寬度至少 ' + minWidthOf(def) + 'px）；這個畫面在手機上只能查看。可以先看上面的步驟，或換到電腦再開始。</p>' +
            '<div class="pp-acts"><span></span><button class="pp-btn pp-main" type="button" data-ppt="skip">知道了</button></div>'
          : '<p class="pp-note">開始後，畫面上只有這一步要按的地方是亮的，其他地方暫時不能點。隨時可以按「跳過引導」。</p>' +
            '<div class="pp-acts"><button class="pp-link" type="button" data-ppt="skip">先不要</button><button class="pp-btn pp-main" type="button" data-ppt="begin">開始</button></div>');
      }
      if (tour.phase === 'resume') {
        return '<div class="pp-top"><span class="pp-tt">' + esc(def.title) + '</span><h2 id="pp-card-h" tabindex="-1">要從頭開始嗎？</h2></div>' +
          '<p>頁面重新整理過，原型已經回到一開始的樣子；剛才做到第 ' + (tour.i + 1) + ' 步的操作都不見了，所以要從第 1 步重新走。</p>' +
          '<div class="pp-acts"><button class="pp-link" type="button" data-ppt="skip">結束引導</button><button class="pp-btn pp-main" type="button" data-ppt="again">從頭開始</button></div>';
      }
      if (tour.phase === 'done' && LIFE) {
        return '<div class="pp-head"><span class="pp-big" aria-hidden="true">✓</span><div><span class="pp-tt">' + esc(def.title) + '</span><h2 id="pp-card-h" tabindex="-1">這一幕完成了</h2></div></div>' +
          (def.outro ? '<p>' + esc(def.outro) + '</p>' : '') +
          '<h3 class="pp-h3">你剛才做了這些（' + n + ' 步）</h3>' + allSteps(def, n) +
          '<p class="pp-note">按畫面下方的「下一幕」繼續。</p>' +
          '<div class="pp-acts"><button class="pp-btn" type="button" data-ppt="fb">給意見</button><button class="pp-link" type="button" data-ppt="close">關閉</button></div>';
      }
      if (tour.phase === 'done' && entry) {
        var nt = nextTaskOf(def);
        return '<div class="pp-head"><span class="pp-big" aria-hidden="true">✓</span><div><span class="pp-tt">' + esc(def.title) + '</span><h2 id="pp-card-h" tabindex="-1">完成了！</h2></div></div>' +
          (def.outro ? '<p>' + esc(def.outro) + '</p>' : '') +
          '<h3 class="pp-h3">你剛才做了這些（' + n + ' 步）</h3>' + allSteps(def, n) +
          '<p class="pp-note">' + (nt ? '下一個任務：' + esc(nt.title) + '（' + esc(nt.name) + (nt.who && nt.who !== String(def.who || '').replace(/（[^）]*）/g, '') ? '・換你當' + esc(nt.who) : '') + '）。' : '清單上的任務都做完了。回到任務清單，按「匯出回饋」把檔案交給主持人。') + '</p>' +
          '<div class="pp-acts"><button class="pp-btn" type="button" data-ppt="fb">給意見</button><span>' +
          (nt ? '<button class="pp-btn" type="button" data-ppt="back">回到任務清單</button> <button class="pp-btn pp-main" type="button" data-ppt="nexttask">下一個任務</button>' : '<button class="pp-btn pp-main" type="button" data-ppt="back">回到任務清單</button>') + '</span></div>';
      }
      if (tour.phase === 'done') {
        var nx = nextTourOf(def);
        return '<div class="pp-head"><span class="pp-big" aria-hidden="true">✓</span><div><span class="pp-tt">' + esc(def.title) + '</span><h2 id="pp-card-h" tabindex="-1">完成了！</h2></div></div>' +
          (def.outro ? '<p>' + esc(def.outro) + '</p>' : '') +
          '<h3 class="pp-h3">你剛才做了這些（' + n + ' 步）</h3>' + allSteps(def, n) +
          (nx ? '<p class="pp-note">下一個流程：' + esc(nx.title) + '（' + nx.steps.length + ' 步）。原型會先回到一開始的樣子。</p>' : '') +
          '<div class="pp-acts"><button class="pp-btn" type="button" data-ppt="fb">給意見</button><span><button class="pp-link" type="button" data-ppt="close">關閉</button>' + (nx ? ' <button class="pp-btn pp-main" type="button" data-ppt="nexttour">練習下一個流程</button>' : '') + '</span></div>';
      }
      if (tour.phase === 'stuck') {
        return '<div class="pp-head"><span class="pp-big" aria-hidden="true">' + (tour.i + 1) + '</span><div><span class="pp-of">第 ' + (tour.i + 1) + ' 步／共 ' + n + ' 步</span><h2 id="pp-card-h" tabindex="-1">畫面好像沒有照預期變化</h2></div></div>' +
          '<p>可能是剛才的操作改變了畫面。重新開始會把這個原型回到一開始的狀態。</p>' +
          '<div class="pp-acts"><button class="pp-link" type="button" data-ppt="skip">結束引導</button><span><button class="pp-btn" type="button" data-ppt="fb">給意見</button> <button class="pp-btn pp-main" type="button" data-ppt="restart">重新開始</button></span></div>';
      }
      var prep = tour.phase !== 'act' || Date.now() < tour.settleUntil;
      var fillEl = step.fill && document.querySelector(step.fill.into || step.sel);
      var fill = step.fill ? '<div class="pp-fill"><span>' + (fillEl && fillEl.tagName === 'SELECT' ? '選擇：' : '輸入：') + esc(step.fill.label || step.fill.value) + '</span><button class="pp-btn" type="button" data-ppt="fill">幫我填</button></div>' : '';
      var peek = tour.peek != null && def.steps[tour.peek] ? '<div class="pp-peekbox" role="note"><b>回顧第 ' + (tour.peek + 1) + ' 步：' + esc(def.steps[tour.peek].t) + '</b>' + (def.steps[tour.peek].d ? '<p>' + esc(def.steps[tour.peek].d) + '</p>' : '') + '<button class="pp-link" type="button" data-ppt="peek" data-v="' + tour.peek + '">回到這一步</button></div>' : '';
      return '<div class="pp-head"><span class="pp-big" aria-hidden="true">' + (tour.i + 1) + '</span><div><span class="pp-of">' + esc(def.title) + '・第 ' + (tour.i + 1) + ' 步／共 ' + n + ' 步</span><h2 id="pp-card-h" tabindex="-1">' + esc(step.t) + '</h2></div></div>' +
        (step.d ? '<p>' + esc(step.d) + '</p>' : '') + fill +
        '<p class="pp-prep" aria-hidden="true"' + (prep ? '' : ' hidden') + '>準備中…</p>' + peek + stepList() +
        '<div class="pp-acts"><span><button class="pp-link" type="button" data-ppt="skip">跳過引導</button> <button class="pp-link" type="button" data-ppt="restart">重新開始</button></span>' + (step.info ? '<button class="pp-btn pp-main" type="button" data-ppt="next">' + (tour.i === n - 1 ? '完成' : '下一步') + '</button>' : '') + '</div>';
    };

    /* ---------- the overlay: four click-blockers around the hole; the hole's own shadow dims the page, and it glides by transform ---------- */
    var dimEl = null, holeEl = null, coverEl = null, numEl = null, blocks = [], cardEl = null, cardKey = '', cardHtmlNow = '', lastHole = null;
    var mk = function (cls, tag) { var n = document.createElement(tag || 'div'); n.className = cls; tourLayer.appendChild(n); return n; };
    var put = function (n, l, t, w, h) { n.hidden = false; n.style.left = l + 'px'; n.style.top = t + 'px'; n.style.width = Math.max(w, 0) + 'px'; n.style.height = Math.max(h, 0) + 'px'; };
    var drawTour = function () {
      if (!tour) { tourLayer.innerHTML = ''; dimEl = holeEl = coverEl = numEl = cardEl = null; blocks = []; cardKey = cardHtmlNow = ''; lastHole = null; return; }
      if (!dimEl || !tourLayer.contains(dimEl)) {
        tourLayer.innerHTML = ''; cardEl = null;
        dimEl = mk('pp-dim'); holeEl = mk('pp-hole'); holeEl.hidden = true; blocks = [0, 1, 2, 3].map(function () { return mk('pp-block'); }); coverEl = mk('pp-cover'); numEl = mk('pp-num', 'span'); numEl.setAttribute('aria-hidden', 'true');
      }
      var centered = /^(intro|resume|done|stuck)$/.test(tour.phase), step = tour.def.steps[tour.i];
      var els = tour.phase === 'act' ? stepEls(step) : [], hole = null, pad = 6;
      if (els.length) { var r = unionRect(els); hole = lastHole = {l: Math.max(r.left - pad, 0), t: Math.max(r.top - pad, 0), r: Math.min(r.right + pad, innerWidth), b: Math.min(r.bottom + pad, innerHeight), k: tour.i}; }
      else if (!centered && lastHole) hole = lastHole;   /* between steps the hole stays where it was, breathing, until the next target shows */
      var prep = !centered && (tour.phase !== 'act' || Date.now() < tour.settleUntil);
      if (hole) {
        var w = hole.r - hole.l, h = hole.b - hole.t, appearing = holeEl.hidden, same = holeEl.dataset.k === String(hole.k);
        dimEl.hidden = true; holeEl.hidden = false;
        if (appearing || same) holeEl.style.transition = 'none';   /* glide only when the tour moves to another step, never while scrolling */
        holeEl.style.width = w + 'px'; holeEl.style.height = h + 'px'; holeEl.style.transform = 'translate(' + hole.l + 'px,' + hole.t + 'px)';
        if (appearing || same) { void holeEl.offsetWidth; holeEl.style.transition = ''; }
        holeEl.dataset.k = hole.k; holeEl.classList.toggle('pp-settling', prep);
        put(blocks[0], 0, 0, innerWidth, hole.t); put(blocks[1], 0, hole.b, innerWidth, innerHeight - hole.b);
        put(blocks[2], 0, hole.t, hole.l, h); put(blocks[3], hole.r, hole.t, innerWidth - hole.r, h);
        if (prep) put(coverEl, hole.l, hole.t, w, h); else coverEl.hidden = true;
        numEl.hidden = false; numEl.textContent = hole.k + 1; numEl.style.left = Math.max(hole.l, 18) + 'px'; numEl.style.top = Math.max(hole.t, 18) + 'px';
      } else {
        dimEl.hidden = false; holeEl.hidden = true; coverEl.hidden = true; numEl.hidden = true; blocks.forEach(function (b) { b.hidden = true; });
      }
      var key = tour.def.id + ':' + (centered ? tour.phase : 'step:' + tour.i);
      var html = cardHtml(), fresh = false;
      if (!cardEl || key !== cardKey) {
        var had = cardEl && cardEl.contains(document.activeElement);
        if (cardEl) cardEl.remove();
        cardEl = mk('pp-card' + (centered ? ' pp-wide' : ''), 'section'); cardEl.setAttribute('role', 'region'); cardEl.setAttribute('aria-label', '引導');
        cardEl.innerHTML = html; cardKey = key; cardHtmlNow = html; fresh = true;
        if (centered || had) cardEl.querySelector('#pp-card-h').focus();
      } else if (html !== cardHtmlNow) {
        var a = document.activeElement, k = a && cardEl.contains(a) && a.dataset ? a.dataset.ppt + (a.dataset.v || '') : '';
        var sc = cardEl.querySelector('.pp-steps'), top = sc ? sc.scrollTop : 0;
        cardEl.innerHTML = html; cardHtmlNow = html;
        if (sc && cardEl.querySelector('.pp-steps')) cardEl.querySelector('.pp-steps').scrollTop = top;
        if (k) { var again = [].slice.call(cardEl.querySelectorAll('[data-ppt]')).filter(function (n) { return n.dataset.ppt + (n.dataset.v || '') === k; })[0]; if (again) again.focus(); else cardEl.querySelector('#pp-card-h').focus(); }
      }
      if (fresh) { var now = cardEl.querySelector('.pp-steps .pp-now'); if (now) now.scrollIntoView({block: 'nearest'}); }
      var cw = cardEl.offsetWidth, ch = cardEl.offsetHeight, gap = 14;
      var clampX = function (x) { return Math.min(Math.max(x, 12), innerWidth - cw - 12); }, clampY = function (y) { return Math.min(Math.max(y, 12), innerHeight - ch - 12); };
      var spot;
      if (!hole) spot = {x: clampX((innerWidth - cw) / 2), y: clampY((innerHeight - ch) / 2)};
      else if (innerWidth <= 480) spot = {x: 8, y: (hole.t + hole.b) / 2 > innerHeight / 2 ? 8 : innerHeight - ch - 8};   /* phone: the edge away from the target */
      else {
        var cands = [{x: clampX(hole.l), y: hole.b + gap}, {x: clampX(hole.l), y: hole.t - gap - ch}, {x: hole.r + gap, y: clampY(hole.t)}, {x: hole.l - gap - cw, y: clampY(hole.t)}]
          .map(function (c) { return {x: clampX(c.x), y: clampY(c.y)}; })
          .map(function (c) { var ox = Math.max(0, Math.min(c.x + cw, hole.r) - Math.max(c.x, hole.l)), oy = Math.max(0, Math.min(c.y + ch, hole.b) - Math.max(c.y, hole.t)); c.over = ox * oy; return c; });
        spot = cands.filter(function (c) { return !c.over; })[0] || cands.sort(function (a, b) { return a.over - b.over; })[0];
      }
      cardEl.style.left = spot.x + 'px'; cardEl.style.top = spot.y + 'px';
      return fresh;
    };
    var setValue = function (el, v) {
      var proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
      el.dispatchEvent(new Event('input', {bubbles: true})); el.dispatchEvent(new Event('change', {bubbles: true}));
    };
    /* the tour card is not part of the prototype: 幫我填 keeps the focus in the field, and no click on the card reaches the
       prototype's own listeners (some close an inline editor on a click outside it) */
    tourLayer.addEventListener('mousedown', function (e) { if (e.target.closest && e.target.closest('[data-ppt="fill"]')) e.preventDefault(); });
    tourLayer.addEventListener('click', function (e) {
      e.stopPropagation();
      var b = e.target.closest('[data-ppt]'); if (!b || !tour) return;
      var a = b.dataset.ppt;
      if (a === 'skip') endTour('tour-skip');
      else if (a === 'begin') beginTour();
      else if (a === 'again') { logEvent('tour-restart', {tour: tour.def.id, step: tour.i + 1, after: 'reload'}); startTour(tour.def.id, {skipIntro: true}); }
      else if (a === 'restart') restartTour();
      else if (a === 'next') { if (tour.phase === 'act') { logEvent('tour-step-done', {tour: tour.def.id, step: tour.i + 1}); advance(); } }
      else if (a === 'fill') { var st = tour.def.steps[tour.i], f = document.querySelector(st.fill.into || st.sel); if (f) { setValue(f, st.fill.value); f.focus(); } logEvent('tour-fill', {tour: tour.def.id, step: tour.i + 1}); schedule(); }
      else if (a === 'list') { listOpen = !listOpen; store.set(S, 'pp-steplist', listOpen ? '1' : '0'); drawTour(); if (listOpen) { var now = cardEl && cardEl.querySelector('.pp-steps .pp-now'); if (now) now.scrollIntoView({block: 'nearest'}); } }
      else if (a === 'peek') { var v = +b.dataset.v; tour.peek = tour.peek === v ? null : v; if (tour.peek != null) logEvent('tour-peek', {tour: tour.def.id, step: v + 1, at: tour.i + 1}); drawTour(); }
      else if (a === 'close') endTour(null);
      else if (a === 'back') { logEvent('entry-back', {tour: tour.def.id}); backToList(tour.phase === 'done' ? PROTO + ':' + tour.def.id : ''); }
      else if (a === 'nexttask') { var nt = nextTaskOf(tour.def); if (nt) { logEvent('tour-next', {tour: tour.def.id, next: nt.key}); location.href = nt.href; } }
      else if (a === 'nexttour') { var nx = nextTourOf(tour.def); logEvent('tour-next', {tour: tour.def.id, next: nx.id}); reloadInto(nx, true); }
      else if (a === 'fb') { var id = tour.def.id; endTour(tour.phase === 'done' ? null : 'tour-skip'); openPanel('fb', id); }
    });
    /* the step's own target counts as done when it is clicked (capture: before the prototype re-renders it away) */
    document.addEventListener('click', function (e) {
      if (!tour || tour.phase !== 'act' || picking) return;
      if (e.target.closest && e.target.closest('#pp-tour, #pp-layer, #pp-panel, #pp-tab')) return;
      var step = tour.def.steps[tour.i];
      if (Date.now() < tour.settleUntil) { e.preventDefault(); e.stopPropagation(); return; }
      if (stepEls(step).some(function (el) { var b = boxOf(el); return b === e.target || b.contains(e.target) || el.contains(e.target); })) { tour.clicked = true; setTimeout(schedule, 30); }
    }, true);
    /* keyboard: Tab stays within the step's target and the card; Esc on the card skips */
    document.addEventListener('keydown', function (e) {
      if (!tour || panel) return;
      var card = tourLayer.querySelector('.pp-card');
      if (e.key === 'Escape' && card && card.contains(document.activeElement)) { e.preventDefault(); endTour(tour.phase === 'done' ? null : 'tour-skip'); return; }
      if (e.key !== 'Tab') return;
      var pool = [];
      if (tour.phase === 'act') stepEls(tour.def.steps[tour.i]).forEach(function (el) { var b = boxOf(el); if (b.matches('a[href], button, input, select, textarea, [tabindex]')) pool.push(b.matches('label') ? el : b); pool = pool.concat([].slice.call(b.querySelectorAll('a[href], button, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'))); });
      if (card) pool = pool.concat([].slice.call(card.querySelectorAll('button')));
      pool = pool.filter(function (n, i) { return pool.indexOf(n) === i && n.getAttribute('tabindex') !== '-1' && shown(n); });
      if (!pool.length) return;
      var idx = pool.indexOf(document.activeElement);
      e.preventDefault(); e.stopPropagation();
      pool[(idx + (e.shiftKey ? -1 : 1) + pool.length) % pool.length].focus();
    }, true);

    /* ============ scheduling ============ */
    var raf = 0;
    var schedule = function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; placeHints(); if (tipFor) showTip(tipFor.el, tipFor.h); if (tour) runTour(); }); };
    new MutationObserver(function (ms) { if (ms.some(function (m) { var t = m.target; return !layer.contains(t) && !tourLayer.contains(t) && t !== live && !live.contains(t) && !(panel && panel.contains(t)); })) schedule(); })
      .observe(document.body, {childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['aria-disabled', 'disabled', 'class', 'hidden']});
    addEventListener('scroll', schedule, true); addEventListener('resize', schedule);
    ['input', 'change'].forEach(function (t) { document.addEventListener(t, function () { if (tour) schedule(); }, true); });

    /* ============ the 測試 tab and panel ============ */
    var tab = document.createElement('button'); tab.type = 'button'; tab.id = 'pp-tab'; tab.setAttribute('aria-haspopup', 'dialog');
    var paintTab = function () { var n = readJ('pp-feedback').length; tab.innerHTML = '測試' + (n ? '<span class="pp-n" aria-hidden="true">' + n + '</span>' : ''); tab.setAttribute('aria-label', '測試工具' + (n ? '，已記下 ' + n + ' 則意見' : '')); };
    paintTab(); document.body.appendChild(tab);
    tab.addEventListener('click', function () { openPanel('menu'); });

    var KINDS = [['stuck', '卡住了'], ['confused', '看不懂'], ['good', '這樣很好'], ['wish', '我想要…']];
    var draft = {kind: '', text: '', pick: null, err: '', tour: ''};
    var closePanel = function (quiet) { if (panel) { panel.remove(); panel = null; if (!quiet && lastFocus && document.contains(lastFocus)) lastFocus.focus(); } };
    var openPanel = function (view, fromTour) {
      if (!panel) lastFocus = document.activeElement;
      if (panel) panel.remove();
      if (fromTour) draft.tour = fromTour;
      panel = document.createElement('div'); panel.id = 'pp-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'pp-h');
      var nf = readJ('pp-feedback').length, ne = readJ('pp-events').length, ctx = DATA.name + (roleOf() ? '・身分 ' + roleOf() : '') + '・這個畫面的網址與時間';
      if (view === 'menu') {
        var mine = DATA.tours.filter(function (t) { return !t.life; });
        var tours = mine.length ? '<h3>這頁可以練習的流程</h3><ul class="pp-list">' + mine.map(function (t) { return '<li><button class="pp-btn" type="button" data-pp="tour" data-id="' + esc(t.id) + '"><span>' + esc(t.title) + '<br><small>' + t.steps.length + ' 步' + (t.who ? '・' + esc(t.who) : '') + '</small></span><span aria-hidden="true">›</span></button></li>'; }).join('') + '</ul>' : '';
        panel.innerHTML = '<button class="pp-x" type="button" data-pp="close" aria-label="關閉">×</button><h2 id="pp-h" tabindex="-1">測試工具</h2><p class="pp-sub">' + esc(DATA.name) + '</p>' +
          '<ul class="pp-list"><li><button class="pp-btn pp-main" type="button" data-pp="fb">給意見<span aria-hidden="true">›</span></button></li></ul>' + tours +
          '<h3>設定</h3><ul class="pp-list"><li><button class="pp-btn" type="button" data-pp="hints" aria-pressed="' + hintsOn + '">流程提示點<span>' + (hintsOn ? '開' : '關') + '</span></button></li>' +
          '<li><button class="pp-btn" type="button" data-pp="export"' + (nf + ne ? '' : ' aria-disabled="true"') + '>匯出回饋<span>' + nf + ' 則意見' + (ne ? '・' + ne + ' 筆紀錄' : '') + '</span></button></li></ul>' +
          '<div class="pp-foot">' + (entry ? '<button class="pp-btn" type="button" data-pp="back">回到任務清單</button>' : '') + '<button class="pp-btn" type="button" data-pp="end">結束測試</button></div>';
      } else {
        panel.innerHTML = '<button class="pp-x" type="button" data-pp="close" aria-label="關閉">×</button><h2 id="pp-h" tabindex="-1">給意見</h2><p class="pp-sub">想到什麼都可以寫，一句話就好。</p>' +
          '<div class="pp-row" role="group" aria-label="意見類型">' + KINDS.map(function (k) { return '<button class="pp-btn" type="button" data-pp="kind" data-k="' + k[0] + '" aria-pressed="' + (draft.kind === k[0]) + '">' + k[1] + '</button>'; }).join('') + '</div>' +
          '<label for="pp-text">想說的話</label><textarea id="pp-text" placeholder="例：我找不到在哪裡收款"' + (draft.err ? ' aria-invalid="true" aria-describedby="pp-err"' : '') + '>' + esc(draft.text) + '</textarea>' +
          (draft.err ? '<span class="pp-err" id="pp-err">' + esc(draft.err) + '</span>' : '') +
          '<div class="pp-row" style="margin-top:10px"><button class="pp-btn" type="button" data-pp="pick">' + (draft.pick ? '已指出：' + esc(draft.pick.label || draft.pick.key || '畫面上的位置') + '（重選）' : '指出畫面上的位置（選填）') + '</button></div>' +
          '<p class="pp-ctx">會一起記下：' + esc(ctx) + (draft.tour ? '・引導「' + esc((tourById(draft.tour) || {}).title || draft.tour) + '」' : '') + '。不會記下你的姓名或電話。</p>' +
          '<div class="pp-foot"><button class="pp-btn" type="button" data-pp="menu">返回</button><button class="pp-btn pp-main" type="button" data-pp="save">送出意見</button></div>';
      }
      document.body.appendChild(panel);
      var focusTarget = view === 'fb' && draft.err ? panel.querySelector('#pp-text') : panel.querySelector('#pp-h');
      if (focusTarget) focusTarget.focus();
    };
    var toast = function (msg) { var old = document.getElementById('pp-toast'); if (old) old.remove(); var t = document.createElement('div'); t.id = 'pp-toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600); };
    var exportFb = function () {
      var items = readJ('pp-feedback'), events = readJ('pp-events'); if (!items.length && !events.length) return;
      var tester = store.get(L, 'pp-tester') || '';
      var blob = new Blob([JSON.stringify({kind: 'pet-prototype-feedback', version: 2, exportedAt: new Date().toISOString(), tester: tester, items: items, events: events}, null, 2)], {type: 'application/json'});
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = '原型回饋-' + (tester || '受測者') + '-' + new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '') + '.json';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      toast('已匯出 ' + items.length + ' 則意見' + (events.length ? '、' + events.length + ' 筆紀錄' : ''));
    };
    var startPick = function () {
      closePanel(true); picking = true; hideTip(); placeHints(); root.classList.add('pp-picking');
      var bar = document.createElement('div'); bar.id = 'pp-pickbar'; bar.setAttribute('role', 'status'); bar.textContent = '點一下你想說的地方・按 Esc 取消'; document.body.appendChild(bar);
      var finish = function (pick) { picking = false; root.classList.remove('pp-picking'); bar.remove(); document.removeEventListener('click', onPick, true); document.removeEventListener('keydown', onKey, true); if (pick) draft.pick = pick; placeHints(); openPanel('fb'); };
      var onPick = function (e) {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        var el = e.target.closest('[data-key]') || e.target;
        finish({key: el.dataset ? el.dataset.key || '' : '', label: labelOf(el).slice(0, 40), x: Math.round(e.clientX), y: Math.round(e.clientY), vw: innerWidth, vh: innerHeight});
      };
      var onKey = function (e) { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(null); } };
      setTimeout(function () { document.addEventListener('click', onPick, true); document.addEventListener('keydown', onKey, true); }, 0);
    };
    document.addEventListener('click', function (e) {
      if (!panel || !panel.contains(e.target)) return;
      var b = e.target.closest('[data-pp]'); if (!b) return;
      var a = b.dataset.pp;
      if (a === 'close') closePanel();
      else if (a === 'menu') openPanel('menu');
      else if (a === 'fb') openPanel('fb');
      else if (a === 'tour') startTour(b.dataset.id);
      else if (a === 'kind') { draft.text = panel.querySelector('#pp-text').value; draft.kind = draft.kind === b.dataset.k ? '' : b.dataset.k; openPanel('fb'); }
      else if (a === 'pick') { draft.text = panel.querySelector('#pp-text').value; startPick(); }
      else if (a === 'hints') { hintsOn = !hintsOn; store.set(S, 'pp-hints', hintsOn ? '1' : '0'); hideTip(); placeHints(); openPanel('menu'); toast(hintsOn ? '流程提示點已打開' : '流程提示點已關閉'); }
      else if (a === 'export') { if (b.getAttribute('aria-disabled') !== 'true') exportFb(); }
      else if (a === 'back') { if (tour && tour.phase !== 'done') logEvent('tour-skip', {tour: tour.def.id, step: tour.i + 1, of: tour.def.steps.length}); store.del(S, 'pp-tour'); logEvent('entry-back', {tour: tour ? tour.def.id : ''}); backToList(tour && tour.phase === 'done' ? PROTO + ':' + tour.def.id : ''); }
      else if (a === 'end') { ['pp-test', 'pp-task', 'pp-hints', 'pp-tour', 'pp-entry'].forEach(function (k) { store.del(S, k); }); var u = new URL(location.href); ['test', 'task', 'tour'].forEach(function (k) { u.searchParams.delete(k); }); location.href = u.href; }
      else if (a === 'save') {
        var text = panel.querySelector('#pp-text').value.trim(); draft.text = text;
        if (!text && !draft.kind) { draft.err = '選一個類型或寫一句話'; openPanel('fb'); return; }
        var items = readJ('pp-feedback');
        items.push({id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), at: new Date().toISOString(), proto: PROTO, url: location.pathname.split('/').slice(-2).join('/') + location.search + location.hash,
          role: roleOf(), task: store.get(S, 'pp-task') || '', tour: draft.tour || (tour ? tour.def.id : ''), step: tour ? tour.i + 1 : null, kind: draft.kind, text: text, pick: draft.pick, viewport: innerWidth + '×' + innerHeight, ua: navigator.userAgent});
        writeJ('pp-feedback', items); draft = {kind: '', text: '', pick: null, err: '', tour: ''};
        closePanel(); paintTab(); toast('已記下，謝謝！');
      }
    }, true);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pop && !panel) { e.preventDefault(); hidePop(true); return; }
      if (e.key === 'Escape' && tip && !panel && !tour) { hideTip(); return; }
      if (!panel) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closePanel(); return; }
      if (e.key === 'Tab') {
        var f = [].slice.call(panel.querySelectorAll('button, textarea')).filter(function (n) { return !n.disabled; });
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    }, true);
    addEventListener('storage', function (e) { if (e.key === 'pp-feedback') paintTab(); });
    /* the life page's 給意見 opens this frame's panel, so the pick (指出畫面上的位置) lands on this screen */
    if (LIFE) addEventListener('message', function (e) {
      if (e.origin !== location.origin || e.source !== window.parent || !e.data || e.data.pp !== 'life-fb') return;
      var id = tour ? tour.def.id : ''; if (tour && tour.phase !== 'done') endTour('tour-skip'); else if (tour) endTour(null);
      openPanel('fb', id);
    });

    /* for the kit's own tests: read the tour state, start a tour */
    window.PP.state = function () { return tour ? {id: tour.def.id, i: tour.i, phase: tour.phase, settled: tour.phase === 'act' && Date.now() >= tour.settleUntil} : null; };
    window.PP.start = startTour;
    window.PP.data = function () { return DATA; };

    /* resume or start a tour (from ?tour= or after 重新開始), then let the prototype re-measure without the strip */
    var saved = null; try { saved = JSON.parse(store.get(S, 'pp-tour') || 'null'); } catch (e) { saved = null; }
    if (qs.get('tour')) { var u = new URL(location.href); u.searchParams.delete('tour'); window.history.replaceState(window.history.state, '', u.href); }
    setTimeout(function () {
      dispatchEvent(new Event('resize'));
      if (saved && tourById(saved.id)) {
        if (saved.fresh) startTour(saved.id, {skipIntro: saved.go});
        else { tour = newTour(tourById(saved.id), saved.i, 'resume'); logEvent('tour-reload', {tour: saved.id, step: saved.i + 1}); runTour(); }
      }
      schedule();
    }, 0);
  }
})();
