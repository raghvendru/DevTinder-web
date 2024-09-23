import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import feedReduce from "./feedSlice";
import connectionReducer from "./connectionSlice"
import requestsReducer from "./requestSlice"

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed:feedReduce,
        connections:connectionReducer,
        requests:requestsReducer,
    },

});

export default appStore;