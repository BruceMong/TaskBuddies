import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService";

export const fetchTaskUsers = createAsyncThunk(
	"taskUser/fetchTaskUsers",
	async (_, { getState, rejectWithValue }) => {
		const { selectedDate } = getState().task;
		try {
			const fetchedTaskUsers = await taskService.fetchTaskUsersByDate(
				new Date(selectedDate)
			);
			return fetchedTaskUsers;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const fetchGroupTaskUsers = createAsyncThunk(
	"taskUser/fetchGroupTaskUsers",
	async (groupIds, { getState, rejectWithValue }) => {
		const { selectedDate } = getState().task;
		try {
			const groupTaskUsersObj = {};
			await Promise.all(
				groupIds.map(async (groupId) => {
					const fetchedTaskUsers =
						await taskService.fetchTaskUsersByGroupAndDate(
							groupId,
							new Date(selectedDate)
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
			.addCase(fetchTaskUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTaskUsers.fulfilled, (state, action) => {
				state.status = "idle";
				state.taskUsers = action.payload;
			})
			.addCase(fetchTaskUsers.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})
			.addCase(fetchGroupTaskUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchGroupTaskUsers.fulfilled, (state, action) => {
				state.status = "idle";
				state.groupTaskUsers = { ...state.groupTaskUsers, ...action.payload };
			})
			.addCase(fetchGroupTaskUsers.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			});
	},
});

export const taskUserSliceActions = taskUserSlice.actions;
export default taskUserSlice;
