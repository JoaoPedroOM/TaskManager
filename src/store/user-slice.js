import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("isLoggedIn") === "true",
  dados: JSON.parse(localStorage.getItem("userDados")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.user = true;
      state.dados = action.payload;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userDados", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.dados = null;
      state.user = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userDados");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
