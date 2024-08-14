up:
	docker-compose up -d --remove-orphans
down:
	docker-compose down
restart:
	docker-compose restart
dev:
	docker-compose exec node npm run dev
build:
	docker-compose exec node npm run build
install:
	docker-compose exec node npm i

serve:
	docker-compose exec node npm run serve

image:
	docker build -t gentech:latest .

deploy:
	docker build -t gentech:latest .
	docker tag gentech cr.yandex/crpp52fodr8a2rab1tn5/gentech
	docker push cr.yandex/crpp52fodr8a2rab1tn5/gentech

