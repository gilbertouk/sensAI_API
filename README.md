# sensAI_API
## Description
sensAI_API is the back end for [sensAI](https://github.com/RonaldB123/sensAI) which is an AI enhanced learning and management platform created as a group project during the July 2023 NorthCoders bootcamp.

## Getting Started
### Prerequisites
- Node
- Git
- Express
- PostgresSQL
- openai
- mongodb

### Installing dependencies
Paste into terminal
```
npm i
```

### Environment Variables
#### Database
We need to create environment variables for our database.

Create a file called `.env.development` in the base root of the repository.

Paste inside the `.env.development` file:

```
PGDATABASE=sensai
```

Create another file called `.env.test` in the base root of the repository.

Paste inside the `.env.test` file:

```
PGDATABASE=sensai_test
```

#### OpenAI

We need to create environment variables for Openai.

Create a file called `.env.OPENAI_API_KEY` in the base of the repository.

Paste inside the `.env.OPENAI_API_KEY` file:

```
OPENAI_KEY =
```

Populate the `OPENAI_KEY` variable with your own OpenAI API key.

See more about creating an [OpenAI key](https://www.maisieai.com/help/how-to-get-an-openai-api-key-for-chatgpt).

#### MongoDB

We need to create environment variables for MongoDB.

Create a file called `.env` in the base of the repository.

Paste inside the `.env` file:
```
MONGODB_URI=
```

Populate the `MONGODB_URL` variable with your own MongoDB URL.

The URL will be in the format of `mongodb+srv://<username>:<password>@cluster0-yyarb.mongodb.net/<database>?retryWrites=true&w=majority`.

### Setting up and Seeding Database

We need to create the `sensai` and `sensai_test` databases.

Paste in the terminal:

```
npm run setup-dbs
```

We then need to seed the `sensai` and `sensai_test` databases with data.

Paste in the terminal:

```
npm run seed
```

### Hosting

In order for [sensAI](https://github.com/RonaldB123/sensAI) to access the back end we locally host it.

Paste in the terminal:

```
npm run start
```

You should now be ready to go onto [sensAI](https://github.com/RonaldB123/sensAI) to follow the instructions.