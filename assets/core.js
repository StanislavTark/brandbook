/* Общее для сайта и редактора: настройки, загрузка данных, токены, разметка Markdown. */
(function () {
  'use strict';

  var CONFIG = {
    owner: 'StanislavTark',
    repo: 'brandbook',
    branch: 'main',
    sections: [
      { file: '1-colors.md', id: 'colors', title: 'Цвета', icon: 'palette', desc: 'Токены с HEX, контрастом и местом применения' },
      { file: '2-typography.md', id: 'typography', title: 'Шрифты и размерность', icon: 'type', desc: 'Шкала текста, отступы, скругления, сетка, форматы чисел' },
      { file: '3-icons.md', id: 'icons', title: 'Иконки MDI', icon: 'grid', desc: 'Словарь иконок и их значений' },
      { file: '4-widgets.md', id: 'widgets', title: 'Виджеты', icon: 'pie', desc: 'Показатели, кнопки, бейджи, таблицы, графики' },
      { file: '5-css-styles.md', id: 'css', title: 'Стили CSS', icon: 'braces', desc: 'Тема css/theme.css и строки props' },
      { file: '6-css-classes.md', id: 'classes', title: 'Классы CSS', icon: 'table', desc: 'Классы темы с кодом и примерами' },
      { file: '7-migration.md', id: 'migration', title: 'Переход на единый стиль', icon: 'renew', desc: 'Чек-лист: что было → что стало' }
    ],
    // файлы, которые правит редактор и возвращает «История версий»
    editable: ['data/site.json', 'data/tokens.json', 'examples/bundle.css', 'content/README.md',
      'content/1-colors.md', 'content/2-typography.md', 'content/3-icons.md', 'content/4-widgets.md',
      'content/5-css-styles.md', 'content/6-css-classes.md', 'content/7-migration.md']
  };

  var ICONS = {
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    palette: 'M17.5 12a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 17.5 9a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5m-3-4A1.5 1.5 0 0 1 13 6.5 1.5 1.5 0 0 1 14.5 5 1.5 1.5 0 0 1 16 6.5 1.5 1.5 0 0 1 14.5 8m-5 0A1.5 1.5 0 0 1 8 6.5 1.5 1.5 0 0 1 9.5 5 1.5 1.5 0 0 1 11 6.5 1.5 1.5 0 0 1 9.5 8m-3 4A1.5 1.5 0 0 1 5 10.5 1.5 1.5 0 0 1 6.5 9 1.5 1.5 0 0 1 8 10.5 1.5 1.5 0 0 1 6.5 12M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.74-.39-1-.23-.27-.38-.62-.38-1a1.5 1.5 0 0 1 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8',
    type: 'M2 4v3h5v12h3V7h5V4zm19 5h-9v3h3v7h3v-7h3z',
    grid: 'M3 11h8V3H3m2 2h4v4H5m8-6v8h8V3m-2 6h-4V5h4M3 21h8v-8H3m2 2h4v4H5m8 2h8v-8h-8m2 2h4v4h-4z',
    pie: 'M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10m2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99m0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99z',
    braces: 'M8 3a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H3v2h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2v-2H8v-5a2 2 0 0 0-2-2 2 2 0 0 0 2-2V5h2V3m6 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5h-2V3z',
    table: 'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 4v4h6V8zm8 0v4h6V8zm-8 6v4h6v-4zm8 0v4h6v-4z',
    renew: 'M12 6v3l4-4-4-4v3a8 8 0 0 0-8 8c0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.9 5.9 0 0 1 6 12a6 6 0 0 1 6-6m6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8a6 6 0 0 1-6 6v-3l-4 4 4 4v-3a8 8 0 0 0 8-8c0-1.57-.46-3.03-1.24-4.26',
    eye: 'M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5',
    info: 'M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2z',
    dash: 'M21 16V4H3v12zm0-14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7v2h2v2H8v-2h2v-2H3a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2zM5 6h9v5H5zm10 0h4v2h-4zm4 3v5h-4V9zM5 12h4v2H5zm5 0h4v2h-4z',
    pencil: 'M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z',
    copy: 'M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z',
    history: 'M13.5 8H12v5l4.28 2.54.72-1.21-3.5-2.08zM13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9',
    magnify: 'M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5',
    menu: 'M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z',
    check: 'M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z',
    github: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.56 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2'
  };

  function icon(name, size, extraClass) {
    var d = ICONS[name] || '';
    return '<svg class="ico ' + (extraClass || '') + '" width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="' + d + '"></path></svg>';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ---------- токены ----------
  var HEX = /^#[0-9a-fA-F]{6}$/;

  function colorMap(tokens) {
    var raw = {}, out = {};
    ((tokens.color && tokens.color.tokens) || []).forEach(function (t) { raw[t.name] = t.value; });
    function resolve(name, depth) {
      var v = raw[name];
      if (v == null || depth > 8) return null;
      var m = /^\{([^}]+)\}$/.exec(v);
      return m ? resolve(m[1], depth + 1) : v;
    }
    Object.keys(raw).forEach(function (k) { out[k] = resolve(k, 0); });
    return out;
  }

  function cssVars(tokens) {
    var lines = [], colors = colorMap(tokens);
    Object.keys(colors).forEach(function (k) { if (colors[k]) lines.push('--' + k + ':' + colors[k] + ';'); });
    ['spacing', 'radius', 'shadow', 'border', 'size'].forEach(function (g) {
      ((tokens[g] && tokens[g].tokens) || []).forEach(function (t) { lines.push('--' + t.name + ':' + t.value + ';'); });
    });
    var fam = tokens.type && tokens.type.families;
    if (fam) Object.keys(fam).forEach(function (k) { lines.push('--font-' + k + ':' + fam[k] + ';'); });
    return ':root{' + lines.join('') + '}';
  }

  function applyVars(doc, tokens) {
    if (!doc || !doc.head) return;
    var el = doc.getElementById('bb-vars');
    if (!el) { el = doc.createElement('style'); el.id = 'bb-vars'; doc.head.appendChild(el); }
    el.textContent = cssVars(tokens);
  }

  // ---------- Markdown ----------
  function slug(s) {
    return String(s).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^0-9a-zа-яё]+/gi, '-').replace(/^-+|-+$/g, '');
  }

  function inline(text, colors) {
    var codes = [];
    var s = String(text).replace(/`([^`]+)`/g, function (_, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, t, u) {
      var safe = /^(https?:|#|\.{0,2}\/)/.test(u) ? u : '#';
      return '<a href="' + safe + '"' + (/^https?:/.test(safe) ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>';
    });
    s = s.replace(/\u0000(\d+)\u0000/g, function (_, i) {
      var c = codes[+i], hex = null;
      if (HEX.test(c)) hex = c;
      else if (colors && colors[c] && HEX.test(colors[c])) hex = colors[c];
      return (hex ? '<span class="sw" style="background:' + hex + '" title="' + hex + '"></span>' : '') + '<code>' + esc(c) + '</code>';
    });
    return s;
  }

  function splitRow(line) {
    var t = line.trim();
    if (t.charAt(0) === '|') t = t.slice(1);
    if (t.charAt(t.length - 1) === '|') t = t.slice(0, -1);
    return t.split('|').map(function (c) { return c.trim(); });
  }

  function md(src, colors) {
    var lines = String(src || '').replace(/\r/g, '').split('\n');
    var html = [], i = 0, para = [];
    function flush() { if (para.length) { html.push('<p>' + inline(para.join(' '), colors) + '</p>'); para = []; } }
    while (i < lines.length) {
      var line = lines[i];
      var fence = /^```(\w*)\s*$/.exec(line);
      if (fence) {
        flush();
        var buf = []; i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        html.push('<div class="code"><button type="button" class="copy" data-copy>' + icon('copy', 16) + '<span>Копировать</span></button><pre><code>' + esc(buf.join('\n')) + '</code></pre></div>');
        continue;
      }
      var h = /^(#{1,4})\s+(.*)$/.exec(line);
      if (h) {
        flush();
        var lvl = h[1].length, txt = inline(h[2], colors);
        html.push('<h' + lvl + ' id="' + slug(h[2]) + '">' + txt + '</h' + lvl + '>');
        i++; continue;
      }
      if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
        flush();
        var head = splitRow(line); i += 2;
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(splitRow(lines[i])); i++; }
        html.push('<div class="tbl"><table><thead><tr>' + head.map(function (c) { return '<th>' + inline(c, colors) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inline(c, colors) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>');
        continue;
      }
      if (/^>\s?/.test(line)) {
        flush();
        var q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, '')); i++; }
        html.push('<div class="callout">' + icon('info', 20) + '<div>' + inline(q.join(' '), colors) + '</div></div>');
        continue;
      }
      if (/^\s*(-|\*|\d+\.)\s+/.test(line)) {
        flush();
        var ordered = /^\s*\d+\./.test(line), items = [];
        while (i < lines.length && /^\s*(-|\*|\d+\.)\s+/.test(lines[i])) {
          var item = lines[i].replace(/^\s*(-|\*|\d+\.)\s+/, ''); i++;
          while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*(-|\*|\d+\.)\s+/.test(lines[i])) { item += ' ' + lines[i].trim(); i++; }
          items.push('<li>' + inline(item, colors) + '</li>');
        }
        html.push(ordered ? '<ol>' + items.join('') + '</ol>' : '<ul>' + items.join('') + '</ul>');
        continue;
      }
      if (/^\s*$/.test(line)) { flush(); i++; continue; }
      para.push(line.trim()); i++;
    }
    flush();
    return html.join('\n');
  }

  function firstHeading(src) {
    var m = /^#\s+(.+)$/m.exec(src || '');
    return m ? m[1].trim() : '';
  }

  function bindCopy(root) {
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-copy]');
      if (!b) return;
      var text = b.getAttribute('data-copy') || (b.parentNode.querySelector('pre') || {}).innerText || '';
      copyText(text, b);
    });
  }

  function copyText(text, btn) {
    function done() {
      if (!btn) return;
      var lbl = btn.querySelector('span');
      if (lbl) { var old = lbl.textContent; lbl.textContent = 'Скопировано'; setTimeout(function () { lbl.textContent = old; }, 1400); }
      btn.classList.add('ok'); setTimeout(function () { btn.classList.remove('ok'); }, 1400);
    }
    try {
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, fallback); }
      else fallback();
    } catch (e) { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  }

  function fmtDate(iso) {
    var d = new Date(iso); if (isNaN(d)) return '';
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return p(d.getDate()) + '.' + p(d.getMonth() + 1) + '.' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  window.BB = { CONFIG: CONFIG, icon: icon, esc: esc, md: md, inline: inline, colorMap: colorMap, cssVars: cssVars,
    applyVars: applyVars, firstHeading: firstHeading, bindCopy: bindCopy, copyText: copyText, fmtDate: fmtDate, HEX: HEX, slug: slug };
})();
