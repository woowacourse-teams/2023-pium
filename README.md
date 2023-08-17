# 피움 Wiki 🌱

피움🌱 의 Wiki에 오신걸 환영합니다 🎉

## 피움의 집사들을 소개합니다 🤗

|                                                Backend                                                |                                                Backend                                                 |                                                Backend                                                |                                                                Backend                                                                |                                               Frontend                                               |                                               Frontend                                               |                                               Frontend                                               |
|:-----------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|
| <a href="https://github.com/yeonkkk"><img src="https://avatars.githubusercontent.com/u/88660886?v=4" width=400px alt="조이"/></a> | <a href="https://github.com/kim0914"><img src="https://avatars.githubusercontent.com/u/68818952?v=4" width=400px alt="그레이"/></a> | <a href="github.com/Choi-JJunho"><img src="https://avatars.githubusercontent.com/u/49794401?v=4" width=400px alt="주노"/></a> | <a href="https://github.com/rawfishthelgh"><img src="https://avatars.githubusercontent.com/u/79038908?v=4" width=400px alt="하마드"></a> | <a href="https://github.com/hozzijeong"><img src="https://avatars.githubusercontent.com/u/50974359?v=4" width=400px alt="클린"></a> | <a href="https://github.com/WaiNaat"><img src="https://avatars.githubusercontent.com/u/77872742?v=4" width=400px alt="참새"></a> | <a href="https://github.com/bassyu"><img src="https://avatars.githubusercontent.com/u/54442420?v=4" width=400px alt="쵸파"></a> |
|                                   [조이](https://github.com/yeonkkk)                                    |                                   [그레이](https://github.com/kim0914)                                    |                                 [주노](https://github.com/Choi-JJunho)                                  |                                                [하마드](https://github.com/rawfishthelgh)                                                |                                 [클린](https://github.com/hozzijeong)                                  |                                   [참새](https://github.com/WaiNaat)                                   |                                   [쵸파](https://github.com/bassyu)                                    |

# 피움 서비스 소개

<img src="https://github.com/woowacourse-teams/2023-pium/assets/68818952/987ff41e-08fb-43dd-a4cf-07e7cc4a1dab" width="400px">

식물 관리법은 환경에 따라 다르기 때문에 경험을 통해서 터득할 수밖에 없어요.

여러분의 관리 경험을 기록한다면 각자에게 알맞은 관리법을 더 빠르게 도출할 수 있겠죠? 

'피움'은 이러한 가치를 바탕으로 탄생하게 되었습니다.

리마인더를 이용해서 반려 식물 관리 이력을 기록하고, 타임라인을 이용해서 여러분의 관리 이력을 일목요연하게 확인하는 것.

이 두 가지가 피움이 여러분께 제공하는 기능입니다.

[피움 소개글 자세히 보러가기](https://github.com/woowacourse-teams/2023-pium/wiki/%ED%94%BC%EC%9B%80-%EC%86%8C%EA%B0%9C%EA%B8%80)

# 프로젝트 실행 방법

## 프론트엔드

```shell
git clone https://github.com/woowacourse-teams/2023-pium.git

cd 2023-pium/frontend 
```

### env파일 설정

env 파일을 생성한다.

```shell
mkdir env

vim env/local.env
```

- local.env 파일 내부에 다음과 같이 설정한다.
- 카카오 rest_key는 [카카오 로그인 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)를 확인하고 적용해야 한다.
```env
KAKAO_REST_KEY={본인_카카오_REST_KEY}
KAKAO_REDIRECT_URL=http://localhost:8282/authorization
HOST=http://localhost:8080/
```

### 실행

```shell
npm install 

npm run local
```

## 백엔드

```shell
git clone https://github.com/woowacourse-teams/2023-pium.git

cd 2023-pium/backend/pium
```

### properties 파일 설정

```shell
vim src/main/resources/application.properties
```

아래 내용을 참고하여 properties 파일을 작성한다.
```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://{서버_HOST}/{DATABASE}?characterEncoding=UTF-8&serverTimezone=Asia/Seoul
spring.datasource.username={DB_ACCOUNT}
spring.datasource.password={DB_PASSWORD}

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.ddl-auto=create-drop

logging.level.org.hibernate.orm.jdbc.bind=trace

auth.kakao.token-request-uri=https://kauth.kakao.com/oauth/token
auth.kakao.member-info-request-uri=https://kapi.kakao.com/v2/user/me
auth.kakao.redirect-uri={REDIRECT_URI}
auth.kakao.unlink-uri=https://kapi.kakao.com/v1/user/unlink
auth.kakao.client-id={REST_API_KEY}
auth.kakao.admin-id={ADMIN_KEY}

server.servlet.session.cookie.same-site=none
server.servlet.session.cookie.secure=true
```


### 프로젝트 실행
```shell
./gradlew build

java -jar build/libs/pium.jar
```
