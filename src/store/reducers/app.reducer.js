import * as AppAction from "../actions/app.action";

const AppReducer = (state = {}, action) => {
  switch (action.type) {
    case AppAction.LOADING_PAGES:
      return {
        ...state,
        [AppAction.LOADING_PAGES]: action.payload
      };

    case AppAction.LOADING_THUMBNAILS:
      return {
        ...state,
        [AppAction.LOADING_THUMBNAILS]: action.payload
      };

    case AppAction.PDF_UNIQUE_ID:
      return {
        ...state,
        [AppAction.PDF_UNIQUE_ID]: action.payload
      };

    case AppAction.PDF_URL:
      return {
        ...state,
        [AppAction.PDF_URL]: action.payload
      };

    case AppAction.PDF_INSTANCE:
      return {
        ...state,
        [AppAction.PDF_INSTANCE]: action.payload
      };

    case AppAction.PDF_FILENAME:
      return {
        ...state,
        [AppAction.PDF_FILENAME]: action.payload
      };

    case AppAction.DRAWER_VISIBILITY:
      return {
        ...state,
        [AppAction.DRAWER_VISIBILITY]: action.payload
      };

    case AppAction.PDF_CURRENT_PAGE:
      return {
        ...state,
        [AppAction.PDF_CURRENT_PAGE]: action.payload
      };

    case AppAction.PDF_FORCE_SCROLL:
      return {
        ...state,
        [AppAction.PDF_FORCE_SCROLL]: action.payload
      };

    case AppAction.PDF_TOTAL_PAGES:
      return {
        ...state,
        [AppAction.PDF_TOTAL_PAGES]: action.payload
      };

    case AppAction.ROTATE_SELECTED_PAGE:
      return {
        ...state,
        [AppAction.ROTATE_SELECTED_PAGE]: action.payload
      };

    case AppAction.ROTATE_ALL_PAGES:
      let rotationAll = state[AppAction.ROTATE_ALL_PAGES]?.rotation || 0;
      if (action.direction === "LEFT") {
        rotationAll = rotationAll - 90;
      } else {
        rotationAll = rotationAll + 90;
      }

      return {
        ...state,
        [AppAction.ROTATE_ALL_PAGES]: {
          direction: action.direction,
          rotation: rotationAll
        }
      };

    case AppAction.PAGE_LIST:
      return {
        ...state,
        [AppAction.PAGE_LIST]: action.payload
      };

    case AppAction.ZOOM_LEVEL:
      return {
        ...state,
        [AppAction.ZOOM_LEVEL]: action.payload
      };

    case AppAction.REARRANGE_MODAL_VISIBILITY:
      return {
        ...state,
        [AppAction.REARRANGE_MODAL_VISIBILITY]: action.payload
      };

    case AppAction.CHANGES_SAVED:
      return {
        ...state,
        [AppAction.CHANGES_SAVED]: action.payload
      };

    case AppAction.CHANGE_ID:
      return {
        ...state,
        [AppAction.CHANGE_ID]: action.payload
      };
    case AppAction.PAGE_CHANGES:
      return { ...state, [AppAction.PAGE_CHANGES]: action.payload };

    default:
      return state;
  }
};

export default AppReducer;
