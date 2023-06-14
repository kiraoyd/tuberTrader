# Rust's Root Review

A microservice for Tuber Trader

This is a Rust project build for Bart Massets Intro to Rust course in Spring 2023.
It uses an axum server and tokio runtime. 

It has been adapted to connect with the tuber database.

It's route query tuber's profile table to grab information about the islands.

## Will dockerize, but for now....
## To start the microservice


From the top level tuberTrader directory:

```docker compose up postgres``` to start the database,

```cd root_review```

```cargo run``` to run this microservice.

## To hit the routes from postman once the server is running:

https://www.postman.com/
From the Postman application...

>...to get a JSON reply that shows the profile who spent the most on turnips, make a GET request to: **localhost:3333/spender**
>
>...to get a JSON reply that shows the max profits possible for island #6 at a selling price of 262, make a GET request to: **localhost:3333/profits/262/6**
>
>...to get a JSON reply that shows the most profitable island profile if the selling price is 110, make a GET request to: **localhost:3333/profits/110**




