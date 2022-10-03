.PHONY: clean dev

clean:
	rm -rf web
	mkdir -p web

build: clean
	touch web/.nojekyll
	npx webpack

dev: clean
	npx webpack serve

deploy-github:
	git subtree push --prefix web origin gh-pages
