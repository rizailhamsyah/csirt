FROM node:20 AS build

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files first for better layer caching
COPY package*.json ./
COPY .env* ./

# Install all dependencies (including devDependencies for build)
RUN npm ci --legacy-peer-deps

# Install sharp with platform-specific binary for Linux
RUN npm install --platform=linux --arch=x64 sharp

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Prune devDependencies and clean cache
RUN npm prune --production && npm cache clean --force

# Reinstall sharp for production (platform-specific)
RUN npm install --platform=linux --arch=x64 --no-save sharp

FROM node:20 AS production

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files and environment variables
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env* ./

# Install only production dependencies
RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

# Install sharp with platform-specific binary for production
RUN npm install --platform=linux --arch=x64 --no-save sharp

# Copy built application
COPY --from=build /app/.next ./.next

# Copy public folder for static files
COPY --from=build /app/public ./public

EXPOSE 3000

CMD [ "npm", "start" ]
