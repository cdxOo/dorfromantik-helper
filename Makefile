.PHONY: clean dev

clean:
	rm -rf web
	mkdir -p web

dev: clean
	npx webpack serve
