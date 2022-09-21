<p align="center">
  <img  src="./assets/repoprovas.png" width=400px>
</p>
<h1 align="center">
  RepoProvas
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" height="30px"/>
</div>

<br/>

# Description

RepoProvas simulates an API that stores and finds tests, making it possible to list them by discipline or teacher.

</br>

## Features

-   Create an account
-   Store a test
-   List tests by discipline
-   List tests by teachers

</br>

## API Reference

### Create an account

```http
POST /signup
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `email` | `string`| **Required**. e-mail                    |
| `password`       | `string` | **Required**. password       |
| `confirmPassword`       | `string` | **Required**. password confirmation       |

####

#

### Login

```http
POST /login
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `email` | `string`| **Required**. e-mail                    |
| `password`       | `string` | **Required**. password       |

Response:
```json
{
  "token": "iIsInR5cCI6Ik.jE2NjMwMDg2NTF9.36UsZxcxCFpecWo"
}
```
`Note: The token expires in 1 day.`
####

#

### Store a test

```http
POST /tests
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `name`       | `string` | **Required**. name of test       |
| `pdfUrl` | `string`| **Required**. url of pdf                    |
| `discipline`       | `string` | **Required**. name of discipline       |
| `category`       | `string` | **Required**.  name of category       |
| `teacher`       | `string` | **Required**.  name of teacher       |

`Note: discipline, category and teacher must be previously registered in the database.`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

#

### List tests by discipline

```http
GET /tests/discipline
```

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

Example of Response:
```json
[
  {
    "number": 1,
    "Disciplines": [
      {
        "name": "React",
        "teachersDisciplines": [
          {
            "teacher": {
              "name": "Diego Pinho"
            },
            "Tests": [
              {
                "name": "2022.2 - Driven Plus",
                "pdfUrl": "https://www.npmjs.com/",
                "category": {
                  "name": "Projeto"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "Autoconfiança",
        "teachersDisciplines": [
          {
            "teacher": {
              "name": "Bruna Hamori"
            },
            "Tests": []
          }
        ]
      }
    ]
  }
]
```

`Note: the tests are also sorted by term.`

#

### List tests by teachers

```http
GET /tests/teachers
```

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

Example of Response:
```json
[
  {
    "name": "Diego Pinho",
    "teachersDisciplines": [
      {
        "discipline": {
          "name": "JavaScript"
        },
        "Tests": []
      },
      {
        "discipline": {
          "name": "React"
        },
        "Tests": [
          {
            "name": "2022.2 - Driven Plus",
            "pdfUrl": "https://www.npmjs.com/",
            "category": {
              "name": "Projeto"
            }
          }
        ]
      }
    ]
  },
  {
    "name": "Bruna Hamori",
    "teachersDisciplines": [
      {
        "discipline": {
          "name": "Planejamento"
        },
        "Tests": []
      }
    ]
  }
]
```

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (see .env.example).

On .env file:

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`SHADOW_DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName (note: considering that the deployment will be on heroku)`  

`PORT = number #recommended: 5000`

`TOKEN_SECRET_KEY = any string`

`TOKEN_EXPIRES_IN = (recommended: 1d. for more info see jsonwebtoken documentation)`

On .env.test file:
`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`TOKEN_SECRET_KEY = any string`

`TOKEN_EXPIRES_IN = (recommended: 1d. for more info see jsonwebtoken documentation)`

</br>

## Run Locally

Clone the project

```bash (for SSH)
  git clone git@github.com:danton03/projeto20-repoprovas.git
```

or

```bash (for HTTPS)
  git clone https://github.com/danton03/projeto20-repoprovas.git
```

Go to the project directory

```bash
  cd projeto20-repoprovas
```

Install dependencies

```bash
  npm install
```

Create database
```bash
  npx prisma migrate dev
```

Start the server

```bash
  npm run dev
```

Run integration tests

```bash
  npm run dev
```

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)
-   [Happy women learning language - pch.vector](https://www.freepik.com/free-vector/happy-women-learning-language-online-isolated-flat-vector-illustration-cartoon-female-characters-taking-individual-lessons-through-messenger-education-digital-technology-concept_10613101.htm#query=school%20test&position=2&from_view=search")

</br>

## Authors

-   Danton Matheus is a Full Stack Web Development student at Driven Education and engineering academic passionate about technology. 

<br/>

#