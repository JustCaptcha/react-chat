import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import MainPage from './containers/MainPage/MainPage';
import ChatPage from './containers/ChatPage/ChatPage';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
// import socket from './socket';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={MainPage}></Route>
            <Route exact path='/chat' component={ChatPage}></Route>
          </Switch>
        </Router>
      </div>
      </Provider>
    );
  }
}

export default App;