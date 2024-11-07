FROM maven:3-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn clean package
COPY src ./src


FROM eclipse-temurin:21-jre-alpine
COPY --from=build ./target/backend.jar .
EXPOSE 8080
ENTRYPOINT ["java","-jar","backend.jar"]