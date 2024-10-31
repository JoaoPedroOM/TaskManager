import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    columns: {
      Progress: [],
      Review: [],
      Completed: [],
    },
    progressCount: 0,
    reviewCount: 0,
    completedCount: 0,
  },
  reducers: {
    addNewTask(state, action) {
      const { column, task } = action.payload;
      state.columns[column].unshift(task);
      state[`${column.toLowerCase()}Count`]++;
    },
    removeTask(state, action) {
      const { column, id } = action.payload;
      state.columns[column] = state.columns[column].filter(
        (task) => task.id !== id
      );
      state[`${column.toLowerCase()}Count`]--;
    },
    moveTask(state, action) {
      const { sourceColumn, destinationColumn, sourceIndex, destinationIndex } =
        action.payload;

      if (sourceColumn === destinationColumn) {
        const [movedTask] = state.columns[sourceColumn].splice(sourceIndex, 1);
        state.columns[destinationColumn].splice(destinationIndex, 0, movedTask);
      } else {
        const [movedTask] = state.columns[sourceColumn].splice(sourceIndex, 1);

        state.columns[destinationColumn].splice(destinationIndex, 0, movedTask);
        
        state[`${sourceColumn.toLowerCase()}Count`]--;
        state[`${destinationColumn.toLowerCase()}Count`]++;
      }
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
