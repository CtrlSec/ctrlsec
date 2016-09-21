.ONESHELL:

build:
	cd docker
	docker-compose build

up:
	cd docker
	docker-compose up -d

watch:
	./watch.sh

build_up: build up

up_watch: up watch

build_up_watch: build up watch

stop:
	cd docker
	docker-compose stop

down:
	cd docker
	docker-compose down

reup: down up

reup_watch: reup watch

rm_volumes:
	# Remove TODOS os volumes de dados.
	# SE executado sozinho então só apaga os volumes que não estão sendo usados
	# SE executado após o "down" então irá apagar o banco de dados também
	docker volume rm docker_datapersistance

# Os comandos abaixo são executados em todos os containers do docker rodando no seu sistema.
# Não apenas os containers desse projeto.

rm_all_containers:
	# Remove TODOS os containers
	# CUIDADO: Isso pode afetar execuções do docker que são de outros projetos.
	docker rm -f $$(docker ps -q)

rm_all_volumes:
	# Remove TODOS os containers
	# CUIDADO: Isso pode afetar execuções do docker que são de outros projetos.
	docker volume rm $$(docker volume ls -q)

clean_cache:
	# Limpa imagens antigas do docker. Isso pode liberar vários gigas do seu computador.
	# Isso pode afetar execuções do docker que são de outros projetos. (Though it's quite safe)
	docker rm -v $$(docker ps -a -q -f status=exited)
	docker rmi $$(docker images -f "dangling=true" -q)
	docker run -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker:/var/lib/docker --rm martin/docker-cleanup-volumes
