import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "./components/App";

import "./css/styles_variables.css"
import "./css/styles_main.css"
import "./css/styles_game.css"
import "./css/styles_control.css"
import "./css/styles_header.css"
import "./css/styles_information.css"
import "./css/styles_score.css"
import "./css/styles_settings.css"
import "./css/styles_wrappers.css"

// WIP
import "./css/styles_wip.css"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);