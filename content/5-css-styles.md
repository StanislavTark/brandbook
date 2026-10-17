# Стили CSS

Всё, что вставляется в проект Insight: тема целиком и строки для свойств (props) каждого виджета. Порядок — как в разделе «Виджеты». Классы темы с описанием — в разделе «Классы CSS».

## Тема проекта — css/theme.css

Настройки приложения → CSS. Вставляйте целиком, заменяя старую тему. Одна тема для всех дашбордов.

```css
/* ---- custom fonts ---- */

/* ---- theme params: единый стиль ---- */
:root {
  --sp-navy: #184F95;   /* выбранное, линия шапки, номер блока */
  --sp-blue: #2A78D6;   /* данные, рубрика, АИС */
  --sp-green: #138A5E;  /* рост, выполнено */
  --sp-orange: #EB6834; /* риск, просрочка, врезки */
  --sp-red: #C4441A;    /* падение, отклонение */
  --sp-amber: #EDA100;  /* предупреждение */
  --sp-violet: #6250D6; /* 1С, переплата */
  --sp-ink: #14171C;    /* основной текст */
  --sp-muted: #52514E;  /* подписи */
  --sp-tint: #F2F5F9;   /* фон плиток, блоков, панелей */
  --sp-chip: #E4F0FC;   /* невыбранное, наведение */
  --sp-line: #E3E2DD;   /* разделители */
  --sp-font: "Inter", "Segoe UI", Arial, sans-serif;
}

/* ---- поведение ---- */
.text-increase:hover { transform: scale(1.05); }
.text-increase-a:hover { transform: scale(1.20); }
.text:hover { color: #FFFFFF !important; font-weight: 700; }
.icon:hover { color: #184F95 !important; }

/* ---- кнопка-заголовок ---- */
.btn-title {
  width: 200px; height: 28px; display: flex; justify-content: center; align-items: center;
  padding: 0 24px; border-radius: 2rem; border: none;
  background-color: #184F95; color: #FFFFFF; font-family: sans-serif; font-size: 16px;
  text-align: center; white-space: nowrap; box-sizing: border-box; cursor: pointer; outline: none;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.btn-title:hover { box-shadow: 0 0 0 2px white, 0 0 0 4px #2A78D6; transform: scale(1.05); }
.btn-title:focus { box-shadow: 0 0 0 2px #184F95, 0 0 0 4px rgba(24, 79, 149, 0.45); }

/* ---- базовая .btn-new (переопределяется в fontOptions элемента) ---- */
.btn-new {
  display: inline-flex; justify-content: center; align-items: center;
  width: 10px; height: 10px; border-radius: 50%; text-align: center; transition: none;
  font-size: 0.7rem; font-weight: 400; line-height: 1em; color: white; background-color: #9D9D9D;
  border: none; padding: 0; cursor: pointer;
}
.btn-new:hover, .btn-new:focus { background-color: #184F95; }
.btn-new:focus { outline: 2px solid #184F95; outline-offset: 2px; }

/* ---- шапка, заголовки, подписи ---- */
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
.sp-flabel { font-family: var(--sp-font); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--sp-muted); }
.sp-filter-label { font-family: var(--sp-font); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sp-muted); text-align: center; margin: 0; }
.sp-ktitle { font-family: var(--sp-font); font-size: 0.8rem; font-weight: 600; color: var(--sp-muted); }
.sp-callout { font-family: var(--sp-font); font-size: 0.8rem; color: var(--sp-ink); border-left: 4px solid var(--sp-orange); background: #FFF7F2; padding: 0.45rem 0.75rem; border-radius: 0 6px 6px 0; }

/* ---- системы: АИС — синий, 1С — фиолетовый ---- */
.sp-sys-legend { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0.75rem; font-family: var(--sp-font); font-size: 0.8rem; color: var(--sp-muted); padding: 0.25rem 0; }
.sp-sys { display: inline-block; min-width: 2.6rem; text-align: center; border-radius: 4px; padding: 0.1rem 0.5rem; color: #FFFFFF; font-weight: 700; }
.sp-ais { background: #2A78D6; }
.sp-ms { background: #6250D6; }
.sp-expand { margin-left: auto; color: #184F95; font-weight: 600; }

/* ---- бейджи статусов с подсказкой ---- */
.bi-status-badge { position: relative !important; display: inline-block !important; padding: 6px 12px !important; border-radius: 20px !important;
  font-weight: 600 !important; color: #FFFFFF !important; text-transform: uppercase !important; cursor: help !important; z-index: 10000 !important; }
.bi-status-enabled, .bi-status-active, .bi-status-true { background-color: #138A5E !important; }
.bi-status-disabled, .bi-status-unused, .bi-status-false { background-color: #C4441A !important; }
.bi-status-replica, .bi-status-low-usage, .bi-status-other { background-color: #EDA100 !important; color: #14171C !important; }
.bi-status-always { background-color: #184F95 !important; }
.bi-status-badge::after { content: "" !important; position: absolute !important; top: 125% !important; left: 50% !important; transform: translateX(-50%) !important;
  max-width: 320px !important; padding: 8px 12px !important; background-color: #14171C !important; color: #EDF2F7 !important; border-radius: 6px !important;
  font-size: 11px !important; line-height: 1.3 !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important; z-index: 9999 !important; transition: opacity 0.2s ease !important; }
.bi-status-badge::before { content: "" !important; position: absolute !important; top: 105% !important; left: 50% !important; transform: translateX(-50%) !important;
  width: 0 !important; height: 0 !important; border-left: 8px solid transparent !important; border-right: 8px solid transparent !important;
  border-bottom: 8px solid #14171C !important; opacity: 0 !important; visibility: hidden !important; z-index: 9998 !important; }
.bi-status-badge:hover::after, .bi-status-badge:hover::before { opacity: 1 !important; visibility: visible !important; }
/* тексты подсказок — свои для каждого дашборда, например: */
.bi-status-enabled::after { content: "ENABLED: срабатывает всегда на сервере." !important; }

/* ---- подсветка плитки, если значение > 0 ---- */
.widget.value-positive { background: linear-gradient(90deg, rgba(42, 120, 214, 0.08) 0%, rgba(42, 120, 214, 0.25) 100%); box-shadow: 0 4px 12px rgba(42, 120, 214, 0.15); }

/* ---- появление элементов (cssClass: animate fadeInUp one) ---- */
.animate { animation-duration: 2s; animation-fill-mode: both; }
.one { animation-delay: 0.1s; } .two { animation-delay: 0.3s; } .three { animation-delay: 0.5s; } .four { animation-delay: 2.5s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.fadeIn { animation-name: fadeIn; }
@keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 100%, 0); } to { opacity: 1; transform: none; } }
.fadeInUp { animation-name: fadeInUp; }
@media (prefers-reduced-motion: reduce) { .animate { animation: none !important; } .text-increase:hover, .text-increase-a:hover, .btn-title:hover { transform: none; } }
```

