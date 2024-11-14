/**
 * http 헤더1
 * 
 * 일반 헤더
 * 
 * 개요
 * - filed-name은 대소문자 구문 없음
 * ex) header-name = field-name ":" OWS field-value OWS (OWS: 띄어쓰기 허용)
 * 
 * 용도
 * - http 전송에 필요한 모든 부가정보
 * - 메시지 바디의 내용, 메시지 바디의 크기, 압축, 인증, 요청 클라이언트, 서버 정보, 캐시 관리 정보....
 * 
 * 
 * 2014년 새로등장한 스팩
 * 
 * HTTP BODY
 * message body - RFC7230(최신)
 * 
 * HTTP/1.1 200 OK - start-Line
 * Content-Type: text/html;charset=UTF-8  - 표현헤더
 * Content-Length: 3421 - 표현 헤더
 * 
 * 메시지 본문
 * <html>
 *  <body>...</body>   표현 데이터
 * </html>
 * 
 * - 메시지 본문(message body)을 통해 표현 데이터 전달
 * - 메시지 본문 = 페이로드(payload)
 * - 표현은 요청이나 응답에서 전달할 실제 데이터
 * - 표현 헤더는 표현 데이터를 해석할 수 있는 정보 제공
 *      - 데이터 유형(html, json), 데이터 길이, 압축 정보 등등
 * - 참고: 표현 헤더는 표현 메타데이터와, 페이로드 메시지를 구분해야 하지만 여기서 생략
 * 
 * 
 * 
 * 
 * 
 * 표현
 * 
 * 표현 헤더 구성 - 표현 헤더는 전송, 응답 둘다 사용
 * Content-Type: 표현 데이터의 형식, 쉽게 말하면 body에 들어가는 내용이 뭐야?
 *      - 미디어 타입, 문자 인코딩
 *      - 예)
 *            - text/html; charser=utf-8 // 텍스트 타입
 *            - application/json // 제이슨 타입
 *            - image/png
 * 
 * 
 * Content-Encoding: 표현 데이터의 압축 방식, 표현 데이터 인코딩
 *      - 표현 데이터를 압축하기 위해 사용
 *      - 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가, 즉 body에 있는 내용을 압축 후 인코딩 헤더에 추가
 *      - 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
 *      - 예)
 *          - gzip
 *          - deflate
 *          - identity - 압축 안한다
 * 
 * Content-Language: 표헌 데이터의 자연언어
 *      - 표현 데이터의 자연 언어를 표현 / ko, en, en-US
 * Content-Length: 표현 데이터의 길이
 *      - 표현 데이터의 길이, 바이트 단위
 *      - Transfer-Encoding(전송 코딩)을 사용하면 Content-Length를 사용하면 안됨
 * 
 * 
 * 
 * 
 * 협상(콘텐츠 네고시에이션)
 * 클라이언트가 선호하는 표현 요청, 클라이언트 원하는 요청을 준다
 * 
 * - Accept: 클라이언트가 선호하는 미디어 타입 전달
 * - Accept-Charset: 클라이언트가 선호하는 문자 인코딩
 * - Accept-Encoding: 클라이언트가 선호나는 압축 인코딩
 * - Accept-Language: 클라이언트가 선호나는 자연 언어
 * 
 * 햡상 헤데는 요청시에만 사용
 * 
 * 
 * 협상과 우선순위1
 * 
 * Quality Values(q)
 *  - Quality Values(q) 값 사용
 *  - 0~1, 클수록 높은 우선 순위
 *  - 생략하면 1
 *  - Accept-Language: ko-KR,kr;q=0.9,en-US;q-0.8,en;q=0.7
 *      - 1.ko-KR;q=1(q생략)
 *      - 2.ko;q=0.9 
 *      - 3.en-US;q=0.8
 *      - 4.en:q=0.7
 * 
 * 
 * 
 * 협상과 우선순위2
 * Quality Values(q)
 * 
 * - 구체적인 것이 우선이다
 * - Accept: text/*, text/plain, text/plain;format-flowed, 별/별
 *      - 1. text/plain;format=flowed
 *      - 2. text/plain
 *      - 3. text/*
 *      - 4. 별/별
 * 
 * 협상과 운선순위3
 * Quality Values(q)
 * - 구체적인 것을 기준으로 미디어 타입을 맞춘다
 * - Accept: text/*;q=0.3, text/html;q=0.7, text/html;level=1,text/html;level=2;q=0.4, 별/별;q=0.5
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 전송 방식 설명
 * - 단순 전송(Content-Length) - Content-Length의 길이를 알 때 사용
 * - 압축 전송(Content-Encoding) - 서버에서 내용을 gzip 같은 걸로 압축해서 보낸다. /  Content-Encoding이라는 것을 삽입해줘야한다.
 * - 분할 전송(Transfer-Encoding) -  Transfer-Encoding: chunked 데이터를 나눠서 보낸다. 분할 전송을 할 때는 표현 헤더에 Content-Length를 삽입해서 보내면 안돼
 * - 범위 전송(Range, Content-Range) - Range: bytes= 1001-2000를 서버로 요청하면 Content-Range: bytes 1001-2000 / 2000인 부분만 받을 수있다
 *                                          무슨 소리냐 하면 전송을 받다가 끊기면 처음부터 다시 받는 것이 아니라 기존에 받았던 것을 제외하고 그 부분을 받는다.
 * 
 * 
 * 
 * 
 * 일반 정보
 * 
 * - From / 유저 에이전트의 이메일 정보
 *      - 일반적으로 잘 사용x
 *      - 검색 엑진 같은 곳에서, 주로 사용
 *      - 요청에서 사용
 * - Referer / 이전 웹 페이지 주소 / 많이 씀
 *      - 현재 요청된 페이지의 이전 웹 페이지 주소
 *      - A -> B로 이동하는 경우 B를 요청할 때 Referer: A를 포함해서 요청
 *      - Referer를 사용해서 유입 경로 분석 가능
 *      - 요청에서 사용
 *      - 참고:referer는 단어 referrer의 오타
 * 
 * - User-Agent / 유저 에이전트 애플리케이션 정보 / 쉽게 말하면 내 웹 브라우저 정보나 내 애플리케이션 정보
 *      -  user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36
 *      - 클라이언트의 애플리케이션 정보(웹 브라우저 정보, 등등)
 *      - 통계 정보
 *      - 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능
 *      - 요청에서 사용
 * 
 * - Server / 요청을 처리하는 ORIGIN 서버의 소프트웨어 정보
 *      - Server: Apache/2.2.22 (Debian)
 *      - server: nginx
 *      - 응답에서 사용
 * 
 * - Date / 메시지가 발생하 날짜와 시간
 *      - Date: Tue, 15 Nov 1994 08:12:31 GMT  
 *      - 응답에서 사용
 * 
 * 
 * 
 * 
 * 특별한 정보
 * 
 * - Host/ 요청한 호스트 정보(도매안)
 *      - 요청에서 사용
 *      - 필수
 *      - 하나의 서버가 여러 도메인을 처리해야 . 할때
 *      - 하나의 IP 주소에 여러 도메인이 적용되어 있을 때
 * 
 * - Location / 페이지 리다이렉션
 *      - 웹 브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 이동(리다이렉트)
 *      - 응답코드 3xx에서 설명
 *      - 201(Created): Location 값은 요청에 의해 생성된 리소스 URI
 *      - 3xx(Redirection): Location 값은 요청을 자동으로 리다이렉션하기 위한 대상 리소스를 가리킴
 * 
 * - Allow / 허용 가능한 HTTP 메서드
 *      - 405(Method Not Allowed)에서 응답에 포함해야함
 *      - Allow: GET, HEAD, PUT
 * 
 * - Retry-After / 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간
 *      - 503(Service Unavailable): 서비스가 언제까지 불능인지 알려줄 수있음
 *      - Retry-After: Fri, 31 Dec 1999 23:59:59 GMT (날짜 표기)
 *      - Retry-After: 120 (초단위 표기)
 * 
 * 
 * 
 * 
 * 
 * 
 * 인증
 * - Authorization / 클라이언트 인증 정보를 서버에 전달
 *      - Authorization: Basic xxxxxxxxxxxxxxxx
 * - WWW-Authenticate / 리소스 접근시 필요한 인증 방법 정의
 *      - 리소스 접근시 필요한 인증 방법 정의
 *      - 401 Unauthorized 응답과 함께 사용
 *      - WWW-Authenticate: Newauth realm="apps", type=1,title="Login to \"apps\"", Basic realm="simple"
 * 
 * 
 * 
 * 
 * 쿠키
 * - http는 stateless 프로토콜이니 요청과 응답 받으면 끊어지고 이전 요청 기억을 못해 그래서 클라이언트와 서버는 서로 상태 유지 못함
 * - 쿠키 미사용하고 로그인을 유지하려면 모든 요청에 사용자 정보를 포함해야하는데 상당히 비효율적 
 *      - 모든 요청에 사용자 정보를 포함되도록 개발 해야함면 말이 안돼
 *      - 브라우저를 완전히 종료하고 다시 열면?
 * - 그래서 등장한게 쿠키
 *      - 서버는 유저가 로그인 정보를 주면 성공시 Set-Cookie라는 것을 통해 유저 정보를 말고 쿠키 해더를 만들어 정보를 주고 클라이언트의 쿠키 저장소에 유저 정보를 저장
 *      - 로그인 이후에 같은 서버에 다른 페이지에 들어가면 웹 브라우저는 쿠키 저장소의 로그인 정보를 무조건 꺼내서 http 헤더에 추가해서 요청한다.
 *      - 그레사 모든 요청에 쿠키 정보 자동 포함
 * 
 * 
 * 쿠키 예시 - set-cookie: sessionId=abcde1234; expires=Sat, 26-Dec-2020 00:00:00 GMT; path=/; domain=.google.com; Secure
 *      - sessionId - 유저 정보를 그대로 전달해주는 것은 위험이 있기 때문에 sessionId 즉 세션값으로 난독화 하여 보내고 
 *                    그 값을 클라이언트는 요청값으로 보낸다.
 *      - expires 만료일
 *      - path 경로
 *      - domain host
 *      - Secure 보안
 * 
 *  쿠키 사용처
 *      - 사용자 로그인 세션 관리 - 쿠키 저장소에서 유저 정보를 그대로 전달해주건 상당히 위험하다. 서버에서는 로그인을 성공하면 
 *                              세션키(sessionId)를 발급해서 서버 데이타베이스에 저장 저장한 sessionId 즉 세션값을 클라이언트에 준다
 *                              그래서 클라이언트는 요창마다 sessionId를 넣어서 보낸다
 *      - 광고 정보 트래킹
 * 
 *  쿠키 정보는 항상 서버에 전송됨
 *      - 네트워크 트래픽 추가 유발
 *      - 최소한의 정보만 사용(sessionId, 인증토큰)
 *      - 서버에 전송하지 않고, 웹 브라우저 내부에 데이터를 저장하고 싶으면 웹 스토리지 써라 localStorage나 sessionStorage
 * 주의
 *  - 보안에 인감한 데이터는 저장하면 안됨(주민반호, 신용카드 번호 등등)
 * 
 * 
 * 
 * 
 * 쿠키 - 생명주기
 * set-cookie = expires=Sat, 26-Dec-202 04:39:21 GMT;
 *  - 만료일이 되면 쿠키 삭제
 * set-cookie = max-age=3600(3600초)
 *  - 0이나 음수를 지정하면 쿠키 삭제
 * 세션 쿠키: 만료 날짜를 생략하면 브라우저 종료시까지만 유지
 * 영속 쿠키: 만료 날짜를 입력하면 해당 날짜까지 유지
 * 
 * 
 * 
 * 쿠키 - 도메인 domain
 * 생각해봐 내가 저장한 쿠키가 아무 사이트에 들어갈 때 마다 쏴주면 큰일
 * 
 * 예) domain=example.org
 * 명시: 명시만 문서 기준 도메인 + 서브 도메인 포함
 *  - domain=example.org 이렇게 지정해서 쿠키 생성
 *      - example.org는 물론
 *      - dev.example.org도 쿠키 접근
 * 생략:현재 문서 기준 도메인만 적용
 *  - example.org에서 쿠키를 생성하고 domain지정을 생략
 *      - example.org에서만 쿠키 접근
 *      - dev.example.org도 쿠키 미접근
 * 
 * 
 * 
 * 쿠키 - 경로 path
 * 
 * 예) path=/home
 * - 이 경로를 포함한 하위 경로 페이지만 쿠키 접근
 * - 일반적으로 path=/ 루트로 지정
 * 예)
 *      - path=/home 지정
 *      - /home 가능
 *      - /home/level1 가능
 *      - /home/level1/level2 rksmd
 *      - /hello 불가능
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 쿠키 - 보안
 * 
 *  Secure
 *  - 쿠키는 http, https를 구분하지 않고 전송
 *  - Secure를 적용하면 https인 경우에만 전송
 *  HttpOniy
 *  - XSS 공격 방지
 *  - 자바스크립트에서 접근 불가(document.cookie)
 *  - HTTP 전송에만 사용
 *  SameSite
 *  - XSRF 공격 방지
 *  - 요청 도메인과 쿠키에 설정된 도메인이 같은 경우만 쿠키 전송
 */



