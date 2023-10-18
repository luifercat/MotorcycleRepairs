# API-MOTORCYCLES

_The API IS capable of scheduling
appointments for users, and that employees can update when the motorcycles are ready for
pick them up_

## Installed libraries or tools

sh
npm init -y
npm i express
npm i -D nodemon
docker-compose up
npm i env-var
npm i dotenv
npm i sequelize
npm i pg pg-hstore

### Endpoints Users and Repairs

#### Users

| HTTP   | URL                                   | Description                                          |
| ------ | ------------------------------------- | ---------------------------------------------------- |
| GET    | http://localhost:3002/api/v1/users/   | returns all users                                    |
| GET    | http://localhost:3002/api/v1/users/id | returns a single user by id                          |
| POST   | http://localhost:3002/api/v1/users/   | create a user                                        |
| PATCH  | http://localhost:3002/api/v1/users/id | update user                                          |
| DELETE | http://localhost:3002/api/v1/users/id | they are not deleted, they change from true to false |

#### Repairs

| HTTP   | URL                                     | Description                                          |
| ------ | --------------------------------------- | ---------------------------------------------------- |
| GET    | http://localhost:3002/api/v1/repairs/   | returns all repairs                                  |
| GET    | http://localhost:3002/api/v1/repairs/id | returns a single repair by id                        |
| POST   | http://localhost:3002/api/v1/repairs/   | create a repair                                      |
| PATCH  | http://localhost:3002/api/v1/repairs/id | update repair                                        |
| DELETE | http://localhost:3002/api/v1/repairs/id | they are not deleted, they change from true to false |
