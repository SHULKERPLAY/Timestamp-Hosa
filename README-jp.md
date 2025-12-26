![Akari <3](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/TimestampHosa.png)
> Readmeは [ロシア語](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ru.md), [英語](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-en.md), [フランス語](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-fr.md), [ドイツ語](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-de.md), [韓国語](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ko.md) でも利用可能です

### 翻訳を手伝っていただけますか？修正が必要な箇所や正しい翻訳の内容を [issues](https://github.com/SHULKERPLAY/Timestamp-Hosa/issues) で報告するか、特定の言語への翻訳リクエストを作成してください。また、[Pull Request](https://github.com/SHULKERPLAY/Timestamp-Hosa/pulls) で修正や新しい言語を追加することもできます。すべてのローカライズは [locales.json](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/bot/locales.json) で確認できます。

[詳細を見る](https://lunarcreators.ru/timestamp-hosa/) または [App DirectoryからボットをDiscordサーバーやアカウントにインストール](https://discord.com/discovery/applications/1449839745910964254)してください！ *[Discordサーバーに直接インストール](https://discord.com/oauth2/authorize?client_id=1449839745910964254&permissions=277025410048&integration_type=0&scope=bot)* することも可能です。オリジナルボット: `Timestamp 補佐#1785`

# Timestamp 補佐 - Discord ボット
[![CodeFactor](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/badge/main)](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/overview/main) ![GitHub Release](https://img.shields.io/github/v/release/shulkerplay/timestamp-hosa) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/shulkerplay/timestamp-hosa) ![Discord](https://img.shields.io/discord/683814496942424078?label=Discord) ![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCWoypHEOaTh6N9zwCtRzr0w) ![Website](https://img.shields.io/website?url=https%3A%2F%2Flunarcreators.ru&link=https%3A%2F%2Flunarcreators.ru)
![Bot Uptime (30 days)](https://img.shields.io/uptimerobot/ratio/m797417008-25ccd350ca5e2f9624767928?link=m797417008-25ccd350ca5e2f9624767928)

**メッセージ埋め込み用のタイムスタンプ作成、日付計算機などをDiscord内で完結させましょう！**

Timestamp 補佐は、メッセージ埋め込み用のタイムスタンプ作成、日付計算、2つの日付間の時間経過の算出、UNIX形式と読みやすい形式の相互変換ができるDiscordボット/ユーザーアプリです。現在11言語をサポートしています：ドイツ語、ポーランド語、フランス語、日本語、ポルトガル語（ブラジル）、韓国語、ブルガリア語、スウェーデン語、ウクライナ語。

## コマンド
- 一部のコマンドでは `publicreply: true / false` 引数が利用可能です。`True` にすると、回答が自分だけでなくチャットの全員に表示されます。

- `timezone` 引数を使用すると、選択したタイムゾーンに応じてボットの回答が調整されます。

![timezone](https://lunarcreators.ru/wp-content/uploads/2025/12/timezonecmd.gif)

- `style` 引数を使用すると、タイムスタンプに表示される日時形式を選択できます。

 - `/now` - 現在の日時とコピー用タイムスタンプを表示。引数: `style`, `publicreply`
 
 - `/timestamp` - 指定した日時に基づいてタイムスタンプを作成。引数: `year`, `month`, `day`, `hour`, `minute`, `second`, `timezone`, `style`, `publicreply`
 
 ![timestamp](https://lunarcreators.ru/wp-content/uploads/2025/12/timestampcmd.gif)
 
 - `/timezone` - サブ機能 `gmtplus`, `gmtminus`, `keyzones` (PST, CETなど)。選択した地域の現在時刻を表示。
 
 - `/convert` - 時間変換:
    - `todate` - UNIXタイムスタンプを読みやすい日時に変換。
    - `tounix` - 指定した日時をUNIXタイムスタンプに変換。
    
- `/calc` - `fromnow`（現在から）、`fromdate`（指定日から）、`from-to`（期間計算）のサブコマンド。

    ![fromnow](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrnowcmd.gif)

    ![fromto](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrtocmd.gif)

- `/ping` - ボットの応答速度を確認。

- `/invite` - ボットをサーバーに招待またはアカウントにインストール。

- `/about` - アプリの詳細情報。

## よくある質問
### なぜ `/timestamp` の結果が指定した時間より1時間ずれるのですか？
Discordのタイムスタンプはクライアント側で処理されます。OSのサマータイム設定の影響を受けるため、指定した日時にサマータイムの切り替えがある場合、1時間ずれて表示されることがあります。

### なぜ `/calc` の `months` と `years` は「不正確」とされているのですか？
カレンダー形式ではなくUNIX秒で計算しているためです。1ヶ月を平均30日（**2,592,000,000ミリ秒**）として計算し、1年をうるう年を考慮せず365日（**31,536,000,000ミリ秒**）として計算しています。

# その他
 - [公式ウェブサイトのプロジェクトページ](https://lunarcreators.ru/timestamp-hosa)
 - [Discord App Directory内のボットページ](https://discord.com/discovery/applications/1449839745910964254)

ご支援に感謝します！[Discordサーバー](https://discord.gg/e2HcXrQ) `@shulkerplay` までご連絡ください。