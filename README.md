TuberTrader SETUP
(All commands are with respect to the root directory of the project)

> Clone repository

Start Backend
> Install dependencies (cd backend/ && pnpm install)
> Start database (docker compose up postgres)
> Reset prior Typeorm setup (cd backend/ && pnpm typeorm:drop)
> Migrate database (cd backend/ && pnpm migration:run)
> Seed Database (cd backend/ && pnpm seed)
> Test backend ( cd backend/ && pnpm test)
> Start backend (cd backend/ && pnpm dev)

Start Frontend
> cd frontend
> pnpm install
> pnpm run dev to launch site

