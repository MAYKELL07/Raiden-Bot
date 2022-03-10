FROM     node:17-alpine

LABEL    Raiden.Dev="ferrelymichaellie@gmail.com"

RUN      apk add  --no-cache ffmpeg imagemagick

COPY     package.json .

RUN      npm install

COPY     . .

EXPOSE    80

CMD      ["npm", "start"]