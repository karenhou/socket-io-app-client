export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const RegisterStart = () => ({
  type: "REGISTER_START",
});

export const RegisterSuccess = () => ({
  type: "REGISTER_SUCCESS",
});

export const RegisterFailure = () => ({
  type: "REGISTER_FAILURE",
});

export const LogoutStart = () => ({
  type: "LOGOUT_START",
});

export const LogoutSuccess = () => ({
  type: "LOGOUT_SUCCESS",
});

export const LogoutFailure = () => ({
  type: "LOGOUT_FAILURE",
});
