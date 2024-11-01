import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  const parsedTasks = storedTasks ? JSON.parse(storedTasks) : {};
  return {
    columns: parsedTasks.columns || { Progress: [], Review: [], Completed: [] },
    progressCount: parsedTasks.progressCount || 0,
    reviewCount: parsedTasks.reviewCount || 0,
    completedCount: parsedTasks.completedCount || 0,
  };
};


const saveTasksToLocalStorage = (state) => {
  localStorage.setItem("tasks", JSON.stringify(state));
};

const initialState = loadTasksFromLocalStorage() || {
  columns: {
    Progress: [],
    Review: [],
    Completed: [],
  },
  progressCount: 0,
  reviewCount: 0,
  completedCount: 0,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addNewTask(state, action) {
      const { column, task } = action.payload;
      state.columns[column].unshift(task);
      state[`${column.toLowerCase()}Count`]++;
      saveTasksToLocalStorage(state);
    },
    removeTask(state, action) {
      const { column, taskId } = action.payload;
      state.columns[column] = state.columns[column].filter(
        (task) => task.id !== taskId
      );
      state[`${column.toLowerCase()}Count`]--;
      saveTasksToLocalStorage(state);
    },    
    moveTask(state, action) {
      const { sourceColumn, destinationColumn, sourceIndex, destinationIndex } = action.payload;

      const [movedTask] = state.columns[sourceColumn].splice(sourceIndex, 1);
      state.columns[destinationColumn].splice(destinationIndex, 0, movedTask);

      if (sourceColumn !== destinationColumn) {
        state[`${sourceColumn.toLowerCase()}Count`]--;
        state[`${destinationColumn.toLowerCase()}Count`]++;
      }

      saveTasksToLocalStorage(state);
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