## Стили виджетов (props)

### 1 · Показатели

#### Плитка KPI — ElemMultiKpi

```text
cssStyle:            background: #F2F5F9; border-radius: 8px; border-top: 3px solid <#2A78D6 | #184F95 | #138A5E | #EB6834 | #C4441A | #6250D6>; padding: 0.55rem 0.9rem
positionMetric:      start
colorMetric:         #14171C · sizeMetric: 1.6rem · metricFontWeight: 700
colorTitle:          #52514E · sizeTitle: 0.8rem · titleFontWeight: 600
postfixColor:        #52514E · postfixFontSize: 0.85rem · postFix: "руб." / "экз."
metricFormat:        1|c|/d (суммы) · 0||/d (количества)
showHint: true · bgColorTooltipHint: #F2F5F9 · colorHintText: #14171C · colorHint: #184F95
benchmarkIconRules:  GT → arrow-up-thin #138A5E · LT → arrow-down-thin #C4441A
conditionBenchStyle: GT → color: #138A5E;  LT → color: #C4441A;
backgroundGradColor1/2: transparent · showNumberAnimation: true · fontMetric: не задавать
```

#### Спидометр — ElemGaugeDremio

```text
cssStyle: max-height: 130px · fitHeight true · showLegend false
percentColor #14171C · percentFormat 0 · percentPosition center
levels[0]: limitColor #EB6834 · valueColor #14171C · limitWidth 1 · valueWidth 1 · format percent · showLimit true
           nameLimit «Годовой план» · nameValue «Факт»
```

