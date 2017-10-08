const Style = require('../css/style.scss');
import Main from'./Components/main.jsx';
import Login from'./Components/login.jsx';
import Home from'./Components/home.jsx';
import Registro from'./Components/registro.jsx';
import NewPost from'./Components/newpost.jsx';
import ShowPost from'./Components/showpost.jsx';
import Profile from'./Components/profile.jsx';

import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

  
    
 ReactDOM.render((
  <Router>
  <div>
    <Route exact path="/"  component={Home} />
    <Route exact path="/login"  component={Login} />
    <Route exact path="/registro"  component={Registro} />
    <Route exact path="/newpost"  component={NewPost} />
    <Route exact path="/showpost"  component={ShowPost} />
    <Route exact path="/profile"  component={Profile} />

    </div>
  </Router>
), document.getElementById('app'));