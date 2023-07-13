import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tagService } from "../../services/tagService"; // Assurez-vous que ce chemin d'importation est correct.

export const fetchTagsByUser = createAsyncThunk(
	"tags/fetchTagsByUser",
	async () => {
		const response = await tagService.fetchTagsByUser();
		return response;
	}
);

const tagSlice = createSlice({
	name: "tag",
	initialState: {
		tags: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTagsByUser.pending, (state) => {
				// Lorsque nous commençons à faire le fetch, nous mettons notre état à 'loading'.
				state.status = "loading";
			})
			.addCase(fetchTagsByUser.fulfilled, (state, action) => {
				// Lorsque le fetch réussit, nous mettons à jour notre état avec les tâches récupérées et réinitialisons le statut.
				state.status = "idle";
				state.tags = action.payload;
			})
			.addCase(fetchTagsByUser.rejected, (state, action) => {
				// Lorsque le fetch échoue, nous enregistrons l'erreur et réinitialisons le statut.
				state.status = "idle";
				state.error = action.error.message;
			});
	},
});

export const tagSliceActions = tagSlice.actions;
export default tagSlice;
