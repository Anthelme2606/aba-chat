import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import ExpressFileUpload from 'express-fileupload';
import cors from 'cors';
import http from 'http';
import context from './context/context';
import morgan from 'morgan';
import connectDB from './lib/mongodb';
import typeDefs from './src/graphql/types/index';
import resolvers from './src/graphql/resolvers/index';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const PORT = process.env.PORT || 4000;

// interface User {
//     id: string;
//     username: string;
// }

const startServer = async () => {
    const app = express();

    // Connect to the database
    await connectDB();

    // Middleware setup
    app.use(morgan('dev')); // Logging middleware
    app.use(ExpressFileUpload()); // File upload middleware
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use(cors()); // Enable CORS for all routes
    app.use(express.json()); // Parse JSON bodies

    // HTTP and WebSocket servers
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    // PubSub instance for subscriptions
    const pubsub = new PubSub();

    // Create schema from type definitions and resolvers
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // WebSocket cleanup setup
    const serverCleanup = useServer({ schema }, wsServer);

    // Initialize ApolloServer with schema and plugins
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose(); // Dispose WebSocket connections
                        }
                    };
                }
            }
        ],
        formatError: (err) => {
            console.error("GraphQL Error:", err.message); // Log errors for debugging
            return { message: err.message };
        },
        csrfPrevention: false, // CSRF prevention can be enabled if needed
        includeStacktraceInErrorResponses: false, // Hide stack trace from error responses for security
    });

    // Start the Apollo Server
    await server.start();

    // Apply middleware for file uploads and GraphQL endpoint
    app.use(
        '/graphql',
        graphqlUploadExpress(),
        expressMiddleware(server, {
          context: async ({ req }) => {
            const user = await context({ req });
            return { user, pubsub }; 
          },
        })
      );
      

    // Start the HTTP server
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
};

// Start the server
startServer();
