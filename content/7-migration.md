# Переход на единый стиль

Порядок работы: 1) заменить тему на `css/theme.css` из раздела «Стили CSS»; 2) пройти чек-лист ниже; 3) сверить страницу с карточками компонентов.

## Общий чек-лист для любого дашборда

| Было | Стало | Где |
|---|---|---|
| Фон страницы `#EBEEEF`, `rgb(235,238,239)` | `bg` #FFFFFF | ElemRoot, корневые ElemGridLayout |
| Полупрозрачные панели `rgba(246,246,246,0.75)`, радиус 1rem | `tint` #F2F5F9, `radius-md` 8px | инфо-панель, панель фильтров, блоки |
| Акцент `#0085FF` / `#0085ff17` | выбранное — `navy` #184F95; невыбранное — `chip` #E4F0FC | activeButtonStyle, облака тегов, кнопки |
| Заголовок ПРОПИСНЫМИ 2rem/600 `#464646` | рубрика `sp-kicker` + `sp-title` 1.75rem/700 `ink` | ElemText шаблона |
| Плитки с градиентом и белым текстом | плитка `tint` + полоса сверху 3px по смыслу, текст `ink` | ElemMultiKpi |
| Размеры в px (`10px`, `11px`, `12px`, `15px`, `24px`) | шкала в rem (`cell` 0.8rem, `cell-head` 0.75rem, `cell-sub` 0.7rem) | ElemValue, ElemHeader, sizeTitle |
| `fontMetric: Bahnschrift`, `fontFamily: Roboto` | не задавать (шрифт темы) | ElemMultiKpi, графики |
| Граница строк таблицы `#14171C` или `rgba(226,226,226,1)` | `line` #E3E2DD | ElemRow.border.color |
| Наведение строки `#F1F2F4`, выбор `#F7FAFE` | `chip` #E4F0FC + 600 | ElemRow.style.hover / select |
| Пагинатор: активная `#E4F0FC`/`#14171C` или `#2A78D6`/`#F1F2F4` | `navy` #184F95 / белый | ElemPaginator |
| Цвета статусов `#0C1BA5`, `#CE060A`, `rgba(255,198,0,1)` | `navy`, `red`, `amber` | benchmark.iconConditions |
| Отклонение `#FBEAE5` | `bad-bg` #FCE9E2 | styleConditions ячеек |
| Наведение «Сбросить» `#FF0069` | без смены цвета, рамка `line` | hoverColor кнопки сброса |
| Белый текст на `amber` (bi-status-replica) и на `orange` (NEW) | текст `ink` | тема, метки |
