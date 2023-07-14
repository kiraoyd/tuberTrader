FROM rust:buster as builder

WORKDIR /app
RUN USER=root cargo new --bin root_review
COPY Cargo.toml Cargo.lock ./root_review/

WORKDIR /app/root_review
RUN cargo build

COPY ./ ./
RUN cargo build

FROM debian:stable-slim
RUN apt update \
    && apt install -y openssl ca-certificates \
    && apt clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

COPY --from=builder /app/root_review/target/debug/root_review ./

CMD ["/app/root_review"]