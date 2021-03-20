export const LOADING_PAGES = "LOADING_PAGES";
export const LOADING_THUMBNAILS = "LOADING_THUMBNAILS";
export const PDF_UNIQUE_ID = "PDF_UNIQUE_ID";
export const PDF_URL = "PDF_URL";
export const PDF_INSTANCE = "PDF_INSTANCE";
export const PDF_FILENAME = "PDF_FILENAME";
export const DRAWER_VISIBILITY = "DRAWER_VISIBILITY";
export const PDF_CURRENT_PAGE = "PDF_CURRENT_PAGE";
export const PDF_FORCE_SCROLL = "PDF_FORCE_SCROLL";
export const PDF_TOTAL_PAGES = "PDF_TOTAL_PAGES";
export const ROTATE_SELECTED_PAGE = "ROTATE_SELECTED_PAGE";
export const ROTATE_ALL_PAGES = "ROTATE_ALL_PAGES";
export const PAGE_LIST = "PAGE_LIST";
export const ZOOM_LEVEL = "ZOOM_LEVEL";
export const REARRANGE_MODAL_VISIBILITY = "REARRANGE_MODAL_VISIBILITY";
export const CHANGES_SAVED = "CHANGES_SAVED";
export const CHANGE_ID = "CHANGE_ID";
export const PAGE_CHANGES = "PAGE_CHANGES";

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

export const setUniqueId = uniqueId => dispatch => {
  resetData(dispatch);
  return dispatch({
    type: PDF_UNIQUE_ID,
    payload: uniqueId
  });
};

export const setUrl = url => dispatch => {
  return dispatch({
    type: PDF_URL,
    payload: url
  });
};

export const setPdfInstance = instance => dispatch => {
  return dispatch({
    type: PDF_INSTANCE,
    payload: instance
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

export const setForceScroll = forceScroll => dispatch => {
  return dispatch({
    type: PDF_FORCE_SCROLL,
    payload: forceScroll
  });
};

export const setTotalPages = totalPages => dispatch => {
  return dispatch({
    type: PDF_TOTAL_PAGES,
    payload: totalPages
  });
};

export const setRotateCurrentPage = rotateObj => dispatch => {
  dispatch(setChangesSaved(false));
  dispatch(setChangeId());
  return dispatch({
    type: ROTATE_SELECTED_PAGE,
    payload: rotateObj
  });
};

export const setRotateAllPages = direction => dispatch => {
  dispatch(setChangesSaved(false));
  dispatch(setChangeId());
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
    payload: isChangesSaved,
    changeId: Math.random()
  });
};

export const setChangeId = () => dispatch => {
  return dispatch({
    type: CHANGE_ID,
    payload: Math.random()
  });
};

export const setPageChanges = pageChanges => dispatch => {
  return dispatch({
    type: PAGE_CHANGES,
    payload: pageChanges
  });
};

function resetData(dispatch) {
  dispatch({
    type: DRAWER_VISIBILITY,
    payload: false
  });
  dispatch({
    type: PDF_CURRENT_PAGE,
    payload: 1
  });
  dispatch({
    type: PDF_FORCE_SCROLL,
    payload: true
  });
  dispatch({
    type: PDF_TOTAL_PAGES,
    payload: 0
  });
  dispatch({
    type: ROTATE_SELECTED_PAGE,
    payload: {}
  });
  dispatch({
    type: ZOOM_LEVEL,
    payload: 100
  });
  dispatch({
    type: PAGE_LIST,
    payload: []
  });
  dispatch({
    type: REARRANGE_MODAL_VISIBILITY,
    payload: false
  });
  dispatch({
    type: CHANGES_SAVED,
    payload: true
  });
}
