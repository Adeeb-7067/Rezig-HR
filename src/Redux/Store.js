import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Features/userslice";
export const store =  configureStore({
    reducer:{
        user:userReducer
    }
})