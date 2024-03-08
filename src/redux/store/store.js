import { configureStore } from "@reduxjs/toolkit";
import  counterReducerSlice  from "../slices/counter/counterSlice";

export default configureStore({
    reducer:{
        counter: counterReducerSlice
    },
});