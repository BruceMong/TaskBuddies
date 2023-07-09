import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService"; // Assurez-vous que ce chemin d'importation est correct.
// L'action asynchrone qui fait le fetch.
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (_, { getState, rejectWithValue }) => {
    // Remplacez selectedDate par _
    const selectedDate = getState().task.selectedDate; // Accédez à selectedDate à partir de l'état courant
    try {
      const fetchedTasks = await taskService.fetchTasksByDate(new Date(selectedDate));
      return fetchedTasks;
    } catch (err) {
      // Si une erreur se produit, elle est passée à notre action rejetée.
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
