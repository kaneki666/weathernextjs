import { SAVE_FORECAST } from "../types/types";

export const saveForecast = (state) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_FORECAST,
      payload: state,
    });
  };
};
