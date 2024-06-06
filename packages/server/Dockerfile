FROM node:lts

WORKDIR /app

COPY ./ ./

RUN yarn install

ENV DB_URL=""

EXPOSE 8080

CMD ["yarn", "start"]
