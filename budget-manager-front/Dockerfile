# FRONTEND
# Build the image:
# docker build -t frontend:0.1.0 --no-cache . 
# Run container:
# docker run -d -p 3000:3000 frontend:0.1.0

FROM node:18-alpine3.15

ENV REACT_APP_API_URL=http://localhost:4000/api

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]

