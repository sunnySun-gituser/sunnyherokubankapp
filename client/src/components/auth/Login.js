import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { loginUser} from '../../actions/authActions';

const Login = (props) => {
    const initialState = {
        email: '',
        password: ''
    }
    // const errors = {};

    const [state, setState] = useState(initialState)
    const dispatch = useDispatch();
    //connect to the state
    //afte => assign everything to auth
    const auth = useSelector(state =>state.auth)
    // sign error to errors take error out of state
    const errors = useSelector(state=>state.errors)

    useEffect(() => {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      if (auth.isAuthenticated) {
          props.history.push("/dashboard");
      }
    },[auth.isAuthenticated, props.history])

    const onChange = e =>{
        setState({...state, [e.target.id]: e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault();

        const newUser = {
            email: state.email,
            password: state.password
        }
        dispatch(loginUser(newUser))
        // console.log(newUser)
    }

    return ( 
        <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames('', {
                    invalid: errors.email ||
                    errors.emailnotfound
                })} // 2 types errors
                />
                <label htmlFor="email">Email</label>
                <span className='red-text'>
                    {errors.email}
                    {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames('', {
                    invalid: errors.password ||
                    errors.passwordincorrect
                })} // 2 types errors
                />
                <label htmlFor="password">Password</label>
                <span className='red-text'>
                    {errors.password}
                    {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
     );
}
 
export default Login;