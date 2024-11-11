//URI와 웹 브라우저 요청 흐름


/**
 * 
 * URI(Unoform Resource Identifier)
 * 리소스를 식별하는 통합된 방법
 * 
 * URI? URI는 로케이터(locator), 이름(name) 또는 둘 다 추가로 분류될 수 있다.
 * 
 * 
 * URI(Resource Identifier) - 리소스를 식별하는 가장 큰 개념, 주민번호처럼 식별한다라고 생각, 
 * 이 안에 두가지의 대표적인 방법이 있는데
 * 
 * 1. URL (Resource Locator) - 리소스 위치, 리소스가 여기에 있어요 //ex) http:// ~~~ 
 * 2. URN (Resource Name) - 리소스에 이름 // 거의 안씀
 * 
 * 
 * URI
 * - Uniform: 리소스 식별하는 통일된 방식 
 * - Resource: 자원, URI로 식별할 수 있는 모든 것(제한 없음) // URI로 식별하는 모든 걸 다 리소스
 * - Idenfifier: 다른 항목과 구분하는데 필요한 정보
 * 
 * URL: Uniform Resource Locator / Locator:리소스가 있는 위치를 지정
 * URN: Uniform Resource Name / Name: 리소스에 이름을 부여
 * 위치는 변할 수 있지만, 이름은 변하지 않는다.
 * URN이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않음
 * 
 * 
 * URL 전체 문법
 * scheme://[userinfo@]host[:port][/path][?query][#fragment]
 * https://www.google.com:443/search?q=hello&hl=ko
 * 
 * • 프로토콜(https)
 * • 호스트명(www.google.com)
 * • 포트 번호(443)
 * • 패스(/search)
 * • 쿼리 파라미터(q=hello&hl=ko)
 * 
 * 
 * scheme
 * - 주로 프로토콜 사용
 * - 프로토콜: 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙 예) http, https, ftp등등(클라이언트와 서버 규칙)
 * - http는 80 포트, https는 443 포트를 주로 사용, 포트는 생략 가능
 * - https는 http에 보안 추가(HTTP Secure)
 * 
 * 
 * userinfo
 * - URL에 사용자정보를 포함해서 인증
 * - 거의 사용하지 않음
 * 
 * 
 * host
 * - 호스트명
 * - 도메인명 또는 IP 주소를 직접 사용가능
 * 
 * 
 * PORT
 * - 접속 포트
 * - 일반적으로 생략, 생략시 http 80, https 443
 * 
 * 
 * path
 * - 리소스 경로(path), 계층적 구조
 *  /home/file1.jpg
 *  /items/iphone12
 * 
 * 
 * query
 * - key=value 형태
 * - ?로시작, &로 추가 가능 ?keyA=valueA&keyB=valueB
 * - query parameter, query string 등으로 불림, 웹서버에 제공하는 파라미터, 문자 형태
 * 
 * 
 * fragment
 * - https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-introducing-spring-boot
 * - html 내부 북마크 등에 사용
 * - 서버에 전송하는 정보 아님
 * - 잘 안씀
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
 * 
 * 웹 브라우저 요청 흐름
 * https://www.google.com:443/search?q=hello&hl=ko
 * 1.먼저 DNS 조회 
 * 2.원래는 HTTPS PORT생략, 443, 포트정보 조회
 * 3.HTTP 요청 메시지 생성
 * 4.메시지 패킷에 포함해서 전달
 * GET /search?q=hello&hl=ko HTTP/1.1 Host: www.google.com
 * 
 *  - http 메시지 전송
 *    1.웹 브라우저가 HTTP 메시지 생성
 *    2.SOCKET 라이브러리를 통해 전달
 *      -A: TCP/IP 연결(ip/port)
 *      -B: 데이터 전달
 *    3.TCP/IP 패킷 생성, HTTP 메시지 포함
 *    4.서버는 패킷 까서 해석한 다음 정보를 찾음
 *    5.응답 메시지 생성
 *      HTTP/1.1 200 OK 
        Content-Type: text/html;charset=UTF-8  // 컨텐츠 타입
        Content-Length: 3423 // 실제 html의 길이
        <html>
        <body>...</body>
        </html>

      6. 다시 패킷으로 감싸서 응답 패킷으로 요청한 브라우저에 전달
      7. 받은 패킷을 까서 html을 랜더링
 */