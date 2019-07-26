FROM node:10 AS node_base

FROM node_base as deps
WORKDIR /usr/app
COPY package*.json ./
RUN npm i

FROM node_base as dev
WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules ./node_modules
COPY . .
ENTRYPOINT ["npm"]