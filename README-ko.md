![아카리 <3](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/TimestampHosa.png)
> Readme는 [러시아어](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-ru.md), [일본어](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-jp.md), [프랑스어](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-fr.md), [독일어](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-de.md) 및 [영어](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/README-en.md)로도 제공됩니다.

### 번역을 도와주고 싶으신가요? [issues](https://github.com/SHULKERPLAY/Timestamp-Hosa/issues)에 새로운 이슈를 생성하여 번역 수정이 필요한 위치와 정확한 번역 내용을 지정하거나, 특정 언어로의 번역을 요청할 수 있습니다. 또한 수정한 내용이나 새로운 언어로 [Pull Request](https://github.com/SHULKERPLAY/Timestamp-Hosa/pulls)를 생성할 수 있습니다 - 모든 로컬라이제이션은 [locales.json](https://github.com/SHULKERPLAY/Timestamp-Hosa/blob/main/bot/locales.json)에서 확인할 수 있습니다.

[상세 정보 보기](https://lunarcreators.ru/timestamp-hosa/) 또는 [앱 디렉토리에서 디스코드 서버나 계정에 봇을 설치하세요](https://discord.com/discovery/applications/1449839745910964254)! *봇을 [디스코드 서버에 직접 설치](https://discord.com/oauth2/authorize?client_id=1449839745910964254&permissions=277025410048&integration_type=0&scope=bot)*할 수도 있습니다. 오리지널 봇: `Timestamp 補佐#1785`.

# Timestamp 補佐 - 디스코드 봇
[![CodeFactor](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/badge/main)](https://www.codefactor.io/repository/github/shulkerplay/timestamp-hosa/overview/main) ![GitHub Release](https://img.shields.io/github/v/release/shulkerplay/timestamp-hosa) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/shulkerplay/timestamp-hosa) ![Discord](https://img.shields.io/discord/683814496942424078?label=Discord) ![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCWoypHEOaTh6N9zwCtRzr0w) ![Website](https://img.shields.io/website?url=https%3A%2F%2Flunarcreators.ru&link=https%3A%2F%2Flunarcreators.ru)
![Bot Uptime (30 days)](https://img.shields.io/uptimerobot/ratio/m797417008-25ccd350ca5e2f9624767928?link=m797417008-25ccd350ca5e2f9624767928).

**디스코드를 떠나지 않고 메시지용 타임스탬프 생성, 날짜 계산기 등을 사용해 보세요!**.

Timestamp 補佐는 메시지에 삽입할 타임스탬프 생성, 날짜 계산기 사용, 두 날짜 사이의 경과 시간 계산, UNIX 형식에서 읽기 쉬운 형식으로(또는 그 반대로) 날짜 변환 기능을 제공하는 디스코드 봇/프로필 앱입니다! 현재 11개 언어를 지원합니다: 독일어 `de`, 폴란드어 `pl`, 프랑스어 `fr`, 일본어 `ja`, 포르투갈어(브라질) `pt-BR`, 한국어 `ko`, 불가리아어 `bg`, 스웨덴어 `sv-SE`, 우크라이나어 `uk`.

## 명령어
- 일부 명령어에는 `publicreply: true / false` 인수를 사용할 수 있습니다. `True`인 경우 본인뿐만 아니라 채팅의 모든 사람이 봇의 응답을 볼 수 있습니다.
- 일부 명령어에는 `timezone` 인수를 사용할 수 있습니다. 선택한 시간대에 따라 봇의 응답 시간이 조정됩니다.
- 타임스탬프를 출력하는 명령어에는 `style` 인수를 사용할 수 있어 원하는 날짜 및 시간 형식을 선택할 수 있습니다.

 - `/now` - 현재 날짜와 삽입용 타임스탬프를 출력합니다. 인수: `style`, `publicreply`.

 - `/timestamp` - 지정한 날짜를 바탕으로 삽입용 타임스탬프를 생성합니다. 인수: `year`, `month`, `day`, `hour`, `minute`, `second`, `timezone`, `style`, `publicreply`.
 
 ![timestamp](https://lunarcreators.ru/wp-content/uploads/2025/12/timestampcmd.gif)
 
 - `/timezone` - 하위 기능: `gmtplus [timezone]` (GMT +1 ~ +14), `gmtminus [timezone]` (GMT -1 ~ -12), `keyzones [timezone]` (PST, CET 등 기타 시간대). 선택한 시간대의 현재 시간을 출력합니다.
 
 ![timezone](https://lunarcreators.ru/wp-content/uploads/2025/12/timezonecmd.gif)

 - `/convert` - 시간 변환:
    - `todate` - UNIX 타임스탬프를 읽기 쉬운 날짜/시간으로 변환합니다. 인수: `unixtime`, `withms` (`true`는 1970.1.1부터 밀리초 단위, `false`는 초 단위).
    - `tounix` - 지정한 날짜를 UNIX 타임스탬프로 변환합니다. 인수: `year`, `month`, `day`, `displayms`, `hour`, `minute`, `second`, `millisecond`, `timezone`.

-  `/calc` - 임의의 날짜 계산을 위한 하위 기능 `fromnow`, `fromdate`, `from-to`:
   - `fromnow`: 현재 날짜/시간에서 특정 시간을 더하거나 뺍니다. 인수: `timezone`, `matharg`, `years`, `months`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`.
   
   ![fromnow](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrnowcmd.gif)
   
   - `fromdate`: 임의의 날짜/시간에서 특정 시간을 더하거나 뺍니다. 인수: `timezone`, `matharg`, 기준 날짜(`year`, `month` 등) 및 더하거나 뺄 시간.
   - `from-to`: 두 날짜 사이에 경과한 시간의 양을 계산합니다. 인수: `fromyear`~`fromsecond` (시작 날짜) 및 `toyear`~`tosecond` (종료 날짜).
   
       ![fromto](https://lunarcreators.ru/wp-content/uploads/2025/12/calcfrtocmd.gif)

- `/ping` - 봇 응답 속도 확인.

- `/invite` - 봇을 서버에 초대하거나 본인 계정에 설치하여 어디서나 사용.

- `/about` - 애플리케이션에 대한 상세 정보.

## 예상 질문
### 왜 `/timestamp` 결과가 제가 입력한 것보다 1시간 많거나 적게 나오나요?
이는 클라이언트 측에서 타임스탬프를 변환하는 방식 때문입니다. 디스코드는 OS의 서머타임(일광 절약 시간) 전환 데이터를 고려합니다. 지정한 시간에 해당 시간대의 변경 사항이 있다면 타임스탬프에 반영됩니다. 해결 방법은 시간대를 +/-1 조정하거나 시간을 +/-1 변경하는 것입니다.

### 왜 `/calc` 명령어에서 `months`와 `years` 인수가 부정확하다고 표시되나요?
모든 계산이 달력 형식이 아닌 UNIX 초 단위 형식으로 수행되기 때문입니다. 월마다 일수가 다르기 때문에 평균값인 30일(**2,592,000,000 밀리초**)을 기준으로 합니다. `years`의 경우 윤년을 고려하지 않으므로 365일(**31,536,000,000 밀리초**)로 계산됩니다.

# 기타
 - [웹사이트 프로젝트 페이지](https://lunarcreators.ru/timestamp-hosa)
 - [디스코드 앱 디렉토리의 Timestamp 補佐 봇](https://discord.com/discovery/applications/1449839745910964254)

모든 지원에 감사드립니다. [디스코드 서버](https://discord.gg/e2HcXrQ) `@shulkerplay`로 문의해 주세요.