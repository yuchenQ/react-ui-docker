FROM node:10 AS node_base

FROM node_base as deps
# Create app directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm i

FROM node_base as build
WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM scratch as ui
COPY --from=build /usr/app/dist /usr/app
