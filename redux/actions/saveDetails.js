import { SAVE_DETAILS } from "../types/types";

export const saveDetails = (state) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_DETAILS,
      payload: state,
    });
  };
};
