FROM node:22-alpine AS build
RUN apk add openssl --no-cache
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run sync && npx nx build backend

FROM node:22-alpine AS final
RUN apk add openssl --no-cache
RUN mkdir /app && chown node /app
WORKDIR /app
USER node
COPY --from=build --chown=node /app/dist/apps/backend .
COPY --from=build --chown=node /app/prisma/database.db .
COPY --chown=node package.json ./
COPY --chown=node package-lock.json ./
COPY --chown=node prisma .
COPY --chown=node .env .
RUN npm install --omit=dev
RUN npx prisma generate
COPY --chown=node user-data/ ./user-data/
EXPOSE 3333
CMD node main.js
