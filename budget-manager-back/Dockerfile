# FRONTEND
# Build the image:
# docker build -t backend:0.1.3 --no-cache . 
# _____tag
# docker tag backend:0.1.3 marcelaobeso/budget-back:0.1.3
# ______ push 
# docker push marcelaobeso/budget-back:0.1.3 
# docker run -it -d -p 4000:4000 backend:0.1.0

# docker build -t backend:0.1.0 --platform linux/amd64 --no-cache .
# docker tag backend:0.1.0 marcelaobeso/budget-back-amd:0.1.0
# docker push marcelaobeso/budget-back-amd:0.1.0

FROM node:18-alpine3.15

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]