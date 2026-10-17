# Иконки MDI

Иконки Material Design Icons для дашбордов и их значения. Имя пишите без префикса `mdi-` в полях `icon`, `mdiClass`, `iconUp.name`, `iconDown.name`, `benchmarkIconRules[].icon`; в `cssClass` — с префиксом и классом `mdi`: `["mdi", "mdi-check-circle-outline"]`. Значок ● — у иконки есть картинка в группе Icons и карточке IconSet.

Правила:

- Одно значение — одна иконка во всех дашбордах: рост `arrow-up-thin`, падение `arrow-down-thin`, сброс `window-close`, выгрузка `download`, «в работе» `autorenew`, «отменён» `close-circle`, «требует уточнения» `help-circle-outline`, «подписан/выполнено» `check-circle-outline`.
- Цвет — по смыслу, только из токенов: успех `green` #138A5E, ошибка/отмена `red` #C4441A, внимание `orange` #EB6834 или `amber` #EDA100, в работе и в очереди `navy` #184F95, ожидание и стоп `muted` #52514E. Сторонние оттенки #0C1BA5, #CE060A, #FF002D, #EC1846, #FF9800, rgba(255,198,0), rgba(0,35,255), rgba(0,145,255), rgba(0,205,255), #00B9FF и чёрный замените по смыслу.
- Размер: в круглой кнопке 1.15rem, в ячейке 1rem (для статусов `benchmark.size` до 25px), стрелки на плитке 28–30px, меню снимка 1.6rem.
- Иконка статуса — всегда вместе с текстом статуса или подсказкой: цвет в одиночку не различают.

## Шаблон и навигация

| Иконка | Значение |
|---|---|
| `home` ● | Главная — круглая кнопка шапки |
| `book-open-page-variant` ● | Справочники — круглая кнопка шапки |
| `information-variant` ● | Информация — круглая кнопка шапки |
| `account-arrow-right` ● | Выход, url /logout — круглая кнопка шапки |
| `view-grid-outline` ● | Переключатель «Дашборды» |
| `monitor-dashboard` ● | Переключатель «Избранное» |
| `link-variant` ● | Ссылка на источник |
| `account-group` ● | «Наша команда»; иконка плитки «Пользователей» |
| `information-variant-circle-outline` ● | «Подробнее» в строке новости |

## Действия

| Иконка | Значение |
|---|---|
| `download` ● | Выгрузка в Excel (ElemReport) |
| `file-jpg-box` | Снимок JPG (ElemScreenshoter) |
| `file-pdf-box` | Снимок PDF (ElemScreenshoter) |
| `file-png-box` | Снимок PNG (пункт скрыт) |
| `window-close` ● | Кнопка «Сбросить» |
| `magnify` ● | Поиск |
| `filter-menu-outline` ● | Открыть панель фильтров |
| `filter-cog-outline` | Окно настройки фильтров |
| `menu-down-outline` ● | Стрелка выпадающего списка |
| `function` ● | Расчётный показатель |
| `playlist-edit` | Редактирование списка |

## Динамика и показатели

| Иконка | Значение |
|---|---|
| `arrow-up-thin` ● | Больше, чем в сравнении: benchmarkIconRules GT, #138A5E |
| `arrow-down-thin` ● | Меньше: LT, #C4441A |
| `chevron-triple-up` ● | indicatorMetricIcon.iconUp, 30px |
| `chevron-triple-down` ● | indicatorMetricIcon.iconDown, 30px |
| `arrow-split-vertical` ● | Признак «прошёл» (passed_flag = 1) |
| `archive-arrow-up-outline` | Остаток в бенчмарке плитки |
| `arrow-right-bottom` ● | Переход к детализации |
| `circle-multiple` | Есть дубли (count_dubl = 1) |
| `fire` ● | Критические ошибки, доля выше порога |
| `chart-pie` ● | Раздел «Структура» |
| `chart-areaspline` ● | Раздел «Динамика» |
| `table-eye` ● | Раздел «Таблица» |
| `database-outline` ● | Источник данных |
| `eye-outline` ● | Просмотры |
| `account-eye` ● | Просмотры пользователя |

