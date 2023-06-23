Run backend from Docker:

```docker compose up backend```

During development, if Docker fails try clearing the cache:

```docker compose build --no-cache backend```

then rerunning ```docker compose up backend```