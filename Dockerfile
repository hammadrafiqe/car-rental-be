FROM node:16.17.0-alpine

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

CMD [ "node","index.js" ]