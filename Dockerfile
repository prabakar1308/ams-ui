# Stage 1: Build the Angular app
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:prod

# Stage 2: Serve the app with NGINX
FROM nginx:stable-alpine

# Copy built Angular app from previous stage
COPY --from=build /app/dist/ams-ui /usr/share/nginx/html

# Copy custom nginx config (optional, improves SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]