import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "./Login";
import { CreateUser } from "./CreateUser";

export const Router: React.FC = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>

    <Route exact path="/user/create">
      <CreateUser />
    </Route>
  </Switch>
);
