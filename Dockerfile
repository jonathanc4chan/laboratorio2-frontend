# Etapa de compilación
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # 👈 QUITA el --configuration production extra

# Etapa de servidor Nginx
FROM nginx:alpine
COPY --from=build /app/dist/laboratorio2-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80