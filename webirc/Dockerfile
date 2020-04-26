FROM node:6.9.4

RUN apt-get update
RUN apt-get -y install gcc git make

RUN git clone https://github.com/Fauntleroy/relay.js.git /opt/relay

COPY ./config.js /opt/relay

WORKDIR /opt/relay

RUN npm install
RUN npm install -g grunt-cli
RUN grunt build
