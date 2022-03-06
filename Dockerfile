# ----------------------------------
# Pterodactyl Core Dockerfile
# Environment: NodeJS
# Minimum Panel Version: 1.x.x
# ----------------------------------
FROM     node:17-bullseye

LABEL    Raiden.Dev="ferrelymichaellie@gmail.com"

RUN      adduser --disabled-password --home /home/container container

USER     container
ENV      USER=container HOME=/home/container

WORKDIR  /home/container

COPY     package.json .

RUN      npm install

COPY     . .

EXPOSE    5000

COPY     ./entrypoint.sh /entrypoint.sh

CMD      ["/bin/bash", "/entrypoint.sh"]