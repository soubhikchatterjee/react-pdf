import * as AppAction from "store/actions/app.action";

const AppReducer = (state = {}, action) => {
  switch (action.type) {
    case AppAction.DRAWER_VISIBILITY:
      return {
        ...state,
        [AppAction.DRAWER_VISIBILITY]: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
