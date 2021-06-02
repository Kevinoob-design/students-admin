FROM node:14.16.0

WORKDIR /usr/src/students-admin

COPY ./server/package*.json ./

RUN npm install

COPY ./ ./

CMD [ "/bin/bash" ]
