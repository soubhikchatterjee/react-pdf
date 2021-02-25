export const LOADING_PAGES = "LOADING_PAGES";
export const LOADING_THUMBNAILS = "LOADING_THUMBNAILS";
export const PDF_URL = "PDF_URL";
export const PDF_DOCUMENT = "PDF_DOCUMENT";
export const DRAWER_VISIBILITY = "DRAWER_VISIBILITY";
export const PDF_CURRENT_PAGE = "PDF_CURRENT_PAGE";
export const PDF_MAX_PAGE_GENERATED = "PDF_MAX_PAGE_GENERATED";
export const PDF_TOTAL_PAGES = "PDF_TOTAL_PAGES";
export const ROTATE_CURRENT_PAGE = "ROTATE_CURRENT_PAGE";
export const ROTATE_SELECTED_PAGES = "ROTATE_SELECTED_PAGES";
export const ROTATE_ALL_PAGES = "ROTATE_ALL_PAGES";
export const ROTATE_PAGE_LIST = "ROTATE_PAGE_LIST";

export const setLoadingPages = loading => dispatch => {
  return dispatch({
    type: LOADING_PAGES,
    payload: loading
  });
};

export const setLoadingThumbnails = loading => dispatch => {
  return dispatch({
    type: LOADING_THUMBNAILS,
    payload: loading
  });
};

export const setUrl = url => dispatch => {
  return dispatch({
    type: PDF_URL,
    payload: url
  });
};

export const setDocument = doc => dispatch => {
  return dispatch({
    type: PDF_DOCUMENT,
    payload: doc
  });
};

export const setDrawerVisibility = visibility => dispatch => {
  return dispatch({
    type: DRAWER_VISIBILITY,
    payload: visibility
  });
};

export const setCurrentPage = currentPage => dispatch => {
  return dispatch({
    type: PDF_CURRENT_PAGE,
    payload: currentPage
  });
};

export const setMaxPageGenerated = pageNumber => dispatch => {
  return dispatch({
    type: PDF_MAX_PAGE_GENERATED,
    payload: pageNumber
  });
};

export const setTotalPages = totalPages => dispatch => {
  return dispatch({
    type: PDF_TOTAL_PAGES,
    payload: totalPages
  });
};

export const setRotateCurrentPage = ({
  currentPage,
  direction
}) => dispatch => {
  return dispatch({
    type: ROTATE_SELECTED_PAGES,
    payload: currentPage,
    direction
  });
};

export const setRotateAllPages = direction => dispatch => {
  return dispatch({
    type: ROTATE_ALL_PAGES,
    direction
  });
};

export const setRotatePagesList = pageList => dispatch => {
  return dispatch({
    type: ROTATE_PAGE_LIST,
    payload: pageList
  });
};
