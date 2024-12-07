# 1. Gradle 빌드 단계
FROM gradle:7.6.0-jdk17 AS build
WORKDIR /app

# Gradle Wrapper 및 프로젝트 소스 복사
COPY ./logic/gradle ./gradle
COPY ./logic/gradlew ./gradlew
COPY ./logic/settings.gradle ./settings.gradle
COPY ./logic/build.gradle ./build.gradle
COPY ./logic/src ./src


# Gradle 빌드 실행 (테스트 생략 가능)
RUN ./gradlew clean build -x test

# 2. 실행 단계
FROM openjdk:17-jdk-slim
WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar

# Spring Boot 기본 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
