FROM node:8.6.0

ENV PORT=5000

RUN npm install -g nodemon

RUN npm install -g babel-cli

# Define working directory.
WORKDIR /src

# Bundle code
COPY . /src

RUN npm install

EXPOSE 5000
CMD npm start