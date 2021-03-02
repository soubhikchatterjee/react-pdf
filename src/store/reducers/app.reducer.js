import * as AppAction from "store/actions/app.action";

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

    case AppAction.PDF_URL:
      return {
        ...state,
        [AppAction.PDF_URL]: action.payload
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

    case AppAction.PDF_TOTAL_PAGES:
      return {
        ...state,
        [AppAction.PDF_TOTAL_PAGES]: action.payload
      };
    case AppAction.ROTATE_SELECTED_PAGES:
      const pageNumberToRotate = action.payload;
      const direction = action.direction;

      let oldPages = [...state[AppAction.PAGE_LIST]] || [];
      let rotation;

      oldPages = oldPages.map(page => {
        if (page.pageNumber === pageNumberToRotate) {
          if (direction === "LEFT") {
            rotation = +page.rotation - 90;
          } else {
            rotation = +page.rotation + 90;
          }
          return {
            pageNumber: page.pageNumber,
            rotation
          };
        }
        return page;
      });

      return {
        ...state,
        [AppAction.ROTATE_SELECTED_PAGES]: oldPages
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

    default:
      return state;
  }
};

export default AppReducer;
