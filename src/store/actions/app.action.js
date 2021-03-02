export const LOADING_PAGES = "LOADING_PAGES";
export const LOADING_THUMBNAILS = "LOADING_THUMBNAILS";
export const PDF_URL = "PDF_URL";
export const PDF_FILENAME = "PDF_FILENAME";
export const DRAWER_VISIBILITY = "DRAWER_VISIBILITY";
export const PDF_CURRENT_PAGE = "PDF_CURRENT_PAGE";
export const PDF_TOTAL_PAGES = "PDF_TOTAL_PAGES";
export const ROTATE_CURRENT_PAGE = "ROTATE_CURRENT_PAGE";
export const ROTATE_SELECTED_PAGES = "ROTATE_SELECTED_PAGES";
export const ROTATE_ALL_PAGES = "ROTATE_ALL_PAGES";
export const PAGE_LIST = "ROTATE_PAGE_LIST";
export const ZOOM_LEVEL = "ZOOM_LEVEL";
export const REARRANGE_MODAL_VISIBILITY = "REARRANGE_MODAL_VISIBILITY";
export const CHANGES_SAVED = "CHANGES_SAVED";

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

export const setFilename = filename => dispatch => {
  return dispatch({
    type: PDF_FILENAME,
    payload: filename
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
  dispatch(setChangesSaved(false));
  return dispatch({
    type: ROTATE_SELECTED_PAGES,
    payload: currentPage,
    direction
  });
};

export const setRotateAllPages = direction => dispatch => {
  dispatch(setChangesSaved(false));
  return dispatch({
    type: ROTATE_ALL_PAGES,
    direction
  });
};

export const setZoomLevel = value => dispatch => {
  return dispatch({
    type: ZOOM_LEVEL,
    payload: value
  });
};

export const setPageList = pageList => dispatch => {
  return dispatch({
    type: PAGE_LIST,
    payload: pageList
  });
};

export const setRearrangeModalVisibility = isVisible => dispatch => {
  return dispatch({
    type: REARRANGE_MODAL_VISIBILITY,
    payload: isVisible
  });
};

export const setChangesSaved = isChangesSaved => dispatch => {
  return dispatch({
    type: CHANGES_SAVED,
    payload: isChangesSaved
  });
};