## Статусы — успех (green #138A5E)

| Иконка | Значение |
|---|---|
| `check` ● | Совпадает, «Завершен», разница 0 |
| `check-circle` ● | Доступ есть (YES / true) |
| `check-circle-outline` ● | «Подписан», «Выполнено», значения совпадают |
| `checkbox-marked-circle-outline` | План выполнен (styleConditions, cssClass mdi) |
| `timeline-check` | Получен из АИС |
| `timeline-check-outline` | Отправлен в Мастер-систему / в 1С после корректировки |
| `check-network` | Интеграция: получен из АИС |
| `check-network-outline` | Интеграция: отправлен в Мастер-систему |
| `swap-vertical-bold` | Отправлен в Axapta |
| `bookmark-check-outline` | Тип задачи «Задача» (#2A78D6) |

## Статусы — отмена и ошибка (red #C4441A)

| Иконка | Значение |
|---|---|
| `close` ● | «Отменен», «Расторгнут», «Отменен учреждением/оператором» |
| `close-circle` ● | «Отменен», «отсутствует договор» |
| `close-circle-outline` ● | Задача «Отменена» |
| `close-network` | Ошибка интеграции из АИС |
| `close-network-outline` | Не отправлен в Мастер-систему |
| `timeline-remove` | Ошибка интеграции из АИС |
| `timeline-remove-outline` | Не отправлен в Мастер-систему |
| `alert-circle` ● | «Отсутствует роль», «Требует уточнения» |

## Статусы — внимание (orange #EB6834, amber #EDA100)

| Иконка | Значение |
|---|---|
| `alert` ● | «нет в системе», есть предупреждения |
| `alert-outline` | Задача «Требует доработки» |
| `help-circle-outline` ● | «Требует уточнения», доступ не известен |
| `pencil-circle-outline` | Требуется ручная синхронизация |
| `account-network` | Требуется ручная синхронизация (итог интеграции) |
| `timeline-alert-outline` | Требуется ручная синхронизация (АИС) |
| `plus-circle-outline` | Новая комбинация статусов АИС + Master_System |

## Статусы — в работе и ожидание (navy #184F95, muted #52514E)

| Иконка | Значение |
|---|---|
| `autorenew` ● | «В работе» |
| `clock-alert-outline` | В очереди на отправку в AX |
| `console-network-outline` | В очереди на отправку в Мастер-систему |
| `timeline-clock-outline` | В очереди на отправку в Мастер-систему |
| `progress-clock` ● | Задача «В ожидании» |
| `progress-alert` | Задача «Оценка» |
| `pause-circle-outline` | Задача «На стопе» |
| `account-clock-outline` | Задача «Проверка заказчиком» |
| `account-question-outline` | Задача «На уточнении» |
| `bookmark-multiple-outline` | Тип задачи «Подзадача» |

## Время и люди

| Иконка | Значение |
|---|---|
| `calendar-month` ● | Календарь |
| `calendar-clock` ● | Срок |
| `calendar-check` | Срок соблюдён |
| `calendar-sync` | Регулярное обновление |
| `clock-outline` | Время |
| `clock-time-five-outline` | Время события |
| `account` | Пользователь |
| `account-tie-outline` | Руководитель |
| `account-edit-outline` | Изменил |
| `bookmark-plus-outline` | Добавить в подборку |
| `alert-circle-check` | Проблема решена |
| `alert-circle-outline` ● | Предупреждение |
| `alert-remove-outline` | Предупреждение снято |

## Маркеры

| Иконка | Значение |
|---|---|
| `circle` ● | Маркер легенды графика (legend.icon) |
| `circle-medium` ● | Маркер пункта списка |
