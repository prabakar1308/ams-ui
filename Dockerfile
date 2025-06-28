# Stage 1: Build the Angular app
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:prod

# Stage 2: Serve the app with NGINX
FROM nginx:stable-alpine

# Copy built Angular app from previous stage
COPY --from=build /app/dist/ams-ui/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]