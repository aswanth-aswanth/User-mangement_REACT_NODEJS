// // userActions.js
// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: null,
//     users: [],
//   },
//   reducers: {
//     userLogin: (state, action) => {
//       state.user = action.payload;
//     },
//     userLogout: (state) => {
//       state.user = null;
//     },
//     userRegister: (state, action) => {
//       // For simplicity, assume the payload is the newly registered user
//       state.user = action.payload;
//     },
//     getAllUsers: (state, action) => {
//       // For simplicity, assume the payload is an array of users
//       state.users = action.payload;
//     },
//     getUserById: (state, action) => {
//       const userId = action.payload;
//       state.user = state.users.find((user) => user.id === userId) || null;
//     },
//     createUser: (state, action) => {
//       // For simplicity, assume the payload is the newly created user
//       const newUser = action.payload;
//       state.users.push(newUser);
//     },
//     updateUser: (state, action) => {
//       // For simplicity, assume the payload contains userId and updatedUserData
//       const { userId, updatedUserData } = action.payload;
//       const userIndex = state.users.findIndex((user) => user.id === userId);
//       if (userIndex !== -1) {
//         state.users[userIndex] = { ...state.users[userIndex], ...updatedUserData };
//       }
//     },
//     deleteUser: (state, action) => {
//       // For simplicity, assume the payload is the userId to be deleted
//       const userId = action.payload;
//       state.users = state.users.filter((user) => user.id !== userId);
//     },
//   },
// });

// export const { userLogin, userLogout, userRegister, getAllUsers, getUserById, createUser, updateUser, deleteUser } = userSlice.actions;
// export default userSlice.reducer;
