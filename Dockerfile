FROM node:20 AS development

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY .env* ./
COPY package*.json ./

RUN npm ci --legacy-peer-deps

FROM node:20 AS build

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"
# Disable WebGL/Canvas di server-side untuk menghindari error saat build
ENV DISPLAY=:99

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install Xvfb dan mesa-dri-drivers untuk virtual display (jika diperlukan untuk build)
# Referensi: https://discourse.threejs.org/t/why-is-threejs-not-working-on-docker/44100
RUN apt-get update && apt-get install -y \
    xvfb \
    mesa-utils \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/* \
    libc6 \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev

COPY .env* ./
COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

# Jalankan build dengan Xvfb untuk virtual display (jika diperlukan)
RUN xvfb-run -a -s "-ac -screen 0 1280x1024x24" npm run build || npm run build

RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

FROM node:20 AS production

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Tidak perlu Xvfb di production karena Next.js hanya serve static files
# Three.js hanya berjalan di browser (client-side) dengan "use client" directive
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env* ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

CMD [ "npm", "start" ]
