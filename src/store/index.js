import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./task-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        task: taskSlice.reducer, 
        user: userSlice.reducer
    }
})

export default store