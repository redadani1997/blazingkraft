## blazingkraft-ui-builder
FROM node:16.0.0-alpine AS blazingkraft-ui-builder

RUN mkdir /blazingkraft-ui
RUN mkdir /blazingkraft-ui/builder

WORKDIR /blazingkraft-ui/builder

COPY blazingkraft-ui/package*.json ./

RUN npm install

COPY blazingkraft-ui ./

RUN npm run build


## blazingkraft-api-builder
FROM openjdk:21-jdk AS blazingkraft-api-builder

RUN microdnf install findutils

RUN mkdir /blazingkraft-api
RUN mkdir /blazingkraft-api/builder

WORKDIR /blazingkraft-api/builder

COPY blazingkraft-api/ ./

RUN chmod +x ./gradlew
RUN ./gradlew build


# blazingkraft-prod
FROM nginx:stable-alpine3.20-slim

RUN apk --no-cache add curl
RUN apk --no-cache add openjdk21-jre-headless
RUN apk --no-cache add gcompat

RUN mkdir /blazingkraft
RUN mkdir /blazingkraft/blazingkraft-api
RUN mkdir /blazingkraft/blazingkraft-ui

RUN mkdir /var/blazingkraft

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

WORKDIR /blazingkraft/blazingkraft-ui

RUN rm -rf ./*

COPY --from=blazingkraft-ui-builder /blazingkraft-ui/builder/dist ./

WORKDIR /blazingkraft/blazingkraft-api

COPY --from=blazingkraft-api-builder /blazingkraft-api/builder/blazingkraft-core/build/libs/blazingkraft-core-0.0.1.jar ./

WORKDIR /etc/nginx

COPY ./configuration/nginx.conf ./nginx.conf

WORKDIR /blazingkraft

COPY ./configuration/entrypoint.sh ./entrypoint.sh

RUN chmod 777 /var/blazingkraft
RUN chmod 777 /tmp
RUN chmod 777 ./entrypoint.sh

RUN adduser -D blazingkraft_usr

USER blazingkraft_usr

HEALTHCHECK CMD curl --fail http://localhost:8080/health || exit 1 

EXPOSE 7766

ENTRYPOINT ["./entrypoint.sh"]


# docker build . -t blazingkraft
# docker run -it --name blazingkraft-instance -p 7766:7766 blazingkraft
# docker run -it blazingkraft sh
# docker rm blazingkraft-instance