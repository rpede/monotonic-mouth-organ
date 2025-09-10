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
WORKDIR /app
COPY --from=build /app/dist/apps/backend .
COPY --from=build /app/prisma/database.db .
RUN mkdir -m a+rw user-data
COPY ./package.json ./
COPY package-lock.json ./
COPY prisma .
COPY .env .
RUN npm install --omit=dev
RUN npx prisma generate
USER node
EXPOSE 3333
CMD node main.js
