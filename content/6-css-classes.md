# Классы CSS

> **Наглядно:** карточка **CssClasses** (группа «0 · Основы») — каждый класс в отрисованном виде рядом с его именем.

Классы темы `css/theme.css` (раздел «Стили CSS»). В ElemText пишите `class="…"`, у остальных виджетов — поле `cssClass` массивом: `["text-increase-a"]`. Иконки MDI в `cssClass`: `["mdi", "mdi-check-circle-outline"]`.

## Заголовки и текст

В ElemText: `<div class="…">…</div>` при `isPlainHTMLShown: true`.

| Класс | Что делает | Как применять |
|---|---|---|
| `.sp-kicker` | Рубрика над названием: 0.7rem/600, разрядка 0.14em, ПРОПИСНЫЕ, `blue` | `<div class="sp-kicker">Аналитическая панель · продажи</div>` |
| `.sp-title` | Название дашборда: 1.75rem/700, `ink` | `<h2 class="sp-title">Продажи по регионам</h2>` |
| `.sp-h2` | Заголовок раздела с линией 2px `navy`: 1.25rem/700 | окна, длинные страницы |
| `.sp-card-title` | Название карточки: 1rem/700 | карточки разделов |
| `.sp-blk` | Заголовок блока: 0.9rem/700, флекс с кружком номера | `<div class="sp-blk"><span class="sp-num">1</span>Регионы</div>` |
| `.sp-num` | Кружок номера блока 1.4rem, `navy`, белая цифра | внутри `sp-blk` |
| `.sp-sub` | Подзаголовок блока: 0.75rem `muted` | под `sp-blk`: единицы, период |
| `.sp-note-title` | Подзаголовок: 0.8rem/700 | врезки, легенды |
| `.sp-note` | Пояснение: 0.78rem `muted` | источник, время обновления |
| `.sp-stage` | Подпись этапа с линией 2px `line`: 0.72rem/600 | колонки этапов |
| `.sp-ktitle` | Подпись плитки KPI отдельным текстом: 0.8rem/600 `muted` | когда `showTitle: false` |
| `.sp-callout` | Врезка: полоса 4px `orange`, фон `callout-bg` | выводы и предупреждения |

```css
.sp-kicker { font-family: var(--sp-font); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--sp-blue); margin: 0 0 0.15rem; }
.sp-title { font-family: var(--sp-font); font-size: 1.75rem; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em; color: var(--sp-ink); margin: 0; }
.sp-h2 { font-family: var(--sp-font); font-size: 1.25rem; font-weight: 700; color: var(--sp-ink); border-bottom: 2px solid var(--sp-navy); padding-bottom: 0.25rem; }
.sp-card-title { font-family: var(--sp-font); font-size: 1rem; font-weight: 700; color: var(--sp-ink); margin: 0 0 0.2rem; }
.sp-note-title { font-family: var(--sp-font); font-size: 0.8rem; font-weight: 700; color: var(--sp-ink); margin: 0 0 0.15rem; }
.sp-note { font-family: var(--sp-font); font-size: 0.78rem; color: var(--sp-muted); margin: 0.15rem 0 0; }
.sp-stage { font-family: var(--sp-font); font-size: 0.72rem; font-weight: 600; color: var(--sp-muted); border-bottom: 2px solid var(--sp-line); padding-bottom: 0.2rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sp-blk { font-family: var(--sp-font); font-size: 0.9rem; font-weight: 700; color: var(--sp-ink); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.sp-num { display: inline-flex; align-items: center; justify-content: center; width: 1.4rem; height: 1.4rem; border-radius: 50%; background: var(--sp-navy); color: #FFFFFF; font-size: 0.75rem; flex: none; }
.sp-sub { font-family: var(--sp-font); font-size: 0.75rem; color: var(--sp-muted); margin: 0.2rem 0 0; font-weight: 400; }
.sp-ktitle { font-family: var(--sp-font); font-size: 0.8rem; font-weight: 600; color: var(--sp-muted); }
.sp-callout { font-family: var(--sp-font); font-size: 0.8rem; color: var(--sp-ink); border-left: 4px solid var(--sp-orange); background: #FFF7F2; padding: 0.45rem 0.75rem; border-radius: 0 6px 6px 0; }
```

## Подписи фильтров

| Класс | Что делает | Как применять |
|---|---|---|
| `.sp-flabel` | Подпись группы фильтров: 0.7rem/600, 0.08em, ПРОПИСНЫЕ, `muted` | панель фильтров |
| `.sp-filter-label` | То же по центру, разрядка 0.06em | над фильтром в колонке |

