# Makefile for React project

.PHONY: install start build test lint clean

install:
	npm install

start:
	npm start

build:
	npm run build

clean:
	rm -rf node_modules
	rm -rf build
	rm -rf coverage

docker:
	docker build -t ticketimage

up:
	docker-compose up

down:
	docker-compose down
