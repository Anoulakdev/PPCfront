update:
	git pull
	npm i
	pm2 restart all
git:
	git add .
	git commit -m "$m"
	git push origin main
git-dev:
	git add .
	git commit -m "$m"
	git push origin develop
apollo:
	yarn add @apollo/client @apollo/link-error apollo-upload-client deepmerge http isomorphic-unfetch lodash-es
	yarn add -D @types/lodash-es @types/apollo-upload-client