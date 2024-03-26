APP_NAME = poke-app

.PHONY: dev clean run compose

dev:
	docker build -t ${APP_NAME} -f Dockerfile .

clean:
	docker rmi -f ${APP_NAME}

run:
	docker run -d -it -p 3000:3000 ${APP_NAME}

compose:
	docker-compose -f docker-compose.yml up
