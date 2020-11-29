FROM node:12-alpine

RUN mkdir -p /home/node/b4you-alexa-report/node_modules && mkdir -p /home/node/b4you-alexa-report/dist && chown -R node:node /home/node/b4you-alexa-report

WORKDIR /home/node/b4you-alexa-report

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/server.js"]
