# docker build -t backend:0.1.0 --no-cache . 
# docker run -it -d -p 4000:4000 backend:0.1.0 

FROM node:18-alpine3.15


ENV PORT=4000 \
    DBUSER=postgres \
    DBPASS=mypass \
    DBHOST=localhost \
    DBPORT=5432 \
    DBNAME=postgres \
    SECRET_JWT_SEED=lAs_ros@s_son_RoJas_Y_m@x_es_n@gro

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]