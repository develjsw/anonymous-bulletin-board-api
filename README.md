### 선행작업 및 참고사항
1. Node.js 버전 22를 사용하였습니다.
2. Docker Compose로 MySQL을 띄워야 하기 때문에 Docker Desktop이 설치되어 있어야 합니다.
   - Node.js 다운로드 : https://nodejs.org/ko/download
   - Docker Desktop (Windows/Mac 공용) 다운로드 : https://www.docker.com/products/docker-desktop

### 실행 순서
Project Root Directory에서 진행 부탁드립니다.
~~~
# 패키지 설치
$ npm i

# Docker Compose로 MySQL 컨테이너 실행 (초기 스키마 자동 생성)
$ docker-compose up -d --build

# DB 스키마 가져오기 (Prisma Schema 파일 동기화) + Prisma Client 코드 생성
$ npm run master:prisma:db:pull
$ npm run master:prisma:generate

# Node.js Server 실행
$ npm run start:debug

# 정상 실행 확인
# 서버가 정상적으로 실행되면 http://localhost:9999 에 접속하여 확인할 수 있습니다.
~~~

### 프로젝트 주요 설계
- 대댓글(댓글의 댓글) 기능은 **계층형 쿼리** 구조로 구현하여, 향후 무제한 깊이로 확장할 수 있도록 설계했습니다.
- 키워드 매칭 알림 기능은 일반적인 LIKE 검색 대신 **Full-Text Search**를 활용하여, 대량 데이터에서도 인덱스를 효율적으로 타면서 빠르게 검색되도록 최적화했습니다.
- 모듈 간 결합도를 낮추기 위해, 필요한 경우 Interface를 통해 의존성 주입(DIP 적용)을 진행했습니다.
- 데이터베이스 부하 분산과 읽기 성능 최적화를 위해, **CQRS 패턴 기반으로 Prisma ORM Master 클라이언트**를 별도로 구성해 두었습니다. (향후 SlaveDB 확장 대응가능)
