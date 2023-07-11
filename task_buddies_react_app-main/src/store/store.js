import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./dashboard/task";
import tagSlice from "./dashboard/tag";


const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
    tag: tagSlice.reducer,
  },
});

export default store;