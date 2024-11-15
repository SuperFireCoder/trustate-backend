import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = new ApolloServer({
    typeDefs: 'type Query { hello: String }',
    resolvers: {
        Query: {
            hello: () => 'Hello, world!',
        },
    },
});

server.applyMiddleware({ app });

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
});