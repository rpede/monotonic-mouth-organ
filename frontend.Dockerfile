FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npx nx build frontend

FROM nginx:alpine AS final
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/apps/frontend /usr/share/nginx/html
EXPOSE 4200
CMD nginx -g 'daemon off;'
