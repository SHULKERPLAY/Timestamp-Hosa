![Акари <3](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/TimestampHosa.png)
> Readme is also available in [Russian](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ru.md), [Japanese](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-jp.md), [French](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-fr.md), [Deutsch](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-de.md) and [Korean](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ko.md) Languages

### Хотите помочь с переводом? Создайте новое обращение в [issues](https://github.com/SHULKERPLAY/Timestamp-Hosa/issues) где вы можете указать в каком месте нужно исправить перевод и какой именно перевод там должен быть, или с запросом на перевод на конкретный язык. Вы также можете создавать [Pull Request](https://github.com/SHULKERPLAY/Timestamp-Hosa/pulls) с правками или с новым языком - все локализации доступны в [locales.json](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/bot/locales.json).

[Посмотрите подробности](https://lunarcreators.ru/timestamp-hosa/) или [установите бота на любой свой сервер Discord или на свой аккаунт из магазина приложений](https://discord.com/discovery/applications/1449839745910964254)! *Бота также можно [установить на Discord сервер напрямую](https://discord.com/oauth2/authorize?client_id=1449839745910964254&permissions=277025410048&integration_type=0&scope=bot)*. Оригинальный бот: `Timestamp 補佐#1785`

# Timestamp 補佐 - Discord Бот
[![CodeFactor](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/badge/main)](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/overview/main) ![GitHub Release](https://img.shields.io/github/v/release/shulkerplay/timestamp-hosa) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/shulkerplay/timestamp-hosa) ![Discord](https://img.shields.io/discord/683814496942424078?label=Discord) ![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCWoypHEOaTh6N9zwCtRzr0w) ![Website](https://img.shields.io/website?url=https%3A%2F%2Flunarcreators.ru&link=https%3A%2F%2Flunarcreators.ru)
![Bot Uptime (30 days)](https://img.shields.io/uptimerobot/ratio/m797417008-25ccd350ca5e2f9624767928?link=m797417008-25ccd350ca5e2f9624767928)

**Создавайте метки времени для встраивания в сообщения, используйте калькулятор дат и многое другое не выходя из Discord!**  

Timestamp 補佐 - это Discord Бот / Приложение для профиля, позволяющее создавать любые временные метки для встройки в ваше сообщение, использовать калькулятор дат, считать количество времени прошедшего с одной даты до другой, а также конвертер дат из UNIX формата в читаемый формат и наоборот! На данный момент поддерживает 11 языков: Немецкий `de`, Польский `pl`, Французкий `fr`, Японский `ja`, Португальский (Бразильский) `pt-BR`, Корейский `ko`, Болгарский `bg`, Шведский `sv-SE`, Украинский `uk`

## Команды
- К некоторым командам доступен аргумент `publicreply: true / false`. Если `True`, то ответ от бота увидят все в чате, а не только вы. 

- К некоторым командам доступен аргумент `timezone`. В зависимости от часового пояса, который вы выберете, ответ бота будет отклоняться по времени к вашему выбору

- К командам, которые выводят метку времени, доступен аргумент `style`. Он позволяет выбрать в каком формате будет дата и время которую вы хотите увидеть на метке времени

 - `/now` - Выводит текущую дату и метку времени для вставки. Аргументы: `style`,`publicreply`

 - `/timestamp` - Создаёт метку времени для вставки на основе вами указанной даты. Аргументы: `year`, `month`, `day`, `hour`, `minute`, `second`, `timezone`, `style`, `publicreply`,

![timestamp](https://lunarcreators.ru/wp-content/uploads/2025/12/timestampcmd.gif)

 - `/timezone` - подфункции `gmtplus [timezone]` - Для GMT - GMT +14,  `gmtminus [timezone]`- для GMT - GMT -12,  `keyzones [timezone]` - для других поясов (PST, CET и т.д.). Выводит текущее время в выбранном часовом поясе

![timezone](https://lunarcreators.ru/wp-content/uploads/2025/12/timezonecmd.gif)

 - `/convert` - Конвертирует время
    - `todate` - Конвертирует метку времени UNIX в читаемую человеческую дату/время. Аргументы: `unixtime` - Для вставки UNIX времени, `withms` - Для выбора формата UNIX времени, `true` - в миллисекундах от 1.1.1970, `false` - В секундах от 1.1.1970
    - `tounix` - Конвертирует указанную вами дату в метку времени UNIX. Аргументы: `year` - Год конвертируемой даты, `month` - Месяц конвертируемой даты, `day` - День конвертируемой даты, `displayms` - Будет ли вывод результата `true` - В миллисекундах от 1.1.1970, `false` - в скунднах от 1.1.1970, `hour` - час конвертируемой даты, `minute` - минута конвертируемой даты, `second` - секунда конвертируемой даты, `millisecond` - Миллисекунда конвертируемой даты, `timezone` - Часовой пояс указанной вами даты

-  `/calc` - подфункции `fromnow`, `fromdate` и `from-to` - для рассчётов с произвольными датами
   - `fromnow` создан чтобы прибавить или отнять определённое время от текущей даты и времени.
      - `timezone` - выбор часового пояса для вывода
      - `matharg` - Решает прибавить или отнять вписанное далее время
      - `years`, `months`, `days`, `hours`, `minutes`, `seconds`, `milliseconds` - количество времени которое нужно прибавить или отнять
      
      ![fromnow](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrnowcmd.gif)
      
   - `fromdate` создан чтобы прибавить или отнять определённое время от произвольной даты и времени.
      - `timezone` - выбор часового пояса для вывода
      - `matharg` - Решает прибавить или отнять вписанное далее время
      - `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond` - дата от которой нужно будет отнять или прибавить время
      - `years`, `months`, `days`, `hours`, `minutes`, `seconds`, `milliseconds` - количество времени которое нужно прибавить или отнять
   - `from-to` создан чтобы вычислить какое количество времени прошло между двумя датами.
      - `fromyear`, `frommonth`, `fromday`, `fromhour`, `fromminute`, `fromsecond` - Первая дата (От)
      - `toyear`, `tomonth`, `today`, `tohour`, `tominute`, `tosecond` - Вторая дата (До)
      
          ![fromto](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrtocmd.gif)

- `/ping` - Проверка отклика бота

- `/invite` - Пригласить бота на свой сервер или установить к себе на аккаунт для использования в любом месте

- `/about` - Подробная информация о приложении

[Демонстрация и скриншоты](https://lunarcreators.ru/timestamp-hosa)

## Возможные вопросы
### Почему `/timestamp` вывела на час меньше/больше чем я указал?
Например: Вы использовали команду `/timestamp` `year: 2005` `month: Май` `day: 31` `hour: 0` `minute: 0` `second: 0` `timezone: GMT +3 (Moscow, Istanbul, Qatar)`
Но в выводе в ваше время всё равно увидели `31 мая 2005 г. 1:00` вместо `0:00`.

Дело в том, как временные метки преобразовываются на стороне клиента. Discord учитывает данные ОС о переходах с летнего на зимнее время и наоборот, 
поэтому если в вашем часовом поясе были изменения в указанное вами время, то временная метка отразит эти изменения добавив или убавив час. 
Решить можно изменением пояса на +/-1 или сделать час +/-1. Учтите, что люди, живущие в часовых поясах где не было переходов на летнее время - будут видеть корректную дату.

### Почему в команде `/calc` аргументы `months` и `years` отмечены как неточные?
Проблема в том, что все рассчёты проводятся не в календарном формате, а в секундном формате времени UNIX. Реализация не позволяет точно отсчитывать месяцы, так как в них разное количество дней, поэтому взято среднее значение: 30 дней `(2592000000 миллисекунд)`

С `years` неточность сильно меньше чем с `month`. Тут проблема в високосных годах, которые тоже не учитываются в реализации. Так, каждые 4 года отклонения могут убавить лишние 24 часа, так как год считается как 365 дней `(31536000000 миллисекунд)`
# Прочее

 - [Страница проекта на нашем сайте](https://lunarcreators.ru/timestamp-hosa)
 - [Бот Timestamp 補佐 в магазине приложений Discord](https://discord.com/discovery/applications/1449839745910964254)

Буду рад любой поддержке, связаться со мной можно на [нашем сервере Discord](https://discord.gg/e2HcXrQ). `@shulkerplay`