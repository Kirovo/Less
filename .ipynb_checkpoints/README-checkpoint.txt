                                README
____________________________________________________________________

To use the progam you should use the following command:

For the src file:
    $ npm run start

For the build file:
    $ node build/index.js

For both intialisation of the server you will need to add the following kind of end points:

=>   http://localhost:3000/api/images?name=fjord&width=500&height=500


For more informations, scripts in "package.json" are written this way:

lint:"eslint . --ext .ts"
prettier:"prettier --config .prettierrc 'src/**/*.ts' --write"
build:"npx tsc"
jasmine:"jasmine"
test:"npm run build && npm run jasmine"
start:"nodemon src/index.ts"