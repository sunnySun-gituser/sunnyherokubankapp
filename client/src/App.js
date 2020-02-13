import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser  } from './actions/authActions';
import PrivateRoute from './components/private-route/PrivateRoute';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token to keep user logged in
    // been here before
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);

      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        // expired
        dispatch(logoutUser());
        // Redirect to login
        props.history.push("/login");
      }
    }
  })

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
