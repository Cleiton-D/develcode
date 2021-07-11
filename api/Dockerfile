FROM openjdk:11-jdk-slim as builder

COPY . .
RUN ./mvnw install
RUN ./mvnw package

FROM openjdk:11-jdk-slim as runner
WORKDIR /app

RUN addgroup --gid 1001 --system app
RUN adduser --system app --uid 1001

RUN chmod -R 777 .

COPY --from=builder target/develcode-*.jar app.jar

USER app

EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]