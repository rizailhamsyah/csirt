#
# Ops build example:
# export NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$(openssl rand -base64 32)" # only first time; then reuse
# export NEXT_PUBLIC_BUILD_ID="$(date -u +%Y%m%d%H%M%S)"
# docker build \
#   --build-arg NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY" \
#   --build-arg NEXT_PUBLIC_BUILD_ID="$NEXT_PUBLIC_BUILD_ID" \
#   -t pkc-csirt .
#
FROM node:20 AS development

WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

COPY .env* ./
COPY package*.json ./

RUN npm ci --legacy-peer-deps

FROM node:20 AS build

ENV NODE_ENV=production
ENV TZ=Asia/Jakarta

WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

COPY .env* ./
COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

#
# Stable Server Actions encryption key (base64 AES 16/24/32 bytes). Required at BUILD time.
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY

# Public build id for client skew detection (change every image build).
ARG NEXT_PUBLIC_BUILD_ID
ENV NEXT_PUBLIC_BUILD_ID=$NEXT_PUBLIC_BUILD_ID

RUN npm run build

RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

FROM node:20 AS production

ENV NODE_ENV=production
ENV TZ=Asia/Jakarta

WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

COPY --from=build /app/package*.json ./
COPY --from=build /app/.env* ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

#
# Expose build-time args to runtime env (do NOT hardcode secrets here).
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ARG NEXT_PUBLIC_BUILD_ID
ENV NEXT_PUBLIC_BUILD_ID=$NEXT_PUBLIC_BUILD_ID

CMD [ "npm", "start" ]