### 2 · Кнопки

#### Шаблон: круглые кнопки — ElemFiltersDremio (по одному на кнопку)

```text
cssClass:      ["text-increase-a"]
hoverColor:    #184F95
buttonsArray:  [{ "title": "", "url": "<адрес>", "icon": "home" }]   · book-open-page-variant · information-variant · account-arrow-right (url /logout)
fontOptions:
.btn-new { display: inline-flex; justify-content: center; align-items: center; width: 2.1rem; height: 2.1rem; border-radius: 50%;
  font-size: 1.15rem; line-height: 1; color: #184F95; background: #E4F0FC; border: 0; transition: background 0.15s ease, color 0.15s ease; }
.btn-new:hover { background: #184F95; color: #FFFFFF; }
```

#### Шаблон: вкладки страниц — ElemFiltersDremio внутри ElemButton

```text
fontOptions:          height: 2.4rem; padding: 0 1rem; border-radius: 6px 6px 0 0; display: flex; align-items: center; font-size: 0.9rem; margin-right: 4px; box-sizing: border-box;
activeButtonStyle:    background: #F2F5F9; color: #184F95; font-weight: 600; border: 1px solid #E3E2DD; border-bottom: 0; box-shadow: inset 0 3px 0 #184F95;
disabledButtonStyle:  background: transparent; color: #52514E; border: 0;
marginBetweenButtons: 0
```

#### Чипы (дивизионы, годы) — ElemFiltersDremio по измерению

```text
fontOptions:          height: 1.9rem; border-radius: 999px; display: flex; align-items: center; font-size: 0.8rem; padding: 0 0.8rem; margin-right: 6px; box-sizing: border-box; white-space: nowrap;
activeButtonStyle:    background: #184F95; color: #FFFFFF; font-weight: 600; border: 0;
disabledButtonStyle:  background: #E4F0FC; color: #184F95; border: 0;
```

#### Кнопка «Сбросить» — ElemFiltersDremio внутри ElemButton (filters: все измерения → null)

```text
buttonsArray: [{ "title": "Сбросить", "icon": "window-close" }]
fontOptions:  height: 1.9rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; padding: 0 0.8rem; background: #FFFFFF; color: #14171C; border: 1px solid #E3E2DD; box-sizing: border-box;
```

#### Выгрузка — ElemFiltersDremio внутри ElemReport

```text
cssClass: ["icon"] · buttonsArray: [{ "icon": "download" }] · hoverColor: #184F95
fontOptions: как у круглых кнопок шапки (2.1rem, #E4F0FC / #184F95)
```

#### Снимок экрана — basic::ElemScreenshoter

```text
menuItems: jpeg (file-jpg-box), pdf (file-pdf-box) · webp и png скрыты
menuButton.defaultStyle: title { color: #184F95; fontWeight: 600 }, icon { size: 1.6rem; color: #184F95 }
menuButton.activeStyle:  title { color: #2A78D6; fontWeight: 600 }, icon { size: 1.6rem; color: #2A78D6 }
```

### 3 · Бейджи и 4 · Теги

