import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService"; // Assurez-vous que ce chemin d'importation est correct.


// L'action asynchrone qui fait le fetch.
export const fetchTasks = createAsyncThunk(
    "task/fetchTasks",
    async(_, { getState, rejectWithValue }) => {
        const selectedDate = getState().task.selectedDate;
        try {
            const fetchedTasks = await taskService.fetchTasksByDate(new Date(selectedDate));
            const tasksWithValidation = await Promise.all(
                fetchedTasks.map(async(task) => {
                    const validated = await taskService.hasTaskBeenValidatedOnDate(
                        task.id,
                        selectedDate
                    );
                    return {...task, validated };
                })
            );
            return tasksWithValidation;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);



const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        status: "idle",
        error: null,
        selectedDate: new Date().toISOString(), // Stockez la date sous forme de chaîne de caractères ISO.
    },

    reducers: {
        setSelectedDate: (state, action) => {
            // Met à jour la date sélectionnée avec la valeur fournie.
            state.selectedDate = action.payload;
        },
        // Ajoutez ici les autres actions de réduction si nécessaire.
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                // Lorsque nous commençons à faire le fetch, nous mettons notre état à 'loading'.
                state.status = "loading";
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                // Lorsque le fetch réussit, nous mettons à jour notre état avec les tâches récupérées et réinitialisons le statut.
                state.status = "idle";
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                // Lorsque le fetch échoue, nous enregistrons l'erreur et réinitialisons le statut.
                state.status = "idle";
                state.error = action.error.message;
            });
    },
});

export const taskSliceActions = taskSlice.actions;
export default taskSlice;