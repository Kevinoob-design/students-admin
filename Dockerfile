# Angular App Build.
FROM node:14.16.0 AS client-build
WORKDIR /usr/src/students-admin
COPY www/ ./www/
RUN cd www && npm install && npm run build

# Server App setup.
FROM node:14.16.0 AS server
WORKDIR /usr/src/students-admin
COPY server/ ./server/
RUN cd server && npm install && mkdir uploads

# Final dokcerize
FROM node:14.16.0
WORKDIR /usr/src/students-admin
COPY --from=client-build /usr/src/students-admin/www/dist ./dist
COPY --from=server /usr/src/students-admin/server ./

CMD [ "/bin/bash" ]
