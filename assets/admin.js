/* Редактор брендбука: правит файлы репозитория через GitHub API и сохраняет их одним коммитом. */
(function () {
  'use strict';
  var B = window.BB, C = B.CONFIG;
  var API = 'https://api.github.com';
  var REPO = '/repos/' + C.owner + '/' + C.repo;
  var KEY = 'bb-token';
  var app = document.getElementById('app');

  var S = {
    token: null, login: '', headSha: null,
    base: {},          // путь -> текст, как в репозитории
    site: null, tokens: null, docs: {},  // черновики
    tab: 'colors', doc: 'README.md', filter: '',
    prevName: 'DashboardExample', examples: [],
    saving: false, msg: null, history: null, confirmRevert: null
  };

  // ---------- токен ----------
  function loadToken() {
    try { return sessionStorage.getItem(KEY) || localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function storeToken(t, remember) {
    try { sessionStorage.setItem(KEY, t); if (remember) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); } catch (e) {}
  }
  function clearToken() { try { sessionStorage.removeItem(KEY); localStorage.removeItem(KEY); } catch (e) {} }

  // ---------- GitHub API ----------
  function gh(path, opts) {
    opts = opts || {};
    return fetch(API + path, {
      method: opts.method || 'GET',
      cache: 'no-store',
      headers: { 'Authorization': 'Bearer ' + S.token, 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' },
      body: opts.body ? JSON.stringify(opts.body) : undefined
    }).then(function (r) {
      return r.text().then(function (t) {
        var data = null; try { data = t ? JSON.parse(t) : null; } catch (e) {}
        if (!r.ok) {
          var m = (data && data.message) || ('HTTP ' + r.status);
          var err = new Error(m); err.status = r.status; throw err;
        }
        return data;
      });
    });
  }
  function b64decode(b64) {
    var bin = atob(String(b64).replace(/\s/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }
  function headSha() { return gh(REPO + '/git/ref/heads/' + C.branch).then(function (r) { return r.object.sha; }); }

  function loadAll() {
    return headSha().then(function (sha) {
      S.headSha = sha;
      return Promise.all(C.editable.map(function (p) {
        return gh(REPO + '/contents/' + p + '?ref=' + sha).then(function (r) { S.base[p] = b64decode(r.content); });
      }));
    }).then(function () {
      S.site = JSON.parse(S.base['data/site.json']);
      S.tokens = JSON.parse(S.base['data/tokens.json']);
      S.docs = {};
      C.editable.forEach(function (p) { if (p.indexOf('content/') === 0) S.docs[p.slice(8)] = S.base[p]; });
    });
  }

  // ---------- черновик → файлы ----------
  function json(o) { return JSON.stringify(o, null, 1) + '\n'; }
  function sameJson(a, b) { try { return JSON.stringify(JSON.parse(a)) === JSON.stringify(JSON.parse(b)); } catch (e) { return a === b; } }

  function colorChanges() {
    var baseTok = JSON.parse(S.base['data/tokens.json']);
    var old = {}; (baseTok.color.tokens || []).forEach(function (t) { old[t.name] = t.value; });
    var out = [];
    (S.tokens.color.tokens || []).forEach(function (t) {
      if (old[t.name] !== undefined && old[t.name] !== t.value) out.push({ name: t.name, from: old[t.name], to: t.value });
    });
    return out;
  }

  // HEX, который был только у одного токена, заменяем и в текстах разделов, CSS примеров и тенях/рамках
  function replacements() {
    var baseTok = JSON.parse(S.base['data/tokens.json']);
    var count = {};
    (baseTok.color.tokens || []).forEach(function (t) { if (B.HEX.test(t.value)) { var k = t.value.toLowerCase(); count[k] = (count[k] || 0) + 1; } });
    return colorChanges().filter(function (c) {
      return B.HEX.test(c.from) && B.HEX.test(c.to) && count[c.from.toLowerCase()] === 1;
    });
  }
  function swapHex(text, reps) {
    reps.forEach(function (r) {
      var re = new RegExp(r.from.replace('#', '#'), 'gi');
      text = text.replace(re, function (m) { return m === m.toUpperCase() ? r.to.toUpperCase() : r.to.toLowerCase(); });
    });
    return text;
  }

  function buildFiles() {
    var reps = replacements(), files = {};
    files['data/site.json'] = json(S.site);
    // в tokens.json меняем только значения других групп (тени, рамки), цвета — как в черновике
    var tok = JSON.parse(JSON.stringify(S.tokens));
    ['shadow', 'border'].forEach(function (g) {
      ((tok[g] && tok[g].tokens) || []).forEach(function (t) { t.value = swapHex(String(t.value), reps); });
    });
    files['data/tokens.json'] = json(tok);
    files['examples/bundle.css'] = swapHex(S.base['examples/bundle.css'], reps);
    Object.keys(S.docs).forEach(function (f) { files['content/' + f] = swapHex(S.docs[f], reps); });
    return files;
  }

  function changedFiles() {
    var files = buildFiles(), out = {};
    Object.keys(files).forEach(function (p) {
      var same = /\.json$/.test(p) ? sameJson(files[p], S.base[p]) : files[p] === S.base[p];
      if (!same) out[p] = files[p];
    });
    return out;
  }

  function summary(files) {
    var parts = [];
    var cc = colorChanges();
    if (cc.length) parts.push('цвета: ' + cc.map(function (c) { return c.name; }).join(', '));
    else if (files['data/tokens.json']) parts.push('описания цветов');
    if (files['data/site.json']) parts.push('тексты сайта');
    var docs = Object.keys(files).filter(function (p) { return p.indexOf('content/') === 0; }).map(function (p) { return docTitle(p.slice(8)); });
    if (docs.length && !cc.length) parts.push('разделы: ' + docs.join(', '));
    return 'Правка брендбука — ' + (parts.join('; ') || 'изменения');
  }

  function docTitle(f) {
    if (f === 'README.md') return 'Главная';
    var s = C.sections.filter(function (x) { return x.file === f; })[0];
    return s ? s.title : f;
  }

  // ---------- сохранение одним коммитом ----------
  function commit(entries, message) {
    var head;
    return headSha().then(function (sha) {
      if (sha !== S.headSha) {
        var e = new Error('Брендбук изменился с момента, как вы открыли редактор (кто-то сохранил свою правку). Скопируйте свои изменения, нажмите «Обновить» и внесите их снова.');
        e.conflict = true; throw e;
      }
      head = sha;
      return gh(REPO + '/git/commits/' + sha);
    }).then(function (c) {
      return gh(REPO + '/git/trees', { method: 'POST', body: { base_tree: c.tree.sha, tree: entries } });
    }).then(function (tree) {
      return gh(REPO + '/git/commits', { method: 'POST', body: { message: message, tree: tree.sha, parents: [head] } });
    }).then(function (nc) {
      return gh(REPO + '/git/refs/heads/' + C.branch, { method: 'PATCH', body: { sha: nc.sha } }).then(function () { return nc; });
    });
  }

  function save() {
    var files = changedFiles(), paths = Object.keys(files);
    if (!paths.length || S.saving) return;
    var custom = (document.getElementById('cmsg') || {}).value || '';
    var message = (custom.trim() || summary(files)) + '\n\nИзменено в редакторе брендбука: ' + paths.join(', ');
    S.saving = true; S.msg = null; renderBar();
    commit(paths.map(function (p) { return { path: p, mode: '100644', type: 'blob', content: files[p] }; }), message)
      .then(function (nc) {
        paths.forEach(function (p) { S.base[p] = files[p]; });
        S.site = JSON.parse(S.base['data/site.json']); S.tokens = JSON.parse(S.base['data/tokens.json']);
        Object.keys(S.docs).forEach(function (f) { S.docs[f] = S.base['content/' + f]; });
        S.headSha = nc.sha; S.saving = false; S.history = null;
        S.msg = { kind: 'ok', html: 'Сохранено в GitHub, версия <b>' + nc.sha.slice(0, 7) + '</b>. Сайт обновится примерно через 1–2 минуты. <a href="../" target="_blank" rel="noopener">Открыть сайт</a>' };
        render();
      })
      .catch(function (e) {
        S.saving = false;
        S.msg = { kind: 'err', html: B.esc(errText(e)) + (e.conflict ? ' <button type="button" class="btn small" data-act="reload">Обновить</button>' : '') };
        renderBar();
      });
  }

  function discard() {
    S.site = JSON.parse(S.base['data/site.json']); S.tokens = JSON.parse(S.base['data/tokens.json']);
    Object.keys(S.docs).forEach(function (f) { S.docs[f] = S.base['content/' + f]; });
    S.msg = null; render();
  }

  function errText(e) {
    if (e.status === 401) return 'GitHub не принял ключ доступа. Проверьте, что он скопирован целиком и не истёк.';
    if (e.status === 403 || e.status === 404) return 'У ключа нет права записи в репозиторий ' + C.owner + '/' + C.repo + '. Нужен доступ Contents: Read and write.';
    return e.message || String(e);
  }

  // ---------- история ----------
  function loadHistory() {
    S.history = 'loading'; renderPanel();
    gh(REPO + '/commits?per_page=30&sha=' + C.branch).then(function (list) {
      S.history = list; renderPanel();
    }).catch(function (e) { S.history = { error: errText(e) }; renderPanel(); });
  }

  function revert(sha) {
    if (S.saving) return;
    if (Object.keys(changedFiles()).length) { S.msg = { kind: 'warn', html: 'Сначала сохраните или отмените текущие правки.' }; renderBar(); return; }
    S.saving = true; S.msg = { kind: 'warn', html: 'Возвращаю версию ' + sha.slice(0, 7) + '…' }; renderBar();
    var target, current;
    gh(REPO + '/git/commits/' + sha).then(function (c) { return gh(REPO + '/git/trees/' + c.tree.sha + '?recursive=1'); })
      .then(function (t) { target = t; return headSha(); })
      .then(function (h) { return gh(REPO + '/git/commits/' + h); })
      .then(function (c) { return gh(REPO + '/git/trees/' + c.tree.sha + '?recursive=1'); })
      .then(function (t) {
        current = t;
        var cur = {}; current.tree.forEach(function (e) { cur[e.path] = e.sha; });
        var entries = target.tree.filter(function (e) { return C.editable.indexOf(e.path) >= 0 && cur[e.path] !== e.sha; })
          .map(function (e) { return { path: e.path, mode: e.mode, type: 'blob', sha: e.sha }; });
        if (!entries.length) { var x = new Error('Эта версия уже совпадает с тем, что сейчас на сайте.'); x.same = true; throw x; }
        return commit(entries, 'Возврат брендбука к версии ' + sha.slice(0, 7));
      })
      .then(function () { return loadAll(); })
      .then(function () {
        S.saving = false; S.confirmRevert = null; S.history = null;
        S.msg = { kind: 'ok', html: 'Версия ' + sha.slice(0, 7) + ' возвращена. Сайт обновится примерно через 1–2 минуты.' };
        render();
      })
      .catch(function (e) { S.saving = false; S.confirmRevert = null; S.msg = { kind: e.same ? 'warn' : 'err', html: B.esc(errText(e)) }; render(); });
  }

  // ---------- вход ----------
  function renderLogin(err) {
    app.innerHTML =
      '<div class="login"><form class="box" id="login">' +
      '<span class="brand"><span class="mark">' + B.icon('pencil', 22) + '</span></span>' +
      '<h1>Вход в редактор брендбука</h1>' +
      '<p>Править могут участники репозитория ' + B.esc(C.owner + '/' + C.repo) + '. Для входа нужен ключ доступа GitHub — он хранится только в этом браузере.</p>' +
      (err ? '<div class="msg err">' + B.esc(err) + '</div>' : '') +
      '<label class="field"><span>Ключ доступа GitHub</span><input type="password" id="tok" autocomplete="off" spellcheck="false" placeholder="github_pat_… или ghp_…" required></label>' +
      '<label class="check"><input type="checkbox" id="rem" checked> Запомнить на этом компьютере</label>' +
      '<button class="btn primary" type="submit">' + B.icon('github', 20) + '<span>Войти</span></button>' +
      '<details><summary>Как получить ключ (2 минуты, один раз)</summary><ol>' +
      '<li>Откройте <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">создание ключа на GitHub</a> (вы должны быть вошли в GitHub).</li>' +
      '<li>Token name — «Брендбук», Expiration — например, 1 год.</li>' +
      '<li>Repository access → <b>Only select repositories</b> → выберите <b>' + B.esc(C.repo) + '</b>.</li>' +
      '<li>Permissions → Repository permissions → <b>Contents</b> → <b>Read and write</b>.</li>' +
      '<li>Generate token, скопируйте ключ и вставьте сюда.</li>' +
      '</ol><p style="margin-top:8px">Коллега, которого вы добавили в репозиторий (Settings → Collaborators), создаёт ключ на странице <a href="https://github.com/settings/tokens/new?scopes=public_repo&amp;description=Брендбук" target="_blank" rel="noopener">Tokens (classic)</a> с галочкой <b>public_repo</b>.</p></details>' +
      '<a class="btn ghost" href="../">← Вернуться на сайт</a>' +
      '</form></div>';
    document.getElementById('login').addEventListener('submit', function (e) {
      e.preventDefault();
      var t = document.getElementById('tok').value.trim();
      if (!t) return;
      S.token = t;
      start(document.getElementById('rem').checked);
    });
  }

  function start(remember) {
    app.innerHTML = '<p class="loading" style="padding:2rem">Проверяю доступ и загружаю брендбук…</p>';
    gh(REPO).then(function (repo) {
      if (repo.permissions && repo.permissions.push === false) { var e = new Error('nopush'); e.status = 403; throw e; }
      return gh('/user').then(function (u) { S.login = u.login; }, function () { S.login = ''; });
    }).then(function () {
      if (remember !== undefined) storeToken(S.token, remember);
      return Promise.all([loadAll(), fetch('../examples/index.json?v=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (x) { S.examples = x; }, function () {})]);
    }).then(function () { render(); })
      .catch(function (e) {
        if (e.status === 401 || e.status === 403 || e.status === 404) { clearToken(); S.token = null; }
        renderLogin(errText(e));
      });
  }

  // ---------- интерфейс ----------
  function render() {
    var n = Object.keys(changedFiles()).length;
    app.innerHTML =
      '<header class="adm-top"><div class="l"><b>Редактор брендбука</b>' + (S.login ? '<span class="pill">' + B.esc(S.login) + '</span>' : '') +
      '<span class="pill warn" id="dirty"' + (n ? '' : ' hidden') + '>Есть несохранённые правки</span></div>' +
      '<div class="l"><a class="btn" href="../" target="_blank" rel="noopener">' + B.icon('eye', 18) + '<span>Открыть сайт</span></a>' +
      '<button type="button" class="btn ghost" data-act="logout">Выйти</button></div></header>' +
      '<div class="adm"><nav class="tabs" aria-label="Что править" id="tabs"></nav><div class="panel" id="panel"></div></div>' +
      '<div class="savebar" id="bar"></div>';
    renderTabs(); renderPanel(); renderBar();
  }

  function renderTabs() {
    var ch = changedFiles();
    var cnt = {
      colors: (ch['data/tokens.json'] ? 1 : 0),
      texts: (ch['data/site.json'] ? 1 : 0),
      docs: Object.keys(S.docs).filter(function (f) { return S.docs[f] !== S.base['content/' + f]; }).length,
      history: 0
    };
    var tabs = [['colors', 'Цвета', 'palette'], ['texts', 'Тексты сайта', 'type'], ['docs', 'Разделы', 'table'], ['history', 'История версий', 'history']];
    document.getElementById('tabs').innerHTML = tabs.map(function (t) {
      var on = S.tab === t[0];
      return '<button type="button" data-tab="' + t[0] + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' + B.icon(t[2], 20) + '<span>' + t[1] + '</span>' + (cnt[t[0]] ? '<span class="n">' + cnt[t[0]] + '</span>' : '') + '</button>';
    }).join('');
    var d = document.getElementById('dirty'); if (d) d.hidden = !Object.keys(ch).length;
  }

  function renderBar() {
    var bar = document.getElementById('bar'); if (!bar) return;
    var ch = changedFiles(), n = Object.keys(ch).length;
    var keep = (document.getElementById('cmsg') || {}).value || '';
    var reps = replacements();
    bar.innerHTML =
      '<button type="button" class="btn primary" data-act="save"' + (!n || S.saving ? ' disabled' : '') + '>' + (S.saving ? 'Сохраняю в GitHub…' : 'Сохранить') + '</button>' +
      '<button type="button" class="btn" data-act="discard"' + (!n || S.saving ? ' disabled' : '') + '>Отменить правки</button>' +
      '<label class="sr" for="cmsg">Комментарий к правке</label><input class="inp" id="cmsg" placeholder="Комментарий к правке (необязательно)" value="' + B.esc(keep) + '">' +
      '<span class="info">' + (n ? 'Изменено файлов: ' + n + (reps.length ? ' · HEX заменится и в текстах разделов' : '') : 'Изменений нет') + '</span>' +
      (S.msg ? '<div class="msg ' + S.msg.kind + '" role="status">' + S.msg.html + '</div>' : '');
  }

  function refreshMeta() { renderTabs(); renderBar(); }

  function renderPanel() {
    var p = document.getElementById('panel'); if (!p) return;
    if (S.tab === 'colors') p.innerHTML = colorsHtml() + previewHtml();
    else if (S.tab === 'texts') p.innerHTML = textsHtml();
    else if (S.tab === 'docs') p.innerHTML = docsHtml();
    else p.innerHTML = historyHtml();
    if (S.tab === 'colors') setupPreview();
    if (S.tab === 'history' && S.history === null) loadHistory();
  }

  // --- цвета ---
  function colorsHtml() {
    return '<section class="card-w"><h2>Цвета</h2><p class="sub">Выберите цвет или впишите HEX — справа сразу видно, как это выглядит. Описание под именем тоже можно править.</p>' +
      '<div class="filter-row"><label class="sr" for="cf">Найти цвет</label><input class="inp" id="cf" placeholder="Найти: navy, статус, фон…" value="' + B.esc(S.filter) + '"></div>' +
      '<div id="ctoks">' + colorRows() + '</div></section>';
  }

  function colorRows() {
    var colors = B.colorMap(S.tokens);
    var baseTok = JSON.parse(S.base['data/tokens.json']), old = {};
    baseTok.color.tokens.forEach(function (t) { old[t.name] = t; });
    var q = S.filter.trim().toLowerCase();
    var rows = S.tokens.color.tokens.map(function (t, i) {
      if (q && t.name.indexOf(q) < 0 && String(t.usage || '').toLowerCase().indexOf(q) < 0) return '';
      var isRef = /^\{[^}]+\}$/.test(t.value), hex = colors[t.name] || '#000000';
      var changed = old[t.name] && (old[t.name].value !== t.value || old[t.name].usage !== t.usage);
      var left = isRef
        ? '<span class="swb" style="background:' + B.esc(hex) + '"></span>'
        : '<input type="color" value="' + B.esc(B.HEX.test(t.value) ? t.value.toLowerCase() : '#000000') + '" data-i="' + i + '" data-k="pick" aria-label="Цвет ' + B.esc(t.name) + '">';
      var right = isRef
        ? '<div class="ref"><span>= ' + B.esc(t.value.slice(1, -1)) + ' (' + B.esc(hex) + ')</span><button type="button" class="btn small" data-i="' + i + '" data-k="unref">Задать свой цвет</button></div>'
        : '<label><span class="sr">HEX ' + B.esc(t.name) + '</span><input class="hex" value="' + B.esc(t.value) + '" data-i="' + i + '" data-k="hex" spellcheck="false"></label>';
      return '<div class="ctok">' + left + '<div class="nm"><b>' + B.esc(t.name) + '</b>' +
        '<label><span class="sr">Описание ' + B.esc(t.name) + '</span><textarea rows="2" data-i="' + i + '" data-k="usage">' + B.esc(t.usage || '') + '</textarea></label></div>' +
        right + '<span class="chg" id="chg-' + i + '"' + (changed ? '' : ' hidden') + '>изменён</span></div>';
    }).join('');
    return rows || '<p class="loading">Ничего не найдено.</p>';
  }

  function previewHtml() {
    var opts = S.examples.map(function (e) { return '<option value="' + B.esc(e.name) + '"' + (e.name === S.prevName ? ' selected' : '') + '>' + B.esc(e.name) + ' · ' + B.esc(e.group) + '</option>'; }).join('');
    return '<aside class="prev" aria-label="Предпросмотр"><span class="lbl">Предпросмотр</span>' +
      '<label class="sr" for="psel">Пример</label><select id="psel">' + opts + '</select>' +
      '<div class="box" id="pbox"><iframe id="pframe" title="Предпросмотр" src="../examples/' + encodeURIComponent(S.prevName) + '.html"></iframe></div></aside>';
  }

  function setupPreview() {
    var f = document.getElementById('pframe'), box = document.getElementById('pbox');
    if (!f) return;
    var meta = S.examples.filter(function (e) { return e.name === S.prevName; })[0] || { width: 1100, height: 600 };
    function fit() {
      var w = meta.width || 1100, h = meta.height || 600, k = Math.min(1, box.clientWidth / w);
      f.style.width = w + 'px'; f.style.height = h + 'px'; f.style.transform = 'scale(' + k + ')';
      box.style.height = Math.ceil(h * k) + 'px';
    }
    fit(); window.onresize = fit;
    f.addEventListener('load', updatePreview);
  }
  function updatePreview() {
    var f = document.getElementById('pframe');
    try { if (f) B.applyVars(f.contentDocument, S.tokens); } catch (e) {}
  }

  // --- тексты сайта ---
  function textsHtml() {
    return '<section class="card-w"><h2>Тексты сайта</h2><p class="sub">Название, подпись в шапке и вступление на главной.</p>' +
      '<div style="display:flex;flex-direction:column;gap:14px">' +
      '<label class="field"><span>Название сайта</span><input type="text" data-site="title" value="' + B.esc(S.site.title) + '"></label>' +
      '<label class="field"><span>Подпись под названием</span><input type="text" data-site="subtitle" value="' + B.esc(S.site.subtitle || '') + '"></label>' +
      '<label class="field"><span>Вступление на главной</span><textarea rows="5" data-site="intro">' + B.esc(S.site.intro) + '</textarea></label>' +
      '</div></section>';
  }

  // --- разделы ---
  function docsHtml() {
    var files = ['README.md'].concat(C.sections.map(function (s) { return s.file; }));
    var opts = files.map(function (f) { return '<option value="' + f + '"' + (f === S.doc ? ' selected' : '') + '>' + B.esc(docTitle(f)) + (S.docs[f] !== S.base['content/' + f] ? ' — изменён' : '') + '</option>'; }).join('');
    return '<section class="card-w" style="flex-basis:100%"><h2>Разделы</h2><p class="sub">Текст раздела в формате Markdown: <code>## Заголовок</code>, <code>- пункт</code>, <code>**жирный**</code>, <code>`код`</code>, таблицы через <code>|</code>, блоки кода через <code>```</code>. Справа — как это будет на сайте.</p>' +
      '<div class="filter-row"><label class="sr" for="dsel">Раздел</label><select class="inp" id="dsel">' + opts + '</select></div>' +
      '<div class="editor"><div style="flex:1 1 420px;min-width:0"><label class="sr" for="dtext">Текст раздела</label><textarea id="dtext" spellcheck="true">' + B.esc(S.docs[S.doc]) + '</textarea></div>' +
      '<div style="flex:1 1 420px;min-width:0" class="doc" id="dprev">' + B.md(S.docs[S.doc], B.colorMap(S.tokens)) + '</div></div></section>';
  }

  // --- история ---
  function historyHtml() {
    var head = '<section class="card-w" style="flex-basis:100%"><h2>История версий</h2><p class="sub">Каждое сохранение — отдельная версия в GitHub. Любую можно вернуть: её цвета и тексты станут текущими, а возврат сам станет новой версией.</p>';
    if (S.history === null || S.history === 'loading') return head + '<p class="loading">Загружаю историю…</p></section>';
    if (S.history.error) return head + '<div class="msg err">' + B.esc(S.history.error) + '</div></section>';
    return head + S.history.map(function (c, i) {
      var title = c.commit.message.split('\n')[0];
      var who = (c.author && c.author.login) || c.commit.author.name;
      var act = i === 0 ? '<span class="cur">Сейчас на сайте</span>'
        : (S.confirmRevert === c.sha
          ? '<button type="button" class="btn small primary" data-revert="' + c.sha + '">Да, вернуть</button><button type="button" class="btn small" data-act="norevert">Отмена</button>'
          : '<button type="button" class="btn small" data-ask="' + c.sha + '">Вернуть эту версию</button>');
      return '<div class="hist"><a class="sha" href="https://github.com/' + C.owner + '/' + C.repo + '/commit/' + c.sha + '" target="_blank" rel="noopener" title="Что изменилось">' + c.sha.slice(0, 7) + '</a>' +
        '<div class="t"><b>' + B.esc(title) + '</b><span>' + B.esc(B.fmtDate(c.commit.author.date)) + ' · ' + B.esc(who) + '</span></div>' + act + '</div>';
    }).join('') + '</section>';
  }

  // ---------- события ----------
  var docTimer = null;
  app.addEventListener('input', function (e) {
    var el = e.target, k = el.getAttribute('data-k');
    if (k) {
      var i = +el.getAttribute('data-i'), t = S.tokens.color.tokens[i];
      if (k === 'pick') {
        t.value = el.value.toLowerCase();
        var hx = el.parentNode.parentNode.querySelector('.hex'); if (hx) { hx.value = t.value; hx.classList.remove('bad'); }
      } else if (k === 'hex') {
        var v = el.value.trim();
        if (/^[0-9a-fA-F]{6}$/.test(v)) v = '#' + v;
        el.classList.toggle('bad', !B.HEX.test(v));
        if (B.HEX.test(v)) {
          t.value = v.toLowerCase();
          var pk = el.closest('.ctok').querySelector('input[type=color]'); if (pk) pk.value = t.value;
        }
      } else if (k === 'usage') { t.usage = el.value; }
      var baseTok = JSON.parse(S.base['data/tokens.json']).color.tokens[i];
      var chg = document.getElementById('chg-' + i);
      if (chg && baseTok) chg.hidden = baseTok.value === t.value && baseTok.usage === t.usage;
      if (k !== 'usage') { updatePreview(); refreshSwatches(); }
      refreshMeta();
      return;
    }
    if (el.id === 'cf') { S.filter = el.value; document.getElementById('ctoks').innerHTML = colorRows(); return; }
    var sk = el.getAttribute('data-site');
    if (sk) { S.site[sk] = el.value; refreshMeta(); return; }
    if (el.id === 'dtext') {
      S.docs[S.doc] = el.value; refreshMeta();
      clearTimeout(docTimer);
      docTimer = setTimeout(function () { var p = document.getElementById('dprev'); if (p) p.innerHTML = B.md(S.docs[S.doc], B.colorMap(S.tokens)); }, 250);
    }
  });

  // ссылки на цвет (= navy) показывают актуальный цвет
  function refreshSwatches() {
    var colors = B.colorMap(S.tokens);
    S.tokens.color.tokens.forEach(function (t, i) {
      if (!/^\{/.test(t.value)) return;
      var row = document.querySelector('[data-i="' + i + '"][data-k="unref"]');
      if (!row) return;
      var ct = row.closest('.ctok');
      ct.querySelector('.swb').style.background = colors[t.name];
      ct.querySelector('.ref span').textContent = '= ' + t.value.slice(1, -1) + ' (' + colors[t.name] + ')';
    });
  }

  app.addEventListener('change', function (e) {
    var el = e.target;
    if (el.id === 'psel') { S.prevName = el.value; renderPanel(); }
    if (el.id === 'dsel') { S.doc = el.value; renderPanel(); }
  });

  app.addEventListener('click', function (e) {
    var b = e.target.closest('button, [data-tab]'); if (!b) return;
    var tab = b.getAttribute('data-tab');
    if (tab) { S.tab = tab; S.confirmRevert = null; renderTabs(); renderPanel(); return; }
    var act = b.getAttribute('data-act');
    if (act === 'save') save();
    else if (act === 'discard') discard();
    else if (act === 'logout') { clearToken(); S.token = null; renderLogin(); }
    else if (act === 'reload') { S.msg = null; start(); }
    else if (act === 'norevert') { S.confirmRevert = null; renderPanel(); }
    if (b.getAttribute('data-k') === 'unref') {
      var i = +b.getAttribute('data-i'); var t = S.tokens.color.tokens[i];
      t.value = B.colorMap(S.tokens)[t.name] || '#000000';
      renderPanel(); refreshMeta();
    }
    var ask = b.getAttribute('data-ask'); if (ask) { S.confirmRevert = ask; renderPanel(); }
    var rv = b.getAttribute('data-revert'); if (rv) revert(rv);
  });

  window.addEventListener('beforeunload', function (e) {
    if (S.token && S.base['data/site.json'] && Object.keys(changedFiles()).length) { e.preventDefault(); e.returnValue = ''; }
  });

  S.token = loadToken();
  if (S.token) start(); else renderLogin();
})();
