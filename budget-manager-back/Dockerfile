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

ENV PORT=4000 \
    DBUSER=postgres \
    DBPASS=mypass \
    DBHOST=172.17.0.4 \
    DBPORT=5432 \
    DBNAME=postgres \
    SECRET_JWT_SEED=lAs_ros@s_son_RoJas_Y_m@x_es_n@gro

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]