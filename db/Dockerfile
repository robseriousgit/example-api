FROM node:8.6.0

ENV PORT=5000

RUN npm install -g nodemon

# Define working directory.
WORKDIR /src

# Bundle code
COPY . /src

# init sqlite_extensions
COPY ./sqlite_extensions /db/sqlite_extensions

RUN gcc -g -fPIC -shared /db/sqlite_extensions/extension-functions.c -o /db/sqlite_extensions/extension-functions.so

RUN npm install --build-from-source

EXPOSE 5000
CMD npm start