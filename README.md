# As of 6/26/2023...

## To run:

1. Clone this repository.
2. From the root directory ```tuberTrader```
2. run: ```docker compose build --no-cache```
3. run: ```docker compose up```
4. Navigate to http://localhost/ to view the site

### DISCLAIMER: this site is still a work in progress

I am still moving over routes from the old typeORM based backend (backendOLD), to the new mikroORM based backend (backend). So a large part of the sites functionality is still not running. 

The Rusts's Root Review Microservice has not been Docker-ized just yet.

CSS styling still needs to be implemented on the site.

More updates to follow...

# BELOW ARE NOTES ONLY, PLEASE IGNORE...
## 5/5/2023 - ripping out typeORM and replacing with MikroORM

To dump the current schema SQL to the console: pnpm mikro-orm-esm schema:create --dump

OLDbackend is now depricated. New backend is running.

To drop DB schema after changes to the models: pnpm mikro-orm-esm schema:drop --run
then update it: pnpm mikro-orm-esm schema:update --run --fk-checks
migrate to current point: pnpm mikro-orm-esm migration:fresh
Then seed: pnpm mikro-orm-esm migration:fresh --seed

