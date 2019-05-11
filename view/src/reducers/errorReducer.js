import {GET_ERRORS, CLEAR_ERRORS} from '../actions/types'; 


const initialState = {}; 


// reducer will take 2 argument => actions , initial state

const errorReducer = (state = initialState,action) => {
  switch(action.type){ 
    case GET_ERRORS: 
      return action.payload // payload is going to include =>> errors.response.data; 
    case CLEAR_ERRORS: 
      return {}; 
    default : 
      return state; 
  }
}

export default errorReducer; 

// reducers will import actions types and will update the store based on actions types  