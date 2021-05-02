import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Route, Switch } from "react-router-dom";
import { Button, CssBaseline } from "@material-ui/core";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core/styles";
import loadable from '@loadable/component'
import theme from "../shared/theme";
import clientConfig from "../shared/apolloConfig";
import * as metadata from "./metadata";
import Login from "./pages/Login/Login"
import PrivateRoute from "./auth/privateroute"

const LoadableLogin = loadable(() => import('./pages/Login/Login'));

const LoadableHome= loadable(() => import('./pages/Home/Home'));

const LoadableUserProfile= loadable(() => import('./pages/profile/user-profile'));

const LoadableSettings= loadable(() => import('./pages/settings/settings'));

const LoadableMessage= loadable(() => import('./pages/direct-message/direct-message'));

const App = () => {
  return (
    <ApolloProvider client={clientConfig}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="App">
      <Helmet
        title={metadata.title}
        meta={metadata.meta}
        link={metadata.link}
        script={metadata.script}
        noscript={metadata.noscript}
      />
      <div className="css-main">
        <div className="r-main1">
          <Switch>
            <PrivateRoute exact path="/" component={LoadableHome} />
            <Route exact path="/login" component={LoadableLogin} />
            <PrivateRoute exact path="/settings" component={LoadableSettings} />
            <PrivateRoute exact path="/settings/security" component={LoadableSettings} />
            <PrivateRoute exact path="/settings/notification" component={LoadableSettings} />
            <PrivateRoute exact path="/settings/subscriptions" component={LoadableSettings} />
            <PrivateRoute exact path="/settings/billing/card" component={LoadableSettings} />
            <PrivateRoute exact path="/settings/billing/payments" component={LoadableSettings} />
            <PrivateRoute exact path="/message" component={LoadableMessage} />
            <PrivateRoute exact path="/message/:conversationId" component={LoadableMessage} />
            <PrivateRoute exact path="/:user" component={LoadableUserProfile} />
          </Switch>
        </div>
      </div>
    </div>
    </ThemeProvider>
    </ApolloProvider>
  )
}

export default App;