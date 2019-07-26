GIT_SHA = $(shell git rev-parse HEAD)
TAG=yuchenq/react-ui-docker

all:build

.ONESHELL:
build:
	docker build -t $(TAG):$(GIT_SHA) .
	docker tag $(TAG):$(GIT_SHA) $(TAG):latest

.PHONY: build
