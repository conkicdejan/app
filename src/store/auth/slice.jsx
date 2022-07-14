import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  login: () => {},
  logout: () => {},
  register: () => {},
  getActiveUser: () => {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: null,
    loginError: null,
    registerErrors: null,
  },
  reducers: {
    setLogout: (state) => {
      state.token = null;
      state.user = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    setRegisterErrors: (state, action) => {
      state.registerErrors = action.payload;
    },
    ...middlewareActions,
  },
});

export const { login, logout, setLogout, setToken, setUser, getActiveUser, setLoginError, register, setRegisterErrors } = authSlice.actions;
export default authSlice.reducer;
