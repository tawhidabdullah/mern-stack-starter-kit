import axios from "axios";

// we can set a default header in axios ,
// and this is on of the axios is great for !!

const setAuthorizationToken = token => {
  if (token) {
    // set token to header as Authorization value
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete token of header as Authorization value
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthorizationToken;
