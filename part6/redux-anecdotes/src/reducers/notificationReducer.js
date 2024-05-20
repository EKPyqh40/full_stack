import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotificiation(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { setNotificiation, removeNotification } =
  notificationSlice.actions;

export const notification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotificiation(content));
    setTimeout(() => {
      dispatch(removeNotification(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
