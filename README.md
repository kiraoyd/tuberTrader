
# Tuber Trader

Kira Klingenberg

2023

Last updated: 7/17/2023

Note: Site is not live, and runs based off mock seed data in develop mode.

Tuber Trader is a site for players of the Nintendo Switch game: Animal Crossing New Horizons.
In this game, every player owns an island they build up.
On each island you can buy turnips for a certain price each week, and resell for fluctuating prices throughout the week.
It's a bit of light gambling, with vegetables.
Players can visit each others islands to resell turnips, if their friends have better selling prices.
This site faciliates that process: users can create profiles for their islands and update current selling prices and other turnip related info.

Tuber Trader uses a Node.js backend with Fastify server, connected to a PostgreSQL database through MikroORM, and a React frontend, all encapsulated within Docker images.
It also includes Django (search-py-service) and Rust (Rusty's Root Review) microservices built with the RESTful API framework.

- **search-py-service** queries the profile table to grab and display information for a requested island
- **root-review** allows queries to the profile table to see who spent the most on turnips, what the max profits possible for an island at a specific selling price are, and the most profitable island at a certain selling price.

### FEATURES IN PROGRESS BUT CURRENTLY UNAVAILABLE:
>CSS styling has not been implemented past the basics.
> 
>Root-review results are not yet accessible from the frontend.
> 
> Backend Routing for these tables needs implementation: Message, Transactions.
> 
> Seed Data is pretty terrible and needs a more realistic overhaul.
> 
> Handlers and DB need another layer of abstraction to allow the site to be interchangeable with different database types.
> 
> Site is not production ready.
> 
> Testing needs to be implemented.

### KNOWN ISSUES:

>7.14.23 - Root Review Docker Container will not build, still troubleshooting
> 
>

## To run:

Install Docker on your machine: https://www.docker.com/products/docker-desktop/

If you are on a Windows machine running WSL2, open Docker Desktop before attempting to run this program.

Then follow these instructions: 
1. Clone this repository.
2. From the root directory ```tuberTrader```
2. run: ```docker compose build --no-cache```
3. run: ```docker compose up```
4. Seed the database with mock data: 
```cd backend```
then run ```pnpm mikro-orm-esm seeder:run```
4. Navigate to http://localhost/ to view the site


## To Test:

Tests are in development.


### LICENSE

This work is licensed under the 'MIT License'. Please see the file LICENSE.txt in this distribution for license terms.



