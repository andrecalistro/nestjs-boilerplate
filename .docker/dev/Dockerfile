FROM node:lts-alpine

COPY docker-entrypoint.sh /usr/local/bin

ENTRYPOINT ["docker-entrypoint.sh"]

RUN apk add --no-cache bash

RUN npm install --location=global @nestjs/cli

WORKDIR /home/node/app