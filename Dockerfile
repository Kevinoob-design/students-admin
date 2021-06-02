FROM node:14.16.0

WORKDIR /usr/src/students-admin

COPY ./package*.json ./

RUN npm install \ 
    npm run build-client

COPY ./ ./

CMD [ "/bin/bash" ]
