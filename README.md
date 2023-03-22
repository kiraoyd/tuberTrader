

BIG DISCLAIMER: This project is still not up and running fully from Docker. You are 
welcome to give it a try in Docker, but so far the build has been failing for the backend
on RUN pnpm install. Postgres and the search_py_service containers seem to be running successfully, but frontend 
does not navigate to the correct page in the browser. Due to these current issues it is reccomended to run this
project locally, with the necessary installs.


TuberTrader SETUP: LOCAL non-Docker version
(All commands are with respect to the root directory of the project: tuberTrader, unless otherwise stated)

> Clone repository

Start Backend
> Install dependencies (cd backend/ && pnpm install)
> 
> Start database (docker compose up postgres)
> 
> Reset prior Typeorm setup (cd backend/ && pnpm typeorm:drop)
> 
> Migrate database (cd backend/ && pnpm migration:run)
> 
> Seed Database (cd backend/ && pnpm seed)
> 
> Start backend (cd backend/ && pnpm dev)
> 

Start search_py_service (postgres needs to be up and running before doing this)
> Ensure the settings are correct for local (not docker) run: cd search_py_service/tuber_trader/tuberTrader, open settings.py. In the DATABASES section ensure the HOST is set to 'HOST': '127.0.0.1'
> 
> Run the virtual environment venv (cd search_py_service && source venv/Scripts/activate)
> 
> Once in search_py_service with the venv activated, navigate to the service (cd tuber_trader)
> 
> Once in search_py_service/tuber_trader, run the service (python3 manage.py runserver)

Start Frontend
> cd frontend
> pnpm install
> pnpm run dev to launch site

