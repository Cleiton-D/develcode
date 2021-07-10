FROM openjdk:11-jdk-slim as builder

COPY . .
RUN ./mvnw install
RUN ./mvnw package

FROM openjdk:11-jdk-slim as runner

RUN addgroup --gid 1001 --system nodejs
RUN adduser --system nodejs --uid 1001

COPY --from=builder target/develcode-*.jar app.jar

USER nodejs

EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]