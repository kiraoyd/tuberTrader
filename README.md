
# Tuber Trader

Kira Klingenberg

2023

Tuber Trader is a site for player of Animal Crossing New Horizons.
In this game, every player owns an island they build up.
On each island you can buy turnips for a certain price each week, and resell for fluctuating prices throughout the week.
It's a bit of light gambling, with vegetables.
Players can visit each others islands to resell turnips, if their friends have better selling prices.
This site faciliates that process: users can create profiles for their islands and update current selling prices and other turnip related info.

Tuber Trader uses a Node.js backend with Fastify server, connected to a PostgreSQL database through MikroORM, and a React frontend, all encapsulated within Docker images.
It also includes Django (search-py-service) and Rust (Rusty's Root Review) microservices built with the RESTful API framework.


### As of 6/26/2023...

Install Docker on your machine: https://www.docker.com/products/docker-desktop/

If you are on a Windows machine running WSL2, open Docker Desktop before attempting to run this program.

## To run:

1. Clone this repository.
2. From the root directory ```tuberTrader```
2. run: ```docker compose build --no-cache```
3. run: ```docker compose up```
4. Seed the database with mock data: 
```cd backend```
then run ```pnpm mikro-orm-esm seeder:run```
4. Navigate to http://localhost/ to view the site


## To Test:

I will add in test hits once all routes have been moved over from the backendOLD
## DISCLAIMER: this site is still a work in progress

I am still moving over routes from the old typeORM based backend (backendOLD), to the new mikroORM based backend (backend). So a large part of the sites functionality is still not running. 

The Rusty's Root Review Microservice has not been Docker-ized just yet.

CSS styling still needs to be implemented on the site.

More updates to follow...


### LICENSE

This work is licensed under the 'MIT License'. Please see the file LICENSE.txt in this distribution for license terms.

### BELOW ARE NOTES ONLY, PLEASE IGNORE...
### 5/5/2023 - ripping out typeORM and replacing with MikroORM

To dump the current schema SQL to the console: pnpm mikro-orm-esm schema:create --dump

OLDbackend is now depricated. New backend is running.

To drop DB schema after changes to the models: pnpm mikro-orm-esm schema:drop --run
then update it: pnpm mikro-orm-esm schema:update --run --fk-checks
migrate to current point: pnpm mikro-orm-esm migration:fresh
Then seed: pnpm mikro-orm-esm migration:fresh --seed

