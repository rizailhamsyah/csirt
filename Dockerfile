FROM node:20 AS build

ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files first for better layer caching
COPY package*.json ./
COPY .env* ./

# Install all dependencies (including devDependencies for build)
# NODE_ENV is not set to production here, so devDependencies will be installed
RUN npm ci --legacy-peer-deps

# Install sharp with platform-specific binary for Linux
RUN npm install --platform=linux --arch=x64 sharp

# Copy source code (includes tsconfig.json, next.config.js, etc.)
COPY . .

# Build the application (devDependencies are still available)
RUN npm run build

# Now prune devDependencies after build is complete
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
