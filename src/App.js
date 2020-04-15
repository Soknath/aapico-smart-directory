import React, { Component } from 'react';
import { Route, Router} from 'react-router-dom';
import Tab from './Tabs';
import history from './history';
import "prevent-pull-refresh";
import { AnimatePresence } from "framer-motion";

class App extends Component {

  render() {
    return (
      <AnimatePresence>
        <Router history={history}>        
            <div>
              <Route path={'/'} component={props => <Tab {...props} />} />
            </div>
        </Router>
      </AnimatePresence>
    );
  }
}

export default App;
