![Akari <3](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/TimestampHosa.png)
> Readme is also available in [Russian](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ru.md), [Japanese](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-jp.md), [French](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-fr.md), [Deutsch](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-de.md) and [Korean](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ko.md) Languages

### Want to help with translation? Create a new [issue](https://github.com/SHULKERPLAY/Timestamp-Hosa/issues) where you can specify where the translation needs fixing and what it should be, or request a translation into a specific language. You can also create a [Pull Request](https://github.com/SHULKERPLAY/Timestamp-Hosa/pulls) with fixes or a new language - all localizations are available in [locales.json](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/bot/locales.json).

[See details](https://lunarcreators.ru/timestamp-hosa/) or [install the bot to any of your Discord servers or your account from the App Directory](https://discord.com/discovery/applications/1449839745910964254)! *The bot can also be [installed directly to a Discord server](https://discord.com/oauth2/authorize?client_id=1449839745910964254&permissions=277025410048&integration_type=0&scope=bot)*. Original bot: `Timestamp 補佐#1785`

# Timestamp 補佐 - Discord Bot
[![CodeFactor](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/badge/main)](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/overview/main) ![GitHub Release](https://img.shields.io/github/v/release/shulkerplay/timestamp-hosa) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/shulkerplay/timestamp-hosa) ![Discord](https://img.shields.io/discord/683814496942424078?label=Discord) ![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCWoypHEOaTh6N9zwCtRzr0w) ![Website](https://img.shields.io/website?url=https%3A%2F%2Flunarcreators.ru&link=https%3A%2F%2Flunarcreators.ru)
![Bot Uptime (30 days)](https://img.shields.io/uptimerobot/ratio/m797417008-25ccd350ca5e2f9624767928?link=m797417008-25ccd350ca5e2f9624767928)

**Create timestamps for embedding in messages, use a date calculator, and more without leaving Discord!**

**Timestamp 補佐** is a Discord Bot / User App that allows you to create any timestamps for embedding in your messages, use a date calculator, calculate the time elapsed from one date to another, randomize date, game dice or integer, and convert dates from UNIX format to a readable format and vice versa! Currently supports 11 languages: Русский, Українська, English, Français, Polski, Svenska, Deutsch, 日本語, Português (Brazilian), 한국어, Български.

## Commands
- For some commands, the `publicreply: true / false` argument is available. If `True`, the bot's response will be seen by everyone in the chat, not just you.

- For some commands, the `timezone` argument is available. Depending on the time zone you choose, the bot's response will shift according to your selection.

- For commands that output a timestamp, the `style` argument is available. It allows you to choose the format of the date and time for the timestamp.

 - `/now` - Displays the current date and a timestamp for pasting. Arguments: `style`, `publicreply`.
 
 - `/timestamp` - Creates a timestamp based on a date you specify. Arguments: `year`, `month`, `day`, `hour`, `minute`, `second`, `timezone`, `style`, `publicreply`.
 
 ![timestamp](https://lunarcreators.ru/wp-content/uploads/2025/12/timestampcmd.gif)
 
 - `/timezone` - sub-functions `gmtplus [timezone]` (for GMT +1 to +14), `gmtminus [timezone]` (for GMT -1 to -12), `keyzones [timezone]` (for other zones like PST, CET, etc.). Displays current time in the selected time zone.
 
 ![timezone](https://lunarcreators.ru/wp-content/uploads/2025/12/timezonecmd.gif)
 
 - `/convert` - Time conversion:
    - `todate` - Converts a UNIX timestamp to a readable date/time. Arguments: `unixtime`, `withms` (choose format: `true` for ms, `false` for seconds from 1.1.1970).
    - `tounix` - Converts a date into a UNIX timestamp. Arguments: `year`, `month`, `day`, `displayms`, `hour`, `minute`, `second`, `millisecond`, `timezone`.

- `/random` - sub-functions `integer`, `date`, and `dice` - for generating random values
   - `integer` - designed to generate any random number from a range
      - `min`, `max` - defines the minimum and maximum possible value
   - `date` - designed to generate any random date from a range
      - `fromyear`, `frommonth`, `fromday`, `fromhour`, `fromminute`, `fromsecond` - Minimum possible date
      - `toyear`, `tomonth`, `today`, `tohour`, `tominute`, `tosecond` - Maximum possible date
   - `dice` - designed to simulate a roll of game dice (Default: D6)
      - `dicetype` - allows you to choose the dice type from standard ones - D4, D6, D8, D10, D12, D20, D100

- `/calc` - sub-functions `fromnow`, `fromdate`, and `from-to` for calculations with arbitrary dates:
   - `fromnow`: add/subtract time from the current date.
   
   ![fromnow](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrnowcmd.gif)
   
   - `fromdate`: add/subtract time from a specific date.
   - `from-to`: calculate the time elapsed between two dates.
   
    ![fromto](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrtocmd.gif)

- `/ping` - Check bot latency.

- `/invite` - Invite the bot to your server or install it to your account.

- `/about` - Detailed information about the application.

## Possible Questions
### Why did `/timestamp` output an hour more/less than I specified?
Discord handles timestamps on the client side. It takes into account OS data regarding Daylight Saving Time transitions. If there were changes in your time zone at the specified time, the timestamp will reflect this by adding or subtracting an hour.

### Why are the `months` and `years` arguments in `/calc` marked as inaccurate?
Calculations are performed in UNIX seconds, not a calendar format. Since months vary in length, an average value of 30 days (**2,592,000,000 ms**) is used. For `years`, leap years are not accounted for; a year is calculated as 365 days (**31,536,000,000 ms**).

# Other
 - [Project page on our website](https://lunarcreators.ru/timestamp-hosa)
 - [Timestamp 補佐 in the Discord App Directory](https://discord.com/discovery/applications/1449839745910964254)

I appreciate any support! You can contact me on [our Discord server](https://discord.gg/e2HcXrQ) `@shulkerplay`.