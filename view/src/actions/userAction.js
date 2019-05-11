import {
  ADD_WISHLIST,
  GET_ERRORS,
  PRODUCT_SUCCESSFULL,
  GET_WISHLISTS
} from "./types";
import axios from "axios";

// Add Post
export const addWishListAction = id => dispatch => {
  axios
    .post(`/api/users/addWish/${id}`)
    .then(res => {
      dispatch({
        type: ADD_WISHLIST,
        payload: res.data
      });
      dispatch({
        type: PRODUCT_SUCCESSFULL
      });
      return true;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      return false;
    });
};

// Get products
export const deleteWishListAction = id => dispatch => {
  axios
    .delete(`/api/users/deleteWishList/${id}`)
    .then(res => {
      dispatch({
        type: GET_WISHLISTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get wishLists actions
export const getWishListsAction = () => dispatch => {
  axios
    .get("/api/users/wishLists")
    .then(res => {
      dispatch({
        type: GET_WISHLISTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
