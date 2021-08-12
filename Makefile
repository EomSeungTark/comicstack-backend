.ONESHELL:
.PHONY: statik all

all:
	$(MAKE) statik
	go build -o app ./main.go

statik:
	cd webapp && yarn && yarn build && cd ..
	~/go/bin/statik -src=./webapp/build

clean:
	rm -rf ./statik
