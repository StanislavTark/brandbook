/* Сайт брендбука: читает content/*.md и data/*.json и собирает страницы. */
(function () {
  'use strict';
  var B = window.BB, C = B.CONFIG;
  var state = { site: null, tokens: null, docs: {}, examples: null, icons: null, colors: {}, exGroup: 'all', iconQuery: '' };
  var bust = '?v=' + Date.now();
  var main = document.getElementById('main');

  function get(path, type) {
    return fetch(path + bust, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(path + ': ' + r.status);
      return type === 'json' ? r.json() : r.text();
    });
  }

  document.getElementById('edit-link').innerHTML = B.icon('pencil', 18) + '<span>Редактировать</span>';
  var menuBtn = document.getElementById('menu-btn'), side = document.getElementById('side');
  menuBtn.addEventListener('click', function () {
    var open = side.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  function renderNav(route) {
    var items = [{ href: '#/', t: 'Главная', ic: 'home', on: route === '' }]
      .concat(C.sections.map(function (s) { return { href: '#/' + s.id, t: s.title, ic: s.icon, on: route === s.id }; }))
      .concat([{ sep: true }, { href: '#/examples', t: 'Примеры виджетов', ic: 'dash', on: route === 'examples' }]);
    document.getElementById('nav').innerHTML = items.map(function (i) {
      if (i.sep) return '<div class="sep"></div>';
      return '<a href="' + i.href + '"' + (i.on ? ' class="on" aria-current="page"' : '') + '>' + B.icon(i.ic, 20) + '<span>' + B.esc(i.t) + '</span></a>';
    }).join('');
  }

  function wrap(html) { main.innerHTML = '<div class="wrap">' + html + '</div>'; main.scrollTop = 0; window.scrollTo(0, 0); }

  function home() {
    var s = state.site;
    var cards = C.sections.map(function (x) {
      return '<a class="card" href="#/' + x.id + '">' + B.icon(x.icon, 24) + '<b>' + B.esc(x.title) + '</b><span>' + B.esc(x.desc) + '</span><em>Открыть →</em></a>';
    }).join('') + '<a class="card" href="#/examples">' + B.icon('dash', 24) + '<b>Примеры виджетов</b><span>Живые образцы всех виджетов и пример дашборда</span><em>Открыть →</em></a>';
    wrap('<section class="hero doc"><div class="kicker">Брендбук · Insight BI</div><h1>' + B.esc(s.title) + '</h1><p>' + B.esc(s.intro) + '</p></section>' +
      '<div class="cards">' + cards + '</div><div class="doc">' + B.md(state.docs['README.md'], state.colors) + '</div>');
  }

  function palette() {
    var list = (state.tokens.color && state.tokens.color.tokens) || [];
    return '<div class="palette">' + list.map(function (t) {
      var hex = state.colors[t.name] || t.value;
      var ref = /^\{/.test(t.value) ? ' = ' + t.value.slice(1, -1) : '';
      return '<button type="button" class="swatch" data-hex="' + B.esc(hex) + '" aria-label="Скопировать ' + B.esc(t.name + ' ' + hex) + '">' +
        '<span class="chip" style="background:' + B.esc(hex) + '"></span><span class="txt"><span class="row"><b>' + B.esc(t.name) + '</b><span>' + B.esc(String(hex).toUpperCase()) + '</span></span>' +
        '<small>' + B.esc(ref ? 'Ссылка' + ref : 'Нажмите, чтобы скопировать') + '</small><small class="state"></small></span></button>';
    }).join('') + '</div>';
  }

  function iconsGrid() {
    var q = state.iconQuery.trim().toLowerCase();
    var list = (state.icons || []).filter(function (n) { return !q || n.indexOf(q) >= 0; });
    if (!list.length) return '<p class="loading">Ничего не найдено.</p>';
    return list.map(function (n) {
      return '<button type="button" class="icon-cell" data-icon="' + B.esc(n) + '" aria-label="Скопировать имя ' + B.esc(n) + '"><img src="icons/' + encodeURIComponent(n) + '.svg" alt=""><span>' + B.esc(n) + '</span></button>';
    }).join('');
  }

  function section(sec) {
    var src = state.docs[sec.file] || '';
    var extra = '';
    var body = B.md(src, state.colors);
    if (sec.id === 'colors') {
      extra = '<h2 id="palette">Палитра</h2><p>Все цвета токенов. Нажмите на цвет, чтобы скопировать HEX.</p>' + palette();
    }
    if (sec.id === 'icons') {
      extra = '<h2 id="nabor">Набор иконок</h2><p>Нажмите на иконку, чтобы скопировать её имя для поля <code>icon</code>.</p>' +
        '<label class="search">' + B.icon('magnify', 18) + '<span class="sr">Поиск иконки</span><input type="search" id="icon-q" placeholder="Поиск: check, arrow, download…" value="' + B.esc(state.iconQuery) + '"></label>' +
        '<div class="icons" id="icons">' + iconsGrid() + '</div>';
    }
    // палитру и набор иконок показываем сразу после вступления раздела
    var cut = body.indexOf('<h2');
    var html = cut > 0 ? body.slice(0, cut) + extra + body.slice(cut) : body + extra;
    wrap('<article class="doc">' + html + '</article>');
    var q = document.getElementById('icon-q');
    if (q) q.addEventListener('input', function () { state.iconQuery = q.value; document.getElementById('icons').innerHTML = iconsGrid(); });
  }

  function examples() {
    var groups = [], seen = {};
    state.examples.forEach(function (e) { if (!seen[e.group]) { seen[e.group] = true; groups.push(e.group); } });
    var filter = '<div class="ex-filter" role="group" aria-label="Группа">' +
      ['all'].concat(groups).map(function (g) {
        var on = state.exGroup === g;
        return '<button type="button" class="chipbtn' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-group="' + B.esc(g) + '">' + B.esc(g === 'all' ? 'Все' : g) + '</button>';
      }).join('') + '</div>';
    var shown = groups.filter(function (g) { return state.exGroup === 'all' || state.exGroup === g; });
    var html = shown.map(function (g) {
      return '<section class="ex-group"><h2>' + B.esc(g) + '</h2>' + state.examples.filter(function (e) { return e.group === g; }).map(function (e) {
        var w = e.width ? e.width + 'px' : '100%';
        return '<div class="ex"><h3>' + B.esc(e.name) + '</h3>' + (e.readme ? '<div class="about">' + B.md(e.readme, state.colors) + '</div>' : '') +
          '<div class="frame"><iframe title="' + B.esc(e.name) + '" loading="lazy" src="examples/' + encodeURIComponent(e.name) + '.html" style="height:' + (e.height + 4) + 'px;min-width:' + w + '"></iframe></div></div>';
      }).join('') + '</section>';
    }).join('');
    wrap('<div class="doc"><div class="kicker">Наглядно</div><h1>Примеры виджетов</h1><p>Живые образцы: так выглядят виджеты по правилам брендбука. Цвета берутся из раздела «Цвета».</p></div>' + filter + html);
    main.querySelectorAll('iframe').forEach(function (f) {
      f.addEventListener('load', function () { try { B.applyVars(f.contentDocument, state.tokens); } catch (e) {} });
    });
  }

  function route() {
    var r = (location.hash || '#/').replace(/^#\/?/, '').split('/')[0];
    side.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false');
    renderNav(r);
    var sec = C.sections.filter(function (s) { return s.id === r; })[0];
    if (sec) { document.title = sec.title + ' — ' + state.site.title; section(sec); }
    else if (r === 'examples') { document.title = 'Примеры — ' + state.site.title; examples(); }
    else { document.title = state.site.title; home(); }
  }

  main.addEventListener('click', function (e) {
    var sw = e.target.closest('.swatch');
    if (sw) {
      B.copyText(sw.getAttribute('data-hex'));
      var st = sw.querySelector('.state'); sw.classList.add('ok'); st.textContent = 'Скопировано';
      setTimeout(function () { sw.classList.remove('ok'); st.textContent = ''; }, 1400);
      return;
    }
    var ic = e.target.closest('.icon-cell');
    if (ic) { B.copyText(ic.getAttribute('data-icon')); ic.classList.add('ok'); setTimeout(function () { ic.classList.remove('ok'); }, 1200); return; }
    var g = e.target.closest('[data-group]');
    if (g) { state.exGroup = g.getAttribute('data-group'); examples(); }
  });
  B.bindCopy(main);
  window.addEventListener('hashchange', route);

  function lastUpdate() {
    fetch('https://api.github.com/repos/' + C.owner + '/' + C.repo + '/commits?per_page=1&sha=' + C.branch)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (list) { if (list && list[0]) document.getElementById('updated').textContent = 'Обновлено ' + B.fmtDate(list[0].commit.committer.date); })
      .catch(function () {});
  }

  Promise.all([
    get('data/site.json', 'json'), get('data/tokens.json', 'json'), get('examples/index.json', 'json'), get('icons/index.json', 'json')
  ].concat(['README.md'].concat(C.sections.map(function (s) { return s.file; })).map(function (f) {
    return get('content/' + f).then(function (t) { state.docs[f] = t; });
  }))).then(function (r) {
    state.site = r[0]; state.tokens = r[1]; state.examples = r[2]; state.icons = r[3];
    state.colors = B.colorMap(state.tokens);
    var st = document.createElement('style'); st.textContent = B.cssVars(state.tokens); document.head.appendChild(st);
    document.getElementById('site-title').textContent = state.site.title;
    document.getElementById('site-sub').textContent = state.site.subtitle || '';
    route(); lastUpdate();
  }).catch(function (err) {
    main.innerHTML = '<div class="wrap"><p class="error">Не удалось загрузить брендбук: ' + B.esc(err.message) + '</p></div>';
  });
})();
