import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User, take user data back to api
// "/api/users/register" return status 400 errors
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
        dispatch({
            type: CLEAR_ERRORS //from the register form to login form
        });
        history.push("/login") // re-direct to login on successful register
     }) 
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage variable localStorage
      // Set token to localStorage
    //   {
    //     "success": true,
    //     "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGU1YWMzNDk5NmRiMWFlOTZjZTM0YiIsIm5hbWUiOiJQYXVsIiwiaWF0IjoxNTc3OTk5MzI1LCJleHAiOjE2MDk1NTYyNTF9.CtsSy1VgDwwD4llcpVlWRQ74n9E1mwBUvZPUR8noGtQ"
    // }
    // is whole data
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data: name and id
      const decoded = jwt_decode(token);
      // Set current user
      // set name and id into current user object
      // after login, current user goes into the state
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  // take the jwt out of the local storage
  // also take out of axios
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  // take out of current user
  dispatch(setCurrentUser({}));
};