import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: { tasks: [] },

    reducers: {
        updateRole(state, action) {
            state.role = action.payload;
        },
    },
});

export const taskSliceActions = taskSlice.actions;
export default taskSlice;