![Akari <3](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/TimestampHosa.png)
> Readme ist auch in den Sprachen [Russisch](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ru.md), [Japanisch](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-jp.md), [Französisch](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-fr.md), [Englisch](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-en.md) und [Koreanisch](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ko.md) verfügbar.

### Möchten Sie bei der Übersetzung helfen? Erstellen Sie eine neue Anfrage unter [issues](https://github.com/SHULKERPLAY/Timestamp-Hosa/issues), in der Sie angeben können, wo die Übersetzung korrigiert werden muss und wie sie lauten sollte, oder fordern Sie eine Übersetzung in eine bestimmte Sprache an. Sie können auch [Pull Requests](https://github.com/SHULKERPLAY/Timestamp-Hosa/pulls) mit Korrekturen oder einer neuen Sprache erstellen – alle Lokalisierungen sind in [locales.json](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/bot/locales.json) verfügbar.

[Details ansehen](https://lunarcreators.ru/timestamp-hosa/) oder [installieren Sie den Bot auf einem beliebigen Discord-Server oder in Ihrem Konto über das App-Verzeichnis](https://discord.com/discovery/applications/1449839745910964254)! *Der Bot kann auch [direkt auf einem Discord-Server installiert werden](https://discord.com/oauth2/authorize?client_id=1449839745910964254&permissions=277025410048&integration_type=0&scope=bot)*. Originaler Bot: `Timestamp 補佐#1785`.

# Timestamp 補佐 - Discord Bot
[![CodeFactor](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/badge/main)](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/overview/main) ![GitHub Release](https://img.shields.io/github/v/release/shulkerplay/timestamp-hosa) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/shulkerplay/timestamp-hosa) ![Discord](https://img.shields.io/discord/683814496942424078?label=Discord) ![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCWoypHEOaTh6N9zwCtRzr0w) ![Website](https://img.shields.io/website?url=https%3A%2F%2Flunarcreators.ru&link=https%3A%2F%2Flunarcreators.ru)
![Bot Uptime (30 days)](https://img.shields.io/uptimerobot/ratio/m797417008-25ccd350ca5e2f9624767928?link=m797417008-25ccd350ca5e2f9624767928).

**Erstellen Sie Zeitstempel zum Einbetten in Nachrichten, nutzen Sie einen Datumsrechner und vieles mehr, ohne Discord zu verlassen!**.

Timestamp 補佐 ist ein Discord Bot / eine Profil-App, mit der Sie beliebige Zeitstempel zum Einbetten in Ihre Nachrichten erstellen, einen Datumsrechner verwenden, die vergangene Zeit zwischen zwei Daten berechnen sowie Daten vom UNIX-Format in ein lesbares Format und umgekehrt konvertieren können! Derzeit werden 11 Sprachen unterstützt: Deutsch `de`, Polnisch `pl`, Französisch `fr`, Japanisch `ja`, Portugiesisch (Brasilien) `pt-BR`, Koreanisch `ko`, Bulgarisch `bg`, Schwedisch `sv-SE`, Ukrainisch `uk`.

## Befehle
- Bei einigen Befehlen ist das Argument `publicreply: true / false` verfügbar. Wenn `True`, sehen alle im Chat die Antwort des Bots, nicht nur Sie.
- Bei einigen Befehlen ist das Argument `timezone` verfügbar. Je nach gewählter Zeitzone wird die Antwort des Bots entsprechend verschoben.
- Bei Befehlen, die einen Zeitstempel ausgeben, ist das Argument `style` verfügbar. Damit können Sie das Format von Datum und Uhrzeit für den Zeitstempel wählen.

 - `/now` - Gibt das aktuelle Datum und den Zeitstempel zum Einfügen aus. Argumente: `style`, `publicreply`.
 
 - `/timestamp` - Erstellt einen Zeitstempel zum Einfügen basierend auf dem von Ihnen angegebenen Datum. Argumente: `year`, `month`, `day`, `hour`, `minute`, `second`, `timezone`, `style`, `publicreply`.
 
 ![timestamp](https://lunarcreators.ru/wp-content/uploads/2025/12/timestampcmd.gif)
 
 - `/timezone` - Unterfunktionen `gmtplus [timezone]` (für GMT +1 bis +14), `gmtminus [timezone]` (für GMT -1 bis -12), `keyzones [timezone]` (für andere Zonen wie PST, CET usw.). Zeigt die aktuelle Zeit in der gewählten Zeitzone an.

![timezone](https://lunarcreators.ru/wp-content/uploads/2025/12/timezonecmd.gif)

 - `/convert` - Konvertiert Zeit:
    - `todate` - Konvertiert einen UNIX-Zeitstempel in ein lesbares Datum/Zeit. Argumente: `unixtime`, `withms` (`true` für Millisekunden seit 1.1.1970, `false` für Sekunden).
    - `tounix` - Konvertiert ein angegebenes Datum in einen UNIX-Zeitstempel. Argumente: `year`, `month`, `day`, `displayms`, `hour`, `minute`, `second`, `millisecond`, `timezone`.

-  `/calc` - Unterfunktionen `fromnow`, `fromdate` und `from-to` für Berechnungen mit beliebigen Daten:
   - `fromnow`: Addiert oder subtrahiert Zeit vom aktuellen Datum. Argumente: `timezone`, `matharg`, `years`, `months`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`.
   
   ![fromnow](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrnowcmd.gif)
   
   - `fromdate`: Addiert oder subtrahiert Zeit von einem beliebigen Datum. Argumente: `timezone`, `matharg`, Datumskomponenten (`year`, `month` etc.) und die zu addierende/subtrahierende Zeit.
   - `from-to`: Berechnet die Zeitspanne zwischen zwei Daten. Argumente: `fromyear` bis `fromsecond` (Start) und `toyear` bis `tosecond` (Ende).
   
       ![fromto](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrtocmd.gif)

- `/ping` - Überprüfung der Bot-Antwortzeit.

- `/invite` - Bot auf Ihren Server einladen oder in Ihrem Konto installieren.

- `/about` - Detaillierte Informationen über die Anwendung.

## Mögliche Fragen
### Warum hat `/timestamp` eine Stunde mehr/weniger ausgegeben als angegeben?
Dies liegt daran, wie Zeitstempel clientseitig umgewandelt werden. Discord berücksichtigt Betriebssystemdaten zu Sommer- und Winterzeitumstellungen. Wenn es in Ihrer Zeitzone zur angegebenen Zeit Änderungen gab, spiegelt der Zeitstempel dies wider. Lösung: Zeitzone oder Stunde um +/-1 anpassen.

### Warum sind in `/calc` die Argumente `months` und `years` als ungenau markiert?
Alle Berechnungen erfolgen im UNIX-Sekundenformat, nicht im Kalenderformat. Da Monate unterschiedlich lang sind, wird ein Durchschnittswert von 30 Tagen verwendet (**2.592.000.000 ms**). Bei `years` werden Schaltjahre nicht berücksichtigt (Jahr = 365 Tage = **31.536.000.000 ms**).

# Sonstiges
 - [Projektseite auf unserer Website](https://lunarcreators.ru/timestamp-hosa)
 - [Timestamp 補佐 im Discord App Directory](https://discord.com/discovery/applications/1449839745910964254)

Ich freue mich über jede Unterstützung! Kontakt über [unseren Discord-Server](https://discord.gg/e2HcXrQ) `@shulkerplay`.