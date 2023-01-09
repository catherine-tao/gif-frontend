import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

disableReactDevTools();

ReactDOM.render(<App />, document.body);
