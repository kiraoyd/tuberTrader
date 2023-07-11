# Rusty's Root Review

Kira Klingenberg

2023

A web microservice built in Rust for the Animal Crossing New Horizons Turnip Trading site: Tuber Trader.
It uses an axum server, tokio runtime, and HTTP routing to query just the Profiles table and run simple analysis on island data.

This is a Rust project built for Bart Massey's Rust course in Spring 2023. It has been adapted to connect with the tuber database.

The full version of the project operates as a standalone version of this service. It is packaged with a Crate that generates a local seeded mock version of Tuber's postgres database and can be found in this repo:
https://github.com/kiraoyd/Rustys-Root-Review




### Will dockerize this service eventually, but for now....
## To start the microservice


From the top level tuberTrader directory:

run: ```docker compose build --no-cache```

run: ```docker compose up``` to start the postgres database, backend, frontend, and Django microservice.

```cd root_review```

```cargo run``` to run this microservice.

Navigate to http://localhost/ to view the site

## To test this service

Hit the routes from postman once the server is listening:

https://www.postman.com/

From the Postman application...

...to get a JSON reply that shows the profile who spent the most on turnips, make a GET request to: ```localhost:3333/spender```

...to get a JSON reply that shows the max profits possible for island #6 at a selling price of 262, make a GET request to: ```localhost:3333/profits/262/6```

...to get a JSON reply that shows the most profitable island profile if the selling price is 110, make a GET request to: ```localhost:3333/profits/110```

### CITATIONS

Citations are provided in the files as comments, and other resources are mentioned in the JOURNAL.md file.

I'd like to double cite Casey Bailey here as well.
The template for the server, router, and AppError work in the root_review crate came directly from his doggr_w23 repo example: auth_rs.
A copy of this repo can be found here: https://github.com/kiraoyd/doggr_w23/tree/master/auth_rs


### LICENSE

This work is licensed under the 'MIT License'. Please see the file LICENSE.txt in this distribution for license terms.