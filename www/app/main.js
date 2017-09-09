import React from "react";
import dva from "dva";

import 'antd/dist/antd.css';
import route from "./router/router.js";
import home from "./home/action/actions.js";
import core from "./core/action/actions.js";


const app = dva();

app.model(home)
app.model(core)

app.router(route)

app.start("#root");