# 1단계: Gradle 빌드
FROM gradle:7.6-jdk11 AS build
WORKDIR /app

# Gradle 설정
ENV GRADLE_OPTS="-Dorg.gradle.daemon=false -Dorg.gradle.internal.http.connectionTimeout=180000 -Dorg.gradle.internal.http.socketTimeout=180000"
ENV GRADLE_USER_HOME=/app/.gradle

# 공통 설정 복사
COPY settings.gradle .
COPY common ./common

# API 모듈 전체 복사
COPY data/api /app/data/api/

# Gradle 캐시 디렉토리 생성 및 권한 설정
RUN mkdir -p /app/.gradle && chmod 777 /app/.gradle

# API 모듈 디렉토리로 이동
WORKDIR /app/data/api

# dos2unix 설치 및 gradlew 준비
RUN apt-get update && apt-get install -y dos2unix
RUN chmod +x ./gradlew
RUN dos2unix ./gradlew

RUN ./gradlew bootJar --no-daemon --stacktrace

# 2단계: 실행용 경량 이미지
FROM openjdk:11-jdk-slim
WORKDIR /app

# SSH 설치 및 sshd 준비
RUN apt-get update && \
    apt-get install -y openssh-client dos2unix openssh-server unzip default-mysql-client cron openjdk-17-jdk -y && \
    mkdir /var/run/sshd

# tomcat 사용자 생성 (UID 1000으로 설정하여 web-server와 일치)
RUN useradd -u 1000 -ms /bin/bash tomcat

# 애플리케이션 JAR 복사
COPY --from=build /app/data/api/build/libs/api-0.0.1-SNAPSHOT.jar app.jar

# 업로드 디렉토리 생성 및 tomcat 사용자에게 권한 부여
RUN mkdir -p /tmp/uploads && \
    chown -R tomcat:tomcat /tmp/uploads && \
    chmod 755 /tmp/uploads

# 스크립트 디렉토리 생성 및 복사
RUN mkdir -p /app/scripts
COPY data/api/src/main/resources/scripts/scp_transfer.sh /app/scripts/scp_transfer.sh

# SSH 키를 tomcat 사용자 홈 디렉토리에 복사
RUN mkdir -p /home/tomcat/.ssh
COPY common/ssh-keys/id_rsa /home/tomcat/.ssh/id_rsa
COPY common/ssh-keys/id_rsa.pub /home/tomcat/.ssh/authorized_keys

# SSH 키 권한 및 dos2unix 처리
RUN dos2unix /home/tomcat/.ssh/id_rsa && \
    dos2unix /home/tomcat/.ssh/authorized_keys && \
    dos2unix /app/scripts/scp_transfer.sh

# tomcat 사용자에게 적절한 권한 부여
RUN chown -R tomcat:tomcat /home/tomcat/.ssh && \
    chmod 700 /home/tomcat/.ssh && \
    chmod 600 /home/tomcat/.ssh/id_rsa && \
    chmod 644 /home/tomcat/.ssh/authorized_keys && \
    chown tomcat:tomcat /app/scripts/scp_transfer.sh && \
    chmod +x /app/scripts/scp_transfer.sh && \
    chown tomcat:tomcat app.jar

# 포트 노출
EXPOSE 8081 22

# 3시간마다 데이터베이스 posts 테이블 초기화하는 cron 등록
RUN echo '0 */3 * * * root mysql -h db-server -u whs3 -pwhs3password123! net_robotics -e "DELETE FROM posts;"' \
      > /etc/cron.d/db-cleanup && \
    chmod 0644 /etc/cron.d/db-cleanup && \
    crontab /etc/cron.d/db-cleanup

# tomcat 사용자로 서비스 실행 (cron 서비스 포함)
CMD ["/bin/bash", "-c", "service ssh start && service cron start && su -c 'java -jar /app/app.jar' tomcat"]