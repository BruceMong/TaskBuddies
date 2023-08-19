import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService";

export const fetchGroupTaskUsers = createAsyncThunk(
	"taskUser/fetchGroupTaskUsers",
	async (groupIds, { getState, rejectWithValue }) => {
		const { selectedDate } = getState().task;
		console.log(selectedDate);
		try {
			const groupTaskUsersObj = {};
			await Promise.all(
				groupIds.map(async (groupId) => {
					const fetchedTaskUsers =
						await taskService.fetchTaskUsersByGroupAndDate(
							groupId,
							selectedDate
						);
					groupTaskUsersObj[groupId] = fetchedTaskUsers;
				})
			);
			return groupTaskUsersObj;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

const taskUserSlice = createSlice({
	name: "taskUser",
	initialState: {
		taskUsers: {},
		groupTaskUsers: {},
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGroupTaskUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchGroupTaskUsers.fulfilled, (state, action) => {
				state.status = "idle";
				state.groupTaskUsers = action.payload;
			})
			.addCase(fetchGroupTaskUsers.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			});
	},
});

export const taskUserSliceActions = taskUserSlice.actions;
export default taskUserSlice;
