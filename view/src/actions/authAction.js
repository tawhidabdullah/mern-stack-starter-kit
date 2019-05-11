// actions is tough to understand
//Actions must have a type
import axios from "axios";
import jwt_decode from "jwt-decode";

// import setAuthorizationToken
import setAuthorizationToken from "../utilities/setAuthorizationToken";

// import TYPES
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register user
export const registeruser = (userdata, history) => dispatch => {
  axios
    .post("/api/users/register", userdata)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// when registeruser action get's called uporer function ta fired kore

// Login - Get user token //////////////////////////////////////
export const loginUser = userdata => dispatch => {
  axios
    .post("/api/users/login", userdata)
    .then(res => {
      const { token } = res.data; // get token from res.data
      localStorage.setItem("jwttoken", token); //save to localstorage
      setAuthorizationToken(token); // set Authorization token  to header
      const decoded = jwt_decode(token); // decode token to get user data
      dispatch(setCurrentUser(decoded)); // set current user
    })
    .catch(errors => {
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};

// Log out User

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwttoken"); // remove the token from localStorage
  setAuthorizationToken(false); // remove Authorization header 
  //set currentUser to empty object=>which will set isAuthenticate to false
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

/// types and action are friends
// actions will go to the reducers
////////////////////////////////////////////////////////////