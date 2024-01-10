// configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice.js';
import userReducer from '../reducers/userSlice.js';
import { loginSuccess, logout, adminLoginSuccess, logoutAdmin } from '../reducers/authSlice.js';

// Check for an existing token in sessionStorage
// const initialToken = sessionStorage.getItem('authToken');
// Check for an existing token in localStorage
const initialToken = localStorage.getItem('token');
const initialAdminToken = localStorage.getItem('adminToken');


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

// If there is an existing token, dispatch loginSuccess during store initialization
if (initialToken) {
  store.dispatch(loginSuccess(initialToken));
}
else if(initialAdminToken){
  store.dispatch(adminLoginSuccess(initialAdminToken));
} else {
  // If no token, make sure the user is logged out
  store.dispatch(logout());
  store.dispatch(logoutAdmin());
}

export default store;
