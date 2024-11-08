FROM maven:3-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package


FROM eclipse-temurin:21-jre
COPY --from=build /app/target/backend.jar /app/backend.jar
EXPOSE 8080
CMD ["java","-jar","/app/backend.jar"]