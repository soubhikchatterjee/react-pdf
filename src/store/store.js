import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

// Reducers
import appReducer from "./reducers/app.reducer";

export const middlewares = [Thunk];

export const createStoreWithMiddlware = applyMiddleware(...middlewares)(
  createStore
);

const rootReducer = combineReducers({
  appReducer
});

export const store = createStoreWithMiddlware(rootReducer);
