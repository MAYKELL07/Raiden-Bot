FROM     node:17-alpine

LABEL    version="1.0.0"
LABEL    Raiden.Dev="ferrelymichaellie@gmail.com"

RUN      apk add  --no-cache ffmpeg imagemagick git

COPY     package.json .

RUN      npm install

COPY     . .

EXPOSE    80

CMD      ["npm", "start"]