# User/Authentication Microservice

This basic user/authentication microservice contains the basic principles of user authentication and user credential storage.

## Usage

Clone this repository using the remote repository link:

```bash
git clone 
```

Once cloned, cd into the repository and run the `docker-compose.yaml` using [docker](https://www.docker.com).

```bash
cd user-service
docker compose up
```

This creates two docker instances, one running [mongodb](https://www.mongodb.com) and the other running an [ExpressJS](https://expressjs.com)

> NOTE: This service is meant to be used in conjunction with other microservices. This provides cookie JWT authentication as well as user information management.

## License

[MIT](https://choosealicense.com/licenses/mit/)
