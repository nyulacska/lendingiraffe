// said to be a fix for the netlify dev local vuln with glob-parent?

import type { Handler } from "@netlify/functions";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-lambda";
import typeDefs from "../typeDefs";

const server = new ApolloServer({
  mocks: true,
  // @ts-ignore
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  typeDefs,
});

const apolloHandler = server.createHandler();

export const handler: Handler = (event: any, context: any, ...args) => {
  return apolloHandler(
    {
      ...event,
      requestContext: context,
    },
    context,
    ...args
  );
};

// followed by the build
/* 
npm install netlify-cli -g
npm install
npm run build
netlify dev
*/