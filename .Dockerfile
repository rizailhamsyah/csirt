FROM node:20 AS development

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY .env* ./
COPY package*.json ./

RUN npm ci --legacy-peer-deps

FROM node:20 AS build

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY .env* ./
COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN npm run build

RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

FROM node:20 AS production

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY --from=build /app/package*.json ./
COPY --from=build /app/.env* ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app ./

CMD [ "npm", "start" ]
