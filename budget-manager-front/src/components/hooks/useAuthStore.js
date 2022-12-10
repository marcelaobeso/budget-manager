import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import budgetApi from "../../api/budgetApi";
import {
  loginUser,
  logoutUser,
  messageFieldsValidator,
  passwordFieldsValidator,
  signUpUser,
  usernameFieldsValidator,
} from "../../store/slices/signUpSlice/signUpSlice";

export const useAuthStore = () => {
  const { validFields, userInfo } = useSelector((state) => state.signUp);
  const dispatch = useDispatch();

  const loggin = async ({ username, password }) => {
    try {
      const { data } = await budgetApi.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        signUpUser({ ...userInfo, firstName: data.name, idUser: data.idUser })
      );
      dispatch(
        messageFieldsValidator({
          ...validFields,
          message: "",
        })
      );
      dispatch(loginUser());
    } catch (error) {
      dispatch(usernameFieldsValidator({ ...validFields, username: true }));
      dispatch(passwordFieldsValidator({ ...validFields, password: true }));
      dispatch(
        messageFieldsValidator({
          ...validFields,
          message: "credenciales incorrectas",
        })
      );
    }
  };
  const signin = async ({ email, firstName, lastName, password, username }) => {
    try {
      const { data } = await budgetApi.post("/auth/sign", {
        email,
        firstName,
        lastName,
        password,
        username,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        signUpUser({
          ...userInfo,
          idUser: data.idUser,
          firstName: data.firstName,
        })
      );
      dispatch(
        messageFieldsValidator({
          ...validFields,
          message: "",
        })
      );
      dispatch(loginUser());
    } catch (error) {
      dispatch(usernameFieldsValidator({ ...validFields, username: true }));
      dispatch(passwordFieldsValidator({ ...validFields, email: true }));
      dispatch(
        messageFieldsValidator({
          ...validFields,
          message:
            "you cannot create an account with this credentials, try with diff email or username",
        })
      );
    }
  };
  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(logoutUser());
    try {
      const { data } = await budgetApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        signUpUser({ ...userInfo, firstName: data.name, idUser: data.id })
      );
      dispatch(loginUser());
    } catch (error) {
      localStorage.clear();
      dispatch(logoutUser());
    }
  };

  return {
    loggin,
    signin,
    checkToken,
  };
};
