// const createBrowserHistory = require("history").createBrowserHistory;
// export default createBrowserHistory({});

import { createBrowserHistory } from "history";

const history = createBrowserHistory(); // or createHashHistory()
export default history;