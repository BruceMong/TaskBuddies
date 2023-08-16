import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService"; // Importation du service de tâches pour interagir avec l'API.

// L'action asynchrone qui fait le fetch.
// Cette action est utilisée pour récupérer les tâches à partir de l'API.
export const fetchTasks = createAsyncThunk(
	"task/fetchTasks", // Le nom de l'action.
	async (_, { getState, rejectWithValue }) => {
		// Récupération de l'état actuel.
		const { selectedDate, selectedTags } = getState().task;
		// Conversion des tags sélectionnés en une chaîne de caractères.
		const tagsStr = selectedTags.join(",");
		try {
			// Tentative de récupération des tâches à partir de l'API.
			const fetchedTasks = await taskService.fetchTasksByDate(
				new Date(selectedDate),
				tagsStr
			);
			// Validation des tâches récupérées.
			const tasksWithValidation = await Promise.all(
				fetchedTasks.map(async (task) => {
					// Vérification si la tâche a été validée à la date sélectionnée.
					const validated = await taskService.hasTaskBeenValidatedOnDate(
						task.id,
						selectedDate
					);
					// Retour de la tâche avec l'information de validation.
					return { ...task, validated };
				})
			);
			// Retour des tâches avec validation.
			return tasksWithValidation;
		} catch (err) {
			// En cas d'erreur, rejet de la valeur avec le message d'erreur.
			return rejectWithValue(err.message);
		}
	}
);

// L'action asynchrone pour récupérer les tâches de groupe.
export const fetchGroupTasks = createAsyncThunk(
	"task/fetchGroupTasks",
	async (groupId, { getState, rejectWithValue }) => {
		const { selectedDate, selectedTags } = getState().task;
		const tagsStr = selectedTags.join(",");
		try {
			const fetchedTasks = await taskService.fetchGroupTasks(
				groupId,
				new Date(selectedDate),
				tagsStr
			);
			const tasksWithValidation = await Promise.all(
				fetchedTasks.map(async (task) => {
					const validated = await taskService.hasTaskBeenValidatedOnDate(
						task.id,
						selectedDate
					);
					return { ...task, validated };
				})
			);
			return tasksWithValidation;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

// Création du slice de tâche avec Redux Toolkit.
const taskSlice = createSlice({
	name: "task", // Le nom du slice.
	initialState: {
		// L'état initial du slice.
		tasks: [], // La liste des tâches.
		groupTasks: [], // La liste des tâches de groupe.
		status: "idle", // Le statut de l'état (idle, loading, etc.).
		error: null, // L'erreur éventuelle lors de la récupération des tâches.
		selectedDate: new Date().toISOString(), // La date sélectionnée.
		selectedTags: [], // Les tags sélectionnés.
	},

	// Les reducers pour mettre à jour l'état.
	reducers: {
		setSelectedDate: (state, action) => {
			// Le reducer pour mettre à jour la date sélectionnée.
			state.selectedDate = action.payload;
		},
		setSelectedTags: (state, action) => {
			// Le reducer pour mettre à jour les tags sélectionnés.
			state.selectedTags = action.payload;
		},
	},

	// Les extraReducers pour gérer les actions asynchrones.
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = "idle";
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			})
			// Gestion de fetchGroupTasks
			.addCase(fetchGroupTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchGroupTasks.fulfilled, (state, action) => {
				state.status = "idle";
				state.groupTasks = action.payload;
			})
			.addCase(fetchGroupTasks.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error.message;
			});
	},
});

// Exportation des actions du slice de tâche.
export const taskSliceActions = taskSlice.actions;
// Exportation du slice de tâche.
export default taskSlice;
