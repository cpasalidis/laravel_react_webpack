import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import CardContainer from "./components/CardContainer";
import NotFound from "./components/NotFound";
//redux
import { Provider } from "react-redux";
import store from "./store"

class ReactApp extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CardContainer} />
        <Route component={NotFound} />
      </Switch>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default ReactApp;
