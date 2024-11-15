import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import typeDefs from './graphql/schema.js';
import customerResolvers from './graphql/resolvers/customer.js';
import { handleError } from './utils/errorHandler.js';
import logger from './logging/logger.js';

dotenv.config();

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers: customerResolvers,
    });

    // Start the Apollo Server before applying middleware
    await server.start();

    // Apply Apollo Server as middleware to the Express app
    server.applyMiddleware({ app });

    app.use((err, req, res, next) => {
        handleError(err, res);
    });

    app.listen(process.env.PORT, () => {
        logger.info(`Server running on http://localhost:${process.env.PORT}${server.graphqlPath}`);
    });
};

// Start the server
startServer().catch((error) => {
    logger.error(`Failed to start the server: ${error.message}`);
});