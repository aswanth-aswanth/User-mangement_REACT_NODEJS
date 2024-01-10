import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterSlice";

const store=configureStore({
    reducer:{
        counter:counterReducer
    }
})

export default store;

// 1.first create slice and export each of the actions and export reducer.
// 2.create a store using configureStore and importing the reducer and export the store
// 3.import useDispatch, useSelector for updating state and using state value respectively.
// 4.import the function to be dispatched from the create slice.
// 5.wrap the App component using Provider component and pass store as value for store.
// import Provider from react-redux and store from store.