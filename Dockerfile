FROM node:20 AS build

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY .env* ./

RUN npm ci --legacy-peer-deps

RUN npm install --platform=linux --arch=x64 sharp

COPY . .

RUN npm run build

RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

RUN npm install --platform=linux --arch=x64 --no-save sharp

FROM node:20 AS production

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY --from=build /app/package*.json ./
COPY --from=build /app/.env* ./

COPY --from=build /app/node_modules ./node_modules

RUN npm install --platform=linux --arch=x64 --no-save sharp || true

COPY --from=build /app/.next ./.next

COPY --from=build /app/public ./public

EXPOSE 3000

CMD [ "npm", "start" ]
