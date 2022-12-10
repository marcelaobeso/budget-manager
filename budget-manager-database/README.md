docker run -e POSTGRES_PASSWORD=mypass -e PGDATA=/var/lib/postgresql/data/pgdata -v PGDISK:/var/lib/postgresql/data -v $(pwd)/db:/docker-entrypoint-initdb.d -d -p 5433:5432 postgres:14.5