#### Бейдж — ElemBadge

```text
borderRadius 0.5rem со всех сторон · fontSettings: 0.7rem, 600
пастельные: customBgColor { isColorStepEnabled: true, colorsByOrder: ["#BAF3DB","#CAE5FF","#FFE2BD","#FFD2CC","#DFD8FD","#D3F1A7","#F8E6A0","#FDD0EC","#C1F0F5"] }, текст #14171C
метка раздела: customBgColor #E4F0FC, текст #184F95
```

#### Облако тегов — ElemTagCloudDremio

```text
clouds[0]: color #E4F0FC · textColor #184F95 · isColorCloud false · isCloudOctotorp false
```

### 5 · Таблицы

#### Таблица — ElemTable / ElemHeader / ElemRow / ElemValue / ElemPaginator

```text
ElemTable    cssStyle: background: #FFFFFF; border-radius: 8px; box-shadow: 0 0 0 1px #E3E2DD
ElemHeader   cssStyle padding: 0.375rem · cssClass d-flex (числа — d-flex flex-h-end)
             header: fontSize var(--font-size-smaller), color #52514E, sort.icon.color #184F95
ElemRow      style.hover:  bgColor #E4F0FC, fontWeight 600 · style.select: bgColor #E4F0FC, fontWeight 600
             border: isDisplayed true, color #E3E2DD
ElemValue    cssStyle padding: 0.375rem · style: fontSize 0.8rem, fontWeight 400, color #14171C
             вторая строка: fontSize 0.7rem, color #52514E · числа: cssClass text-right, numberFormat 0||/d
             отклонение > 0 (styleConditions): background #FCE9E2; color #C4441A; border-radius 4px; padding 0.1rem 0.35rem
ElemPaginator style: fontSize var(--font-size-smaller), color #184F95, bgColor #F7F8F9,
             colorActive #FFFFFF, bgColorActive #184F95
```

### 6 · Круговые и кольцевые

#### Кольцо и круговая — ElemPieChartDremio

```text
кольцо большое:      metrics.chart.outsideRadius 120px · insideRadius 80px
кольцо компактное:   metrics.chart.outsideRadius 80px · insideRadius 60px
круговая:            metrics.chart.type pie (без insideRadius)
центр (metrics.sum): show true · namePosition bottom · textAlign center · pattern 1|c| руб./d (кол-во — 0|c| шт./d)
                     color #14171C · fontSize 1rem · nameColor #14171C · nameFontSize 0.8rem
подписи (label):     pattern 1|c|/d или 0|%|/d · value.fontSize 12 · dimension.fontSize 12
itemStyle:           borderWidth 0
tooltip:             pattern 1|c| руб./d · fontSize 14
legend:              color #52514E · fontSize 0.8rem · breakLongValues false · legendManualSize left 60%, top 5%, right 5%, bottom 5%
dimensionSort:       asc
indexColors:         ["#2A78D6","#EB6834","#1BAF7A","#EDA100","#E87BA4","#6250D6","#E34948","#184F95","#52514E","#9EC5F4"]
colorSet (пример):   Отгружено #2A78D6 · В заказе #EB6834 · В накладной #6250D6
cssStyle:            background: #FFFFFF; border-radius: 8px; box-shadow: 0 0 0 1px #E3E2DD
```

### 7 · Бары и линейные

#### Столбцы — ElemMultiSpline (type bar)

