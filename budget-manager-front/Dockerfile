# FRONTEND
# Build the image:
# docker build -t frontend:0.1.4 --no-cache . 
# _____tag
# docker tag frontend:0.1.4 marcelaobeso/budget-front:0.1.4
# ______ push 
# docker push marcelaobeso/budget-front:0.1.4              
# Run container:
# docker run -d -p 3001:3001 frontend:0.1.0

# docker build -t frontend-amd:0.1.5 --platform linux/amd64 --no-cache .
# docker tag frontend-amd:0.1.5 marcelaobeso/budget-front-amd:0.1.5
# docker push marcelaobeso/budget-front-amd:0.1.5

FROM node:16-alpine3.15 as build

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build

FROM nginx:1.23.2-alpine

COPY --from=build /opt/app/build /usr/share/nginx/html