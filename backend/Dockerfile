FROM node:18

RUN npm install -g pnpm

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .
EXPOSE 8080
ENV ADDRESS=0.0.0.0 PORT=8080 DB_HOST=postgres DB_PORT=5432 DB_NAME=tuber DB_USER=tuber DB_PASS=tuber PASSWORD=password ADMIN_PASSWORD=adminpw JWT_SECRET=superSecret NODE_ENV=development

RUN pnpm build

#run seeder
#RUN pnpm mikro-orm-esm seeder:run

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
#NOTE WE CANNOT DO {RUN pnpm db:reset} HERE BECAUSE DOCKER WILL NOT CONNECT THE NETWORK AT BUILD TIME!
#RUN pnpm db:reset

CMD ["pnpm", "startProd"]
