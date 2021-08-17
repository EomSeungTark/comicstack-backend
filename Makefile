.ONESHELL:
.PHONY: statik all

all_win:
	$(MAKE) statik_win
	go build -o app ./main.go

all_mac:
	$(MAKE) statik_mac
	go build -o app ./main.go

statik_mac:
	cd webapp && yarn && yarn build && cd ..
	~/go/bin0/statik -src=./webapp/build

statik_win:
	cd webapp && yarn && yarn build && cd ..
	statik -src=webapp\build

clean:
	rm -rf ./statik
