import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

// Reducers
import appReducer from "store/reducers/app.reducer";

export const middlewares = [Thunk];

export const createStoreWithMiddlware = applyMiddleware(...middlewares)(
  createStore
);

const rootReducer = combineReducers({
  appReducer
});

export default createStoreWithMiddlware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
