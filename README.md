# Bowling game

## Description
This package contains AangularJS application imitating bowling game.
The source of the app is in the `/src` folder.

## Installation
To install all the dependencies and build production-ready code run the following command:
```
npm i
```
The application scripts and assets are put in the `dist` folder. To use them put them on your web server.
It is better to use npm version >= 5.0.3, because in this case the dependency tree will be built in accordance with the `package-lock.json` file and, thus, is guaranteed to work.

## Running the app
To setup a webserver and run the app use the following command:
```shell
npm start
```
The application will be built and a webserver will be setup to serve the application at `http://localhost:8080/` address.

## Testing
Run unit-tests using the command
```shell
npm test
```
You'll be able to see the tests results and tests' coverage in the console's output.
Detailed report for tests coverage can be found in the `/coverage` folder.

## Bulding production ready code
You can build production ready code at any time by running the following command
`npm run build`

## The App file structure and code style
The code structure and code style correspond to the angularjs styleguide https://github.com/toddmotto/angularjs-styleguide
`/src/` folder contains the source files for the application code.
`/node_modules/` contains npm 3d party dependencies
`/dist/` contains results of building the app for production use
`/coverage/` contains unit-tests coverage report
`/static/` contains static files, such as images (currently images for markers clusters only)
