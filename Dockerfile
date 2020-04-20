FROM python:2.7.17-buster

RUN apt-get update
RUN apt-get -y install gcc git make

COPY ./requirements.txt /tmp
RUN pip install -r /tmp/requirements.txt

WORKDIR /opt/server

