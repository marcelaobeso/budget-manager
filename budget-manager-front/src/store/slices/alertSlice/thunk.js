import { triggerAlert } from "./alertSlice";

export const addAlert = () => {
  return async (dispatch, getState) => {
    dispatch(triggerAlert(true));
    setTimeout(() => {
      dispatch(triggerAlert(false));
    }, 3001);
  };
};
