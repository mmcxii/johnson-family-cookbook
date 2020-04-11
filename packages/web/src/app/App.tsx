import React from "react";

import logo from "../logo.svg";
import "./App.css";
import { DisplayUsers } from "../components/DisplayUsers";

export const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      <DisplayUsers />
    </header>
  </div>
);
