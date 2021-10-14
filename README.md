# Fizzbuzz sandbox test
## Goal

The original fizz-buzz consists in writing all numbers from 1 to 100, and just replacing all multiples of 3 by "fizz", all multiples of 5 by "buzz", and all multiples of 15 by "fizzbuzz". The output would look like this: "1,2,fizz,4,buzz,fizz,7,8,fizz,buzz,11,fizz,13,14,fizzbuzz,16,...".

Your goal is to implement a web server that will expose a REST API endpoint that:

Accepts five parameters : three integers int1, int2 and limit, and two strings str1 and str2.

Returns a list of strings with numbers from 1 to limit, where: all multiples of int1 are replaced by str1, all multiples of int2 are replaced by str2, all multiples of int1 and int2 are replaced by str1str2.

The server needs to be:

 - Ready for production
 - Easy to maintain by other developers 

Add a statistics endpoint allowing users to know what the most frequent request has been.
This endpoint should:

- Accept no parameter
- Return the parameters corresponding to the most used request, as well as the number of hits for this request

## Behavior

A `Get` call on the `/fizzbuzz` endpoint expects 5 parameters:
All values are optional, they will revert to there default if no value is specified.

| Parameter      	| Description                                                       	| Limitations                   	| Default value 	|
|----------------	|-------------------------------------------------------------------	|-------------------------------	|---------------	|
| `integer1`     	| first number to replace                                           	| Should be a integer, positive 	| `0`           	|
| `integer2`     	| second number to replace                                          	| Should be a integer, positive 	| `0`           	|
| `limit`        	| upper limit of the count                                          	| Should be a integer, positive, and less than `1000` 	| `10`          	|
| `replacement1` 	| string to be replaced for each number divisible by `integer1`     	| Should be a string            	| `''`          	|
| `replacement2` 	| string to be replaced for each number divisible by <br>`integer2` 	| Should be a string            	| `''`          	|

Usage example: `http://localhost:3000/fizzbuzz?integer1=3&integer2=5&limit=10&replacement1=fizz&replacement2=buzz`

See configuration for additional info on the default values.

## Configuration

The following environment variables are available.
All values or optional, default values will be used if the variable is not set.

| Name                    	| Description                                                                                                                                                                        	| Default value 	|
|-------------------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|---------------	|
| `PORT`                  	| Port on which the API is listening                                                                                                                                                 	| `3000`        	|
| `HOST`                  	| Hostname indication<br>Just used for the starter hint<br>Will not impact the runtime                                                                                               	| `localhost`   	|
| `SCHEME`                	| Http or Https<br>Just used for the starter hint<br>Will not impact the runtime                                                                                                     	| `http`        	|
| `MAXIMUM_LIMIT`         	| Maximum limit value, in order to cap the max sequence length.<br>The API will fall back to the `DEFAULT_LIMIT`<br>if the user specifies a `limit` greater than the `MAXIMUM_LIMIT` 	| `1000`        	|
| `DEFAULT_LIMIT`         	| Default limit, used if no value is specified by the user,<br>or in case of a bad value                                                                                             	| `100`         	|
| `MINIMUM_INTEGER`       	| Minimum value for the integer, should be `0`                                                                                                                                       	| `0`           	|
| `DEFAULT_INTEGER_1`     	| Default value for the 'integer 1', used by default for integer 1<br>if no value is specified by the user, or in case of a bad value                                                	| `0`           	|
| `DEFAULT_INTEGER_2`     	| Default value for the 'integer 2', used by default for integer 2<br>if no value is specified by the user, or in case of a bad value                                                	| `0`           	|
| `DEFAULT_REPLACEMENT_1` 	| Default value for the 'replacement 1', used by default for remplacement 1<br>if no value is specified by the user, or in case of a bad value                                       	| `''`          	|
| `DEFAULT_REPLACEMENT_2` 	| Default value for the 'replacement 2', used by default for remplacement 2<br>if no value is specified by the user, or in case of a bad value                                       	| `''`          	|
| `MAX_STAT_COUNT`      	| Maximum number of tracked usages.<br>The least used one will be scraped if a new request comes in.                                      	| `10`          	|

