## Description

A Project with backend and frontend part, wrapped by docker compose. Backend is a simple express server provided CRUD api and convert function between SQL and modifiedSQL. frontend is a Vite+React website.

## How it works

https://github.com/terence223/sql-query-parse/assets/4189291/1ae6f076-5075-4003-9860-9fe4086278db

## How to run it at local
1. `docker-compose up --build`
2. you can see the frontend page at `localhost:5173`

## How to deploy to AWS ECS
1. install ecs-cli
2. create ECS-Cluster
3. deploy docker to ECS
```ecs-cli compose --project-name sql-query-parse  --file docker-compose.yml \
--debug service up  \
--deployment-max-percent 100 --deployment-min-healthy-percent 0 \
--region us-west-2 --ecs-profile sql-query-parse --cluster-config sql-query-parse```