```css
.sp-flabel { font-family: var(--sp-font); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--sp-muted); }
.sp-filter-label { font-family: var(--sp-font); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sp-muted); text-align: center; margin: 0; }
```

## Системы АИС и 1С

| Класс | Что делает | Как применять |
|---|---|---|
| `.sp-sys-legend` | Строка легенды систем | над таблицей сверки |
| `.sp-sys` | Метка системы: 4px, белый 700 | вместе с `sp-ais` или `sp-ms` |
| `.sp-ais` | Фон `blue` — АИС | `<span class="sp-sys sp-ais">АИС</span>` |
| `.sp-ms` | Фон `violet` — 1С | `<span class="sp-sys sp-ms">1С</span>` |
| `.sp-expand` | Ссылка «развернуть» справа, `navy` 600 | в легенде |

```css
.sp-sys-legend { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0.75rem; font-family: var(--sp-font); font-size: 0.8rem; color: var(--sp-muted); padding: 0.25rem 0; }
.sp-sys { display: inline-block; min-width: 2.6rem; text-align: center; border-radius: 4px; padding: 0.1rem 0.5rem; color: #FFFFFF; font-weight: 700; }
.sp-ais { background: #2A78D6; }
.sp-ms { background: #6250D6; }
.sp-expand { margin-left: auto; color: #184F95; font-weight: 600; }
```

## Бейджи статусов с подсказкой

Подсказка появляется при наведении; текст подсказки задаётся в теме для каждого статуса (`.bi-status-enabled::after { content: "…" }`).

| Класс | Что делает | Как применять |
|---|---|---|
| `.bi-status-badge` | Таблетка 20px, ПРОПИСНЫЕ, белый 600 | `<span class="bi-status-badge bi-status-enabled">enabled</span>` |
| `.bi-status-enabled` | `green`: enabled, active, true (доступ открыт) | то же для `bi-status-active`, `bi-status-true` |
| `.bi-status-disabled` | `red`: disabled, unused, false | то же для `bi-status-unused`, `bi-status-false` |
| `.bi-status-replica` | `amber` с текстом `ink`: replica, low_usage, other | то же для `bi-status-low-usage`, `bi-status-other` |
| `.bi-status-always` | `navy`: always |  |

```css
.bi-status-badge { position: relative !important; display: inline-block !important; padding: 6px 12px !important; border-radius: 20px !important; font-weight: 600 !important; color: #FFFFFF !important; text-transform: uppercase !important; cursor: help !important; z-index: 10000 !important; }
.bi-status-enabled, .bi-status-active, .bi-status-true { background-color: #138A5E !important; }
.bi-status-disabled, .bi-status-unused, .bi-status-false { background-color: #C4441A !important; }
.bi-status-replica, .bi-status-low-usage, .bi-status-other { background-color: #EDA100 !important; color: #14171C !important; }
.bi-status-always { background-color: #184F95 !important; }
.bi-status-badge::after { content: "" !important; position: absolute !important; top: 125% !important; left: 50% !important; transform: translateX(-50%) !important; max-width: 320px !important; padding: 8px 12px !important; background-color: #14171C !important; color: #EDF2F7 !important; border-radius: 6px !important; font-size: 11px !important; line-height: 1.3 !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important; z-index: 9999 !important; transition: opacity 0.2s ease !important; }
.bi-status-badge::before { content: "" !important; position: absolute !important; top: 105% !important; left: 50% !important; transform: translateX(-50%) !important; width: 0 !important; height: 0 !important; border-left: 8px solid transparent !important; border-right: 8px solid transparent !important; border-bottom: 8px solid #14171C !important; opacity: 0 !important; visibility: hidden !important; z-index: 9998 !important; }
.bi-status-badge:hover::after, .bi-status-badge:hover::before { opacity: 1 !important; visibility: visible !important; }
.bi-status-enabled::after { content: "ENABLED: срабатывает всегда на сервере." !important; }
```

## Кнопки

| Класс | Что делает | Как применять |
|---|---|---|
| `.btn-title` | Кнопка-заголовок 200 × 28px, `navy`, 16px; наведение — кольцо и 1.05; фокус — `shadow-focus` | ссылки-кнопки в тексте |
| `.btn-new` | Базовая кнопка ElemFiltersDremio; размеры и цвета переопределяются в `fontOptions` виджета | см. «Стили CSS» → Кнопки |

