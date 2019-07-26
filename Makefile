DEV_HOST ?= 0.0.0.0
DEV_PORT ?= 8000
ARGS?=

GIT_SHA = $(shell git rev-parse HEAD)
TAG = yuchenq/react-ui-docker
TAG_DEV = yuchenq/react-ui-docker-dev
VOLUME_MOUNTS=-v $(PWD):/usr/app/

all:build

build:
	docker build -t $(TAG):$(GIT_SHA) . \
		&& docker tag $(TAG):$(GIT_SHA) $(TAG):latest

build-dev:
	docker build -f dev.Dockerfile -t $(TAG_DEV):$(GIT_SHA) . \
		&& docker tag $(TAG_DEV):$(GIT_SHA) $(TAG_DEV):latest

run-dev:
	docker run -it --rm -p $(DEV_PORT):$(DEV_PORT) $(VOLUME_MOUNTS) $(TAG_DEV) \
		run start:dev --DEV_HOST=$(DEV_HOST) --DEV_PORT=$(DEV_PORT) $(ARGS)

run-npm:
	docker run -it --rm $(VOLUME_MOUNTS) $(TAG_DEV) $(ARGS)

run-%:
	docker run -it --rm $(VOLUME_MOUNTS) $(TAG_DEV) $$(echo $@ | sed 's/run-//') $(ARGS)

.PHONY: build build-dev run-dev run-npm
