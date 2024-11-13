//http

/**
 * 모든 것은 http
 * http - hypertext transfer protocol
 * http 메세지에 모든 것을 전송
 * 
 * - HTML, TEXT
 * - IMAGE, 음성, 영상, 파일
 * - JSON, XML(API)
 * - 거의 모든 형태의 데이터 전송 가능
 * - 서버간에 데이터를 주고 받을 때도 대부분 http 사용
 * 
 * 
 * http 역사
 * 91년 - get 메서드 지원, http 헤더 x
 * 96년 - 메서드, 헤더 추가
 * 97년 - 1.1버전 가장 많이 사용, 우리에게 가장 중요한 버전
 * 2랑 3버전은 그냥 성능개선
 * 
 * 기반 프로토콜
 * TCP는 http/1.1, http/2
 * UDP는 http/3
 * 현재는 http/1.1 주로 2랑 3도 점점 증가
 * 
 * 
 * http 특징
 * - 클라이언트 서버 구조
 * - 무상태 프로토콜(스테이스리스), 비연결성
 * - http 메시지
 * - 단순함, 확장 기능
 * 
 * 
 * 
 * 
 * 
 * 
 * 클라이언트 서버구조
 * 클라이언트랑 서버를 분리하는 것이 중요하다.
 * 비지니스로직이랑 데이터 같은 거는 서버에
 * 클라이언트 ui나 사용성 단순한 거만,
 * 서버는 아키텍쳐 같은거
 * 
 * - Request Response 구조
 * - 클라이어트는 서버에 요청을 보내고, 응답을 대기
 * - 서버가 요청에 대한 결과를 만들어서 응답
 * 
 * 
 * 
 * 무상태 프로토콜
 * 스테이트리스(stateless) 무상태
 * - 서버가 클라이언트의 상태를 보존 안함
 * - 장점: 서버의 확장성 높음(스케일 아웃)
 * - 단점: 클라이언트가 추가 데이터 전송
 * 
 * 
 * 
 * 
 * 
 * 상태 유지
 * 스테이트툴(stateful)
 * - 서버가 클라이언트의 이전 상태 유지
 * - 항상 같은 서버가 유지되어야 한다.
 * 
 * 
 * 
 * 
 * 상태유지(stateful)과 무상태(stateless) 차이점
 * 
 * 상태 유지: 중간에 다른 서버로 바꾼면 안된다(바꿀경우 바꿀 서버에 상태 정보를 미리 알려줘야함)
 * 무상태: 중간에 서버가 바뀌어도 괜찮
 *      - 갑자기 고객이 증가해도 서버 대거 투입
 *      - 갑자기 클라이언트 요청이 증가해도 서버 대거 투입
 *      - 무상태는 응답 서버를 쉽게 바꿀 수 있다, => 무한한 서버 증설 가능
 *      - 스케일 아웃 / 수평확장의 유리
 * 
 *  무상태(stateless) 실무 한계
 *      - 모든 것을 무상태로 설계 할수 있는 경우도 있고 없는 경우도 있다
 *      - 무상태 - 로그인 필요 없는 단순한 서비스 소개 화면
 *      - 상태유지 - 로그인에서 문제
 *      - 로그인한 사용자의 경우 로그인 했다는 상태를 서버에 유지
 *      - 일반적으로 브라우저 쿠키와 서버 세션등을 사용해서 상태 유지
 *      - 상태 유지는 최소한만 사용
 *      - 데이터량이 많음
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 비연결성
 * 
 * 
 * 연결을 유지하는 모델
 * TCP/IP 연결은 기본적으로 연결을 유지
 * 서버는 연결을 계속 유지, 서버 자원 소모
 * - 단점 : 클라이언트가 놀고 있어도 계속 서버 유지
 * 
 * 
 * 
 * 연결을 유지하는 않는 모델
 * 필요한 요청, 응답만 받고 끊어버림
 * 서버는 연결 유지x, 최소한의 자원 유지
 * 
 * 비연결성
 * - http는 기본이 연결을 유지하지 않는 모델
 * - 일반적으로 초 단위의 이하의 빠른 속도로 응답
 * - 1시간 동안 수천명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십개이하로 매우 작음
 *      - 예)웹 브라우저에서 계속 연속해서 검색 버튼을 누르지는 안늗다.
 * - 서버 자원을 매우 효율적으로 사용할 수 있음
 * 
 * 
 * 비연결성의 한계와 극복
 * - TCP/IP 연결을 새로 맺어야 함 - 3way handshake 시간 추가
 * - 웹 브라우저로 사이트를 요청하면 HTML 뿐만 아니라 자바스크립트, css, 추가 이미지 등등 수 많은 자원이 함께 다운로드
 * - 지금은 HTTP 지속 연결(Persistent Connections)로 문제 해결
 * - http/2, http/3에서 더 많은 최적화
 * 
 * 
 * 
 * http 초기  - 연결, 종료 낭비 / 필요할 때마다 요청
 * 
 * 
 * 
 * 
 * Http 지속 연결(Persistent Connections) - html 정보 다 받을 때까지 연결 유지
 * 
 * 
 * 
 * 스테이스리스를 기억하자
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
 * http 메시지
 * 다시한번 모든 것이 http 
 * 
 * http 메시지 구조
 * 
 * - start-line
 * - header 헤더
 * - empty line 공백라인(CRLF)
 * - message body
 * 
 * 
 * 
 * 
 * http 요청 메시지 예시 - 요청 메시지도 body 본문을 가질 수 있음
 * 
 * GET /search?q=hello&hl=ko HTTP/1.1 - 요청 메시지 시작라인
 * HOST: www.google.com - 헤더
 * 공백
 * 
 * 
 * http 응답 메시지 예시
 * http/1.1 200 ok - 응답 메시지 시작라인
 * Content-Type: text/html;charser=UTF-8   - 헤더
 * Content-Length:3423                    - 헤더
 * 공백
 * <html>
 *    <body></body>  --- 응답메시지
 * </html>
 * 
 * 
 * 
 * 
 * GET /search?q=hello&hl=ko HTTP/1.1
   Host: www.google.com
 * 
 * 시작라인
 * 요청 메시지 - http 메서드 GET /
 * 
 * start-line = request-line / status-line
 * request- line = method SP(공백) request-target SP HTTP-version CRLF(엔터)
 *
 * HTTP 메서드 (GET: 조회)
 *      - 종류: GET, POST, PUT, DELETE...
 *      - 서버가 수행해야 할 동작 지정
 *          -GET: 리소스 조회
 *          -POST: 요청 내역 처리
 * 요청 대상(/search?q=hello&hl=ko) 
 * HTTP Version
 * 
 * 요청 메시지 - 요청 대상 search?q=hello&hl=ko
 *  - absikute-path[?query] (정대경로[?쿼리])
 *  - 절대경로= "/"로 시작하는 경로
 *  - 참고: *. http://...?x-y 와 같이 다른 유형의 경로 지정 방법도 있다.
 * 
 * 
 * 요청 메시지 - 버전 HTTP/1.1
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * http/1.1 200 ok - 응답 메시지 시작라인
 * Content-Type: text/html;charser=UTF-8   - 헤더
 * Content-Length:3423                    - 헤더
 * 공백
 * <html>
 *    <body></body>  --- 응답메시지
 * </html>
 * 
 * 시작 라인
 * 응답 메시지
 * 
 * start-line = request-line / status-line
 * status-line = HTTP-version SP status-code SP reasin-phrase CRLF
 * 
 * HTTP 버전
 * HTTP 상태 코드:요청 성공, 실패를  나타냄
 *      - 200: 성공
 *      - 400: 클라이언트 요청 오류
 *      - 500: 서버 내부 오류
 * 이유 문구: 사람이 이해할 수있는 짧은 상태 코드 설명 글
 * 
 * 
 * 
 * 
 * 
 * HTTP 헤더
 * 
 * header-field - fueld-name ":" OWS field-value OWS (OWS: 띄어쓰기 허용)
 * fueld-name은 대소문자 구문 없음
 * 
 * 헤더 용도
 * - http 전송에 필요한 모든 부가정보
 * - 예) 메시지 바디의 내용, 메시지 바디의 크기, 압축, 인증, 요청 클라이언트(브라우저) 정보, 서버 애플리케이션 정보,
 *   캐시 관리 정보
 * - 표준 헤더가 너무 많음
 * - 필요시 임의의 헤더 추가 가능 
 *   -helloworld: hihi 
 * 
 * 
 * 
 * 
 * <html>
 *    <body></body>
 * </html>
 * http 메시지 바디
 * - 실제 전송할 데이터
 * - HTML 문서, 이미지, 영상, JSOM 등등 byte로 표현할 수 있는 모든 데이터 전송 가능
 * 
 * 
 * 
 * 
 * 
 * 
 * 단순함 확장 가능
 * - http는 단순하다.
 * - http 메시지도 매우 단순
 * - 크게 성강하는 표준 기술은 단순하지만 확장 가능한 기술
 * 
 * 
 * http 정리
 * - http 메시지에 모든 것을 전송
 * - http/1.1
 * - 클라이언트 서버 구조
 * - 무상태 프로토콜(스테이스리스)
 * - HTTP 메시지
 * - 단순함, 확장 가능
 * - 지금은 HTTP시대
 */