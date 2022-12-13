# FRONTEND
# Build the image:
# docker build -t frontend:0.1.3 --no-cache . 
# _____tag
# docker tag frontend:0.1.3 marcelaobeso/budget-front:0.1.3
# ______ push 
# docker push marcelaobeso/budget-front:0.1.3              
# Run container:
# docker run -d -p 3001:3001 frontend:0.1.0

# docker build -t frontend-gcp:0.1.0 --platform linux/amd64 --no-cache . 
# docker tag frontend-gcp:0.1.0 marcelaobeso/budget-front-amd:0.1.0
# docker push marcelaobeso/budget-front-amd:0.1.0

FROM node:16-alpine3.15 as build

ENV REACT_APP_API_URL=http://34.72.71.155:4000/api

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build

FROM nginx:1.23.2-alpine

COPY --from=build /opt/app/build /usr/share/nginx/html