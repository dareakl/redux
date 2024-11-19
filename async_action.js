const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require("redux-thunk").thunk;
const axios = require("axios");
const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "";

// state
const initialState = {
  loading: false,
  products: [],
  error: false,
};

// Actions
function fetchRequest() {
  return {
    type: FETCH_REQUEST,
  };
}

function fetchSuccess(products) {
  return {
    type: FETCH_SUCCESS,
    payload: products,
  };
}

function fetchError() {
  return {
    type: FETCH_ERROR,
  };
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

// thunk action creator
const fetchProducts = () => {
  return function (dispatch) {
    dispatch(fetchRequest());
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const products = res.data.map((product) => product.title);
        dispatch(fetchSuccess(products));
      })
      .catch((error) => {
        dispatch(fetchError());
      });
  };
};

// Creating store
const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchProducts());
