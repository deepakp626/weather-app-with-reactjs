import React, { Component } from "react";
import Header from "./Header";
import Home from "./Home";
import Weather from "./Weather";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid p-0">
          <Header />
          <Switch>
            <Route path="/weather" >
              <Weather />
            </Route>
            <Route path="/" >
              <Home />
            </Route>
            <Weather />
          </Switch>
        </div>
       </Router>
    );
  }
}
