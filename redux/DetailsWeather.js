import { SAVE_DETAILS, SAVE_FORECAST } from "./types/types";

const initialState = {
  data: "",
  forecast: "",
};

const DetailsWeather = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DETAILS:
      let { data } = state;
      data = action.payload;
      return { ...state, data };

    case SAVE_FORECAST:
      let { forecast } = state;
      forecast = action.payload;
      return { ...state, forecast };

    default:
      return state;
  }
};

export default DetailsWeather;
