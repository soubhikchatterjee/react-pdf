import { createStore, combineReducers } from "redux";

// Reducers
import appReducer from "store/reducers/app.reducer";

const rootReducer = combineReducers({
  appReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
