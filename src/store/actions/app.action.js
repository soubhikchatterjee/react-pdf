export const DRAWER_VISIBILITY = "DRAWER_VISIBILITY";

export const setDrawerVisibility = visibility => {
  return {
    type: DRAWER_VISIBILITY,
    payload: visibility
  };
};
