import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./dashboard/task";
import tagSlice from "./dashboard/tag";
import groupSlice from "./dashboard/group";

const store = configureStore({
	reducer: {
		task: taskSlice.reducer,
		tag: tagSlice.reducer,
		group: groupSlice.reducer,
	},
});

export default store;
