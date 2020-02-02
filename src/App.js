import React from "react";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
// import { Rehydrated } from "aws-appsync-react";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import awsconfig from "./aws-exports";
import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache
} from "@apollo/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Todos from "./components/Todos";
import Navbar from "./components/Navbar";
import NewTodo from "./components/NewTodo";

Amplify.configure(awsconfig);

const url = awsconfig.aws_appsync_graphqlEndpoint;
const region = awsconfig.aws_appsync_region;
const auth = {
  type: awsconfig.aws_appsync_authenticationType,
  jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
};

const link = from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth })
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Navbar onSignOut={() => Auth.signOut()} />
        <div className="container">
          <NewTodo />
          <Todos />
        </div>
      </React.Fragment>
    </ApolloProvider>
  );
}

export default withAuthenticator(App);
