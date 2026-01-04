![Akari <3](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/TimestampHosa.png)
> Le Readme est également disponible en [Russe](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ru.md), [Japonais](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-jp.md), [Anglais](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-en.md), [Deutsch](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-de.md) et [Coréen](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ko.md).

### Vous souhaitez aider pour la traduction ? Créez un nouveau ticket dans [issues](https://github.com/SHULKERPLAY/Timestamp-Hosa/issues) où vous pouvez indiquer où la traduction doit être corrigée et quelle traduction devrait s'y trouver, ou faire une demande de traduction dans une langue spécifique. Vous pouvez également créer des [Pull Request](https://github.com/SHULKERPLAY/Timestamp-Hosa/pulls) avec des corrections ou une nouvelle langue - toutes les localisations sont disponibles dans [locales.json](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/bot/locales.json).

[Consultez les détails](https://lunarcreators.ru/timestamp-hosa/) ou [installez le bot sur n'importe quel serveur Discord ou sur votre compte depuis le magasin d'applications](https://discord.com/discovery/applications/1449839745910964254) ! *Le bot peut également être [installé directement sur un serveur Discord](https://discord.com/oauth2/authorize?client_id=1449839745910964254&permissions=277025410048&integration_type=0&scope=bot)*. Bot original : `Timestamp 補佐#1785`.

# Timestamp 補佐 - Bot Discord
[![CodeFactor](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/badge/main)](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/overview/main) ![GitHub Release](https://img.shields.io/github/v/release/shulkerplay/timestamp-hosa) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/shulkerplay/timestamp-hosa) ![Discord](https://img.shields.io/discord/683814496942424078?label=Discord) ![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCWoypHEOaTh6N9zwCtRzr0w) ![Website](https://img.shields.io/website?url=https%3A%2F%2Flunarcreators.ru&link=https%3A%2F%2Flunarcreators.ru)
![Bot Uptime (30 days)](https://img.shields.io/uptimerobot/ratio/m797417008-25ccd350ca5e2f9624767928?link=m797417008-25ccd350ca5e2f9624767928).

**Créez des horodatages à intégrer dans vos messages, utilisez un calculateur de dates et bien plus encore sans quitter Discord !**.

**Timestamp 補佐** est un bot Discord / une application utilisateur qui vous permet de créer n'importe quel horodatage pour l'intégrer dans vos messages, d'utiliser un calculateur de date, de calculer le temps écoulé d'une date à une autre, de randomiser une date, des dés de jeu ou un nombre entier, et de convertir des dates du format UNIX vers un format lisible et vice versa ! Prend actuellement en charge 11 langues : Русский, Українська, English, Français, Polski, Svenska, Deutsch, 日本語, Português (Brazilian), 한국어, Български.

## Commandes
- Pour certaines commandes, l'argument `publicreply: true / false` est disponible. Si `True`, la réponse du bot sera vue par tout le monde dans le chat, pas seulement par vous.
- Pour certaines commandes, l'argument `timezone` est disponible. Selon le fuseau horaire que vous choisissez, la réponse du bot sera décalée dans le temps selon votre choix.
- Pour les commandes qui affichent un horodatage, l'argument `style` est disponible. Il permet de choisir le format de la date et de l'heure que vous souhaitez voir sur l'horodatage.

 - `/now` - Affiche la date actuelle et l'horodatage à insérer. Arguments : `style`, `publicreply`.
 
 - `/timestamp` - Crée un horodatage à insérer basé sur la date que vous indiquez. Arguments : `year`, `month`, `day`, `hour`, `minute`, `second`, `timezone`, `style`, `publicreply`.
 
 ![timestamp](https://lunarcreators.ru/wp-content/uploads/2025/12/timestampcmd.gif)
 
 - `/timezone` - sous-fonctions `gmtplus [timezone]` (pour GMT +1 à GMT +14), `gmtminus [timezone]` (pour GMT -1 à GMT -12), `keyzones [timezone]` (pour d'autres fuseaux comme PST, CET, etc.). Affiche l'heure actuelle dans le fuseau horaire choisi.
 
 ![timezone](https://lunarcreators.ru/wp-content/uploads/2025/12/timezonecmd.gif)
 
 - `/convert` - Convertit le temps :
    - `todate` - Convertit un horodatage UNIX en une date/heure lisible. Arguments : `unixtime` (pour insérer le temps UNIX), `withms` (pour choisir le format UNIX, `true` en millisecondes depuis le 01.01.1970, `false` en secondes).
    - `tounix` - Convertit la date indiquée en horodatage UNIX. Arguments : `year`, `month`, `day`, `displayms` (`true` pour millisecondes, `false` pour secondes), `hour`, `minute`, `second`, `millisecond`, `timezone`.

- `/random` - sous-fonctions `integer`, `date` et `dice` - pour générer des valeurs aléatoires
   - `integer` - conçu pour générer n'importe quel nombre aléatoire à partir d'une plage
      - `min`, `max` - définit la valeur minimale et maximale possible
   - `date` - conçu pour générer n'importe quelle date aléatoire à partir d'une plage
      - `fromyear`, `frommonth`, `fromday`, `fromhour`, `fromminute`, `fromsecond` - Date minimale possible
      - `toyear`, `tomonth`, `today`, `tohour`, `tominute`, `tosecond` - Date maximale possible
   - `dice` - conçu pour simuler un lancer de dés de jeu (Par défaut : D6)
      - `dicetype` - permet de choisir le type de dé parmi les standards - D4, D6, D8, D10, D12, D20, D100

-  `/calc` - sous-fonctions `fromnow`, `fromdate` et `from-to` pour les calculs avec des dates arbitraires :
   - `fromnow` est conçu pour ajouter ou soustraire un certain temps à la date et l'heure actuelles. Arguments : `timezone`, `matharg` (ajouter ou soustraire), `years`, `months`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`.
   
   ![fromnow](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrnowcmd.gif)
   
   - `fromdate` est conçu pour ajouter ou soustraire un certain temps à une date et heure arbitraires. Arguments : `timezone`, `matharg`, les composants de la date initiale (`year`, `month`, etc.) et le temps à ajouter/soustraire (`years`, `months`, etc.).
   - `from-to` est conçu pour calculer la quantité de temps écoulée entre deux dates. Arguments : `fromyear`, `frommonth`, `fromday`, `fromhour`, `fromminute`, `fromsecond` (Date de début) et `toyear`, `tomonth`, `today`, `tohour`, `tominute`, `tosecond` (Date de fin).
   
       ![fromto](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrtocmd.gif)

- `/ping` - Vérification de la latence du bot.

- `/invite` - Inviter le bot sur votre serveur ou l'installer sur votre compte pour une utilisation partout.

- `/about` - Informations détaillées sur l'application.

## Questions possibles
### Pourquoi `/timestamp` a-t-il affiché une heure de plus/moins que ce que j'ai indiqué ?
C'est dû à la façon dont les horodatages sont convertis côté client. Discord prend en compte les données de l'OS sur le passage à l'heure d'été/hiver. Si votre fuseau horaire a subi des changements à l'heure indiquée, l'horodatage reflétera ces changements. Solution : modifier le fuseau de +/-1 ou l'heure de +/-1.

### Pourquoi dans la commande `/calc`, les arguments `months` et `years` sont-ils marqués comme imprécis ?
Le problème est que tous les calculs sont effectués en format de secondes UNIX et non en format calendaire. L'implémentation ne permet pas de compter précisément les mois (longueur variable), donc une moyenne de 30 jours est utilisée (**2 592 000 000 ms**). Pour `years`, les années bissextiles ne sont pas prises en compte (année de 365 jours soit **31 536 000 000 ms**).

# Divers
 - [Page du projet sur notre site](https://lunarcreators.ru/timestamp-hosa)
 - [Bot Timestamp 補佐 sur le magasin d'applications Discord](https://discord.com/discovery/applications/1449839745910964254)

Je serais ravi de tout soutien, vous pouvez me contacter sur [notre serveur Discord](https://discord.gg/e2HcXrQ). `@shulkerplay`.