import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Areas from "./pages/areas";
import Cook from "./pages/cook";
import Details from "./pages/details";
import Explorer from "./pages/explorer";
import ExplorerPage from "./pages/explorerPage";
import Login from "./pages/login";
import Recipes from "./pages/recipes";
import Ingredients from "./pages/ingredients";
import Favorites from "./pages/favorites";
import Profile from "./pages/profile";
import Done from "./pages/done";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/favorites" render={() => <Favorites />} />
        <Route path="/done" render={() => <Done />} />
        <Route
          path="/recipes/:page/:recipe/cook"
          render={({ location }) => <Cook location={location} />}
        />
        <Route
          path="/recipes/:page/:recipe"
          render={({ location }) => <Details location={location} />}
        />
        <Route
          path="/recipes/:page"
          render={({ location }) => <Recipes location={location} />}
        />
        <Route path="/explorer/meals/areas" render={() => <Areas />} />
        <Route
          path="/explorer/:page/ingredients"
          render={({ location }) => <Ingredients location={location} />}
        />
        <Route
          path="/explorer/:page"
          render={({ location }) => <ExplorerPage location={location} />}
        />
        <Route path="/explorer" render={() => <Explorer />} />
      </Switch>
    </Router>
  );
}

export default App;