```css
.btn-title { width: 200px; height: 28px; display: flex; justify-content: center; align-items: center; padding: 0 24px; border-radius: 2rem; border: none; background-color: #184F95; color: #FFFFFF; font-family: sans-serif; font-size: 16px; text-align: center; white-space: nowrap; box-sizing: border-box; cursor: pointer; outline: none; transition: box-shadow 0.3s ease, transform 0.2s ease; }
.btn-title:hover { box-shadow: 0 0 0 2px white, 0 0 0 4px #2A78D6; transform: scale(1.05); }
.btn-title:focus { box-shadow: 0 0 0 2px #184F95, 0 0 0 4px rgba(24, 79, 149, 0.45); }
.btn-new { display: inline-flex; justify-content: center; align-items: center; width: 10px; height: 10px; border-radius: 50%; text-align: center; transition: none; font-size: 0.7rem; font-weight: 400; line-height: 1em; color: white; background-color: #9D9D9D; border: none; padding: 0; cursor: pointer; }
.btn-new:hover, .btn-new:focus { background-color: #184F95; }
.btn-new:focus { outline: 2px solid #184F95; outline-offset: 2px; }
```

## Поведение

В поле `cssClass` виджета.

| Класс | Что делает | Как применять |
|---|---|---|
| `.text-increase` | Увеличение 1.05 при наведении | кнопки, текстовые элементы |
| `.text-increase-a` | Увеличение 1.2 при наведении | круглые кнопки шапки |
| `.icon` | Иконка темнеет до `navy` при наведении | ElemReport, ElemScreenshoter |
| `.text` | Текст белеет и становится 700 при наведении | элементы на тёмной заливке |
| `.widget.value-positive` | Голубой градиент плитки, если значение > 0 | плитки-счётчики |

```css
.text-increase:hover { transform: scale(1.05); }
.text-increase-a:hover { transform: scale(1.20); }
.text:hover { color: #FFFFFF !important; font-weight: 700; }
.icon:hover { color: #184F95 !important; }
.widget.value-positive { background: linear-gradient(90deg, rgba(42, 120, 214, 0.08) 0%, rgba(42, 120, 214, 0.25) 100%); box-shadow: 0 4px 12px rgba(42, 120, 214, 0.15); }
```

## Появление

`cssClass: ["animate", "fadeInUp", "one"]`. Отключается при «уменьшении движения» в системе.

| Класс | Что делает | Как применять |
|---|---|---|
| `.animate` | Длительность 2s, сохраняет конечное состояние | вместе с `fadeIn`/`fadeInUp` |
| `.fadeIn` | Появление прозрачностью |  |
| `.fadeInUp` | Появление снизу |  |
| `.one` | Задержка 0.1s (`two` 0.3s, `three` 0.5s, `four` 2.5s) | по порядку элементов |

```css
.animate { animation-duration: 2s; animation-fill-mode: both; }
.one { animation-delay: 0.1s; } .two { animation-delay: 0.3s; } .three { animation-delay: 0.5s; } .four { animation-delay: 2.5s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.fadeIn { animation-name: fadeIn; }
@keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 100%, 0); } to { opacity: 1; transform: none; } }
.fadeInUp { animation-name: fadeInUp; }
@media (prefers-reduced-motion: reduce) { .animate { animation: none !important; } }
```

## Классы макетов `.ib-*`

Классы `.ib-*` из `components/bundle.css` повторяют виджеты Insight на обычном HTML — ими нарисованы примеры брендбука. В Insight они не нужны: те же значения задаются props (раздел «Стили CSS»). Используйте их для макетов и HTML-страниц в том же стиле.

| Класс | Виджет |
|---|---|
| `.ib-kpis`, `.ib-kpi`, `.ib-kpi--green/orange/red/violet/navy`, `.ib-kpi__title`, `.ib-kpi__value`, `.ib-kpi__bench` | плитки показателей |
| `.ib-round`, `.ib-chip`, `.ib-reset`, `.ib-tab`, `.ib-tabs` | кнопки |
| `.ib-badge`, `.ib-badge--green/red/amber/navy/muted/soft`, `.ib-new` | бейджи |
| `.ib-badge--p1` … `.ib-badge--p9` | теги |
| `.ib-card`, `.ib-table`, `.ib-num`, `.ib-sub`, `.ib-dev`, `.ib-pager` | таблицы |
| `.ib-progress`, `.ib-progress__lab`, `.ib-progress__track` | прогресс-бары |
| `.ib-legend` | легенды графиков |
| `.ib-header`, `.ib-titlebar`, `.ib-stamp`, `.ib-block`, `.ib-toolbar`, `.ib-select`, `.ib-search` | шаблон, блоки, фильтры |
