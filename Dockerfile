# ----------------------------------
# Pterodactyl Core Dockerfile
# Environment: NodeJS
# Minimum Panel Version: 1.x.x
# ----------------------------------
FROM     node:17-bullseye

LABEL    Raiden.Dev="ferrelymichaellie@gmail.com"

RUN      apt install -y ffmpeg webp imagemagick
RUN      adduser -D -h /home/container container

USER     container
ENV      USER=container HOME=/home/container

WORKDIR  /home/container

COPY     package.json .

RUN      npm install

COPY     . .

EXPOSE    5000

COPY     ./entrypoint.sh /entrypoint.sh

RUN      chmod +x /entrypoint.sh

CMD      ["/bin/bash", "/entrypoint.sh"]