No `.env` support for the node runtime is done, if a conf change in standalone mode is required, the env variables must be set up in the shell before launching the server.
Example:
```shell
export PORT=443
export SCHEME=https
node dist/main.js
```


In docker mode, the docker compose is setup to pickup a `server.env` file.\
A template of an `env` file can be found in the `/docker` folder.\
Do not push your own `env` file.

## Usage

The project can be launched in standalone mode (via npm and local install), or via docker.

## Standalone mode

### Prerequise

`nodejs` runtime `14.17` or later.

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

### Prerequisite

Docker installed on the local environment.

### Launching the stack
Run the following script (no Windows version, sorry):
```shell
./start-stack.sh
```
It will install node modules locally and launch the stack via a `docker-compose`.

### Stack overview
- Api server: `http://localhost:3000/swagger`
- Grafana: `http://localhost:9990/`
- Prometheus: `http://localhost:/9991`

## Stay in touch

- Author - Guillaume GIRARD

## License

Nest is [MIT licensed](LICENSE).

## Benchmark

### Performance testing
Simple `ab` script is available :
```shell
./benchmark/ab.sh
```

### Load testing
`k6s` script in WIP.

## Current implementation

This project has been implemented with NestJS, version `8.0.0`.\
The current implementation is "naive" architecture wise.\
Controllers are lightweight and only pass on the workload to dedicated services.

![](documentation/assets/overview.png)

A swagger is available on `http://localhost:3000/swagger`.

A Prometheus module has been added to provide monitoring (during the loadtest). 

## CI
Using Github actions from the marketplace:
- [Coverage report action](https://github.com/ArtiomTr/jest-coverage-report-action)
- [Docker build push action](https://github.com/docker/build-push-action)

The CI will run the following tasks:
- Run all tests
- Production build and push docker image to [docker hub](https://hub.docker.com/repository/docker/scougirou/fizzbuzz)


## TODO
- done: ~~Implement fizzbuzz controller~~
- done: ~~Implement fizzbuzz service tests~~
- done: ~~Implement fizzbuzz service~~
- done: ~~Add swagger~~
- done: ~~Implement stat controller~~
- done: ~~Implement stat service tests~~
- done: ~~Implement stat service~~
- done: ~~Dockerize build~~
- done: ~~Setup CI, run build and tests~~
- Implement e2e testing / controller testing
- done: ~~Add env configuration~~
- done: ~~Add code coverage report~~
- done: ~~Add benchmark capabilities~~
- done: ~~Add monitoring~~
- done: ~~Cap stat service size to avoid memory leak~~
- Refact DTO / modules to better stick a pertinent architecture
- Add load testing capabilities
- Add `/health` endpoint for k8s readiness probe
- Add redis as an optional stat service
- Add selfsigned certificates
- Add cors whitelist
- Security: best practise pass (remove headers)
- Add release workflow
- Deploy

## Improvements / Nice to have
- Split the fizzbuzz DTO, one for the controller validation, the other to be used in the service / rest of the app.
- Perf: optimise the fizzbuzz string concatenation
- Harden input edge-cases, not sure if everything is covered
- Stat cap: should test the oldest stat removal behavior

## Considerations / Discussions

We do not check if the integer is larger than the limit (ex: integer1 = 50, limit = 10).
  - In this case, the program still works, though the numbers will not be replaced. 

Validation is duplicated with the Nest validation pipes and in the validation function in the service
  - We could argue that this is still useful if we add another way to invoke the service (via messaging for example)
  - This allows the controller to respond quickly with the proper status code
  - Though the business rules are still duplicated

Some naming could be clearer: `integer1` vs `number1`, could be discussed as to what is more explicit to the end user.
