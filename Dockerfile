FROM node:10

RUN mkdir -p /front_nextjs

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /front_nextjs

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
