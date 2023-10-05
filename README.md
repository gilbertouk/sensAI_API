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

We need to create environment variables for openai.

Create a file called `.env.OPENAI_API_KEY` in the base of the repository.

Paste inside the `.env.OPENAI_API_KEY`:

```
OPENAI_KEY =
```

Populate the `OPENAI_KEY` variable with your own OpenAI API key.

See more about creating OpenAI key