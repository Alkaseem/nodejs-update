import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/Alert/Alert";
import Routes from './components/Routes/Routes';
import './oga.css'
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column parent">
          <div className="oga">
          <Alert />
          <Switch>        
            <Routes/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
