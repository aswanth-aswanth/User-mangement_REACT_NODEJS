
import {createSlice} from "@reduxjs/toolkit";

const counterSlice=createSlice({
    name:'counterSlice',
    initialState:{count:0},
    reducers:{
        increment(state){
            state.count++;
        },
        decrement(state){
            state.count--;
        },
        incrementByAmount(state,action){
            state.count+=action.payload;
        }
    }
})

const {increment,decrement,incrementByAmount}=counterSlice.actions;
export default counterSlice.reducer;


// 1.first create slice and export each of the actions and export reducer.
// 2.create a store using configureStore and importing the reducer and export the store
// 3.import useDispatch, useSelector for updating state and using state value respectively.
// 4.import the function to be dispatched from the create slice.
// 5.wrap the App component using Provider component and pass store as value for store.
// import Provider from react-redux and store from store.