FROM node:14.17-alpine as development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --only=development

COPY docker/server .

# Install rimraf, needed by the build prestep
RUN yarn add rimraf

RUN yarn run build

FROM node:14.17-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --only=production

COPY docker/server .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
