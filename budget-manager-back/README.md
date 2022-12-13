# command to create a back container

docker run \
-e PORT=4000 \
-e DBUSER=postgres \
-e DBPASS=mypass \
-e DBHOST=172.17.0.2 \
-e DBPORT=5432 \
-e DBNAME=postgres \
-e DATABASE=postgres \
-e SECRET_JWT_SEED=lAs_ros@s_son_RoJas_Y_m@x_es_n@gro \
-v $(pwd):/code \
-w /code \
-p 4000:4000 --rm -it \
node:18-buster "/bin/bash"

# command to create a front container

docker run \
-e REACT_APP_API_URL=http://localhost:4000/api \
-v $(pwd):/code \
-w /code \
-p 3000:3000 --rm -it \
node:16-buster "/bin/bash"

# to retag images

docker tag frontend:0.1.1 marcelaobeso/budget-front:0.1.1

# build the gcp containers
