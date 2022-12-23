# NestJS Boilerplate

Boilerplate to initialize new project.

This project use [Node](https://nodejs.org/en/docs/) with [NestJS framework](https://docs.nestjs.com/), [PrismaJS](https://www.prisma.io/docs/getting-started) and [Docker](https://docs.docker.com/engine/install/).

The project contain some features:
- Softdelete
- ACL
- Basic login and authorization system with [Passport](https://docs.nestjs.com/security/authentication)

## Installation

You will need to install docker and configure docker-compose.

[Docker Install](https://docs.docker.com/engine/install/)

[Docker Compose Install](https://docs.docker.com/compose/install/linux/)

## Usage

To start the project
```bash
bash .scripts/up.sh
```
To run the migrations and populate the database
```bash
bash .scripts/db.sh
```

To access the project documentation

[http://localhost:3000/api/v1/docs/](http://localhost:3000/api/v1/docs/)

A base administrator login will be create, use the curl for test:
```
curl --location --request POST 'http://localhost:3000/api/v1/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "admin@admin.com",
  "password": "admin"
}'
```

To run the unit tests
```bash
docker exec api npm run test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)