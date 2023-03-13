# Optimism Dockerfile

Sets up the environment required to run Optimism

## Build

```bash
# On M1/M2 proccessors
docker build --platform linux/x86_64 -t opclave .

# Linux
docker build -t opclave .
```

## Run

```bash
# On M1/M2 proccessors
docker run --platform linux/x86_64 -it --rm opclave bash

# Linux
docker run -it --rm opclave bash
```

`-it` makes the session interactive
`--rm` removes the container after it is closed