```text
metricsStyle[]:  type bar · color / colorForBar #2A78D6 (годы: #B7D3F6, #6DA7EC, #2A78D6, #184F95)
                 isRoundedBarBorder true · roundedBarBorder { leftTop 2, rightTop 2, rightBottom 0, leftBottom 0 } · barMaxWidth 20
                 label: show true · position top (горизонтальные — right) · color #14171C · fontSize 0.8rem
axis (категория): axisLabel.color #52514E · valueFontSize 0.75rem · axisLine #E3E2DD solid
axis (значение):  axisLabel.color #52514E · splitLine { show true, color #DCDFE4, type dashed }
tooltip:          trigger axis · separator 1
legend:           show true · position bottom · icon circle · textStyle.fontSize 0.8rem
mainTitle.show:   false (заголовок — в ElemText блока)
cssStyle:         background: #FFFFFF; border-radius: 8px; box-shadow: 0 0 0 1px #E3E2DD
горизонтальные:   ось Y — category, ось X — value (axisLabel.show false) · grid.isManualMode true, left 24–40%
```

#### Накопительные столбцы — ElemMultiSpline (customType stacked)

```text
metricsStyle[]:  type bar · customType stacked · roundedBarBorder 10 со всех сторон · barGap 0rem
                 customColors: действующий #1BAF7A · к увольнению #EB6834 · уволен #C4441A · декрет #2A78D6
                 label: show true · position inside · color #FFFFFF · fontSize 0.75rem · isZeroValueShown false
axis:            axisLabel.show false · splitLine.show false
legend:          position bottom · icon circle · textStyle.fontSize 0.8rem
```

#### Линии — ElemMultiSpline (type line)

```text
metricsStyle[]:  type line · lineStyle { type solid, width 2 } · smooth true · symbol emptyCircle · symbolSize 8
                 цвета: #B7D3F6 (2023), #6DA7EC (2024), #2A78D6 (2025), #184F95 (2026)
                 текущий год: fillLine true · areaStyle.color linear rgba(24, 79, 149, 0.10) → rgba(24, 79, 149, 0.10)
                 label.show false
оси, сетка, легенда, tooltip — как у столбцов
```

### 8 · Прогресс-бары

#### Полоса прогресса — ElemProgressBar

```text
barHeight 1rem · barRadius 1rem · fact.gradient: { isEnabled: true, colorStops: ["#184F95", "#184F95"] }
fact.value / plan.value: color #14171C, fontSize 0.8rem, position top, format 1|c| руб./d
fact.name «Факт», plan.name «План»: color #14171C, fontSize 0.8rem
```

### Шаблон, блоки, фильтры

#### Шаблон: логотип — ElemImage

```text
avatarMode: { isEnabled: true, size: "60px" }
```

#### Шаблон: рубрика и заголовок — ElemText

```text
cssStyle: padding: 0.25rem 0.5rem
html:     <div class="sp-kicker">Аналитическая панель · продажи</div><h2 class="sp-title">Продажи по регионам</h2>
```

#### Блок — ElemGridLayout + ElemText

```text
cssStyle: background: #F2F5F9; border-radius: 8px; padding: 0.75rem; align-content: start
html:     <div class="sp-blk"><span class="sp-num">1</span>Заголовок блока</div>
```

#### Выпадающий фильтр — ElemFilter

```text
cssStyle:          border-radius: 999px; min-width: 170px; max-width: 240px; background: #FFFFFF; box-shadow: 0 0 0 1px #E3E2DD
widgetColor:       #FFFFFF · backlight: #184F95 · iconFontSize: 1.2rem
borderRadius:      999px со всех сторон
placeholderStyles: fontSize 14px, color #14171C · dimensionsStyles: fontSize 14px
btnCommon:         fontSize 13px, fontFamily inherit
btnClear:          background #EB6834, color #14171C, без рамки
btnDo, btnSelectAll: background #138A5E, color #14171C, без рамки · btnCancel: скрыт
optionHover:       color #184F95, background #E4F0FC
```

#### Поиск — ElemStandardFilter

```text
borderRadius 999px · widgetColor #FFFFFF · inputBackgroundColor #FFFFFF · backlight #184F95
inputColor #14171C · placeHolderColor #626262 · shadow: 0 1px 6px rgba(17, 133, 179, 0.08), 0 0 0 1px #E3E2DD · searchFontSize 0.8rem
```

