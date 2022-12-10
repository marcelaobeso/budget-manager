import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedStatus: false,
  userInfo: {
    idUser: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  },
  validFields: {
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    password: true,
    message: "",
  },
  viewLogin: false,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    signUpUser: (state, { payload }) => {
      state.userInfo.firstName = payload.firstName;
      state.userInfo.lastName = payload.lastName;
      state.userInfo.username = payload.username;
      state.userInfo.email = payload.email;
      state.userInfo.password = payload.password;
      state.userInfo.idUser = payload.idUser;
    },

    logoutUser: (state) => {
      state.userInfo.firstName = "";
      state.userInfo.lastName = "";
      state.userInfo.username = "";
      state.userInfo.email = "";
      state.userInfo.password = "";
      state.userInfo.idUser = null;
      state.loggedStatus = false;
      localStorage.clear();
    },

    fristNameFieldsValidator: (state, { payload }) => {
      state.validFields.firstName = payload.firstName;
    },
    lastNameFieldsValidator: (state, { payload }) => {
      state.validFields.lastName = payload.lastName;
    },
    usernameFieldsValidator: (state, { payload }) => {
      state.validFields.username = payload.username;
    },
    emailFieldsValidator: (state, { payload }) => {
      state.validFields.email = payload.email;
    },
    passwordFieldsValidator: (state, { payload }) => {
      state.validFields.password = payload.password;
    },
    messageFieldsValidator: (state, { payload }) => {
      state.validFields.message = payload.message;
    },
    loginUser: (state, { payload }) => {
      state.loggedStatus = true;
    },
    enableViewLogin: (state) => {
      state.viewLogin = !state.viewLogin;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signUpUser,
  logoutUser,
  enableViewLogin,
  loginUser,
  fristNameFieldsValidator,
  lastNameFieldsValidator,
  usernameFieldsValidator,
  emailFieldsValidator,
  passwordFieldsValidator,
  messageFieldsValidator,
} = signUpSlice.actions;

export default signUpSlice.reducer;
