import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, doc, setDoc, getDoc } from "../../firebase"; 

export const loadTasksFromFirestore = createAsyncThunk(
  'tasks/loadTasks',
  async () => {
    const taskDocRef = doc(db, "Tasks", "taskId");
    try {
      const docSnap = await getDoc(taskDocRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return {
          columns: { Progress: [], Review: [], Completed: [] },
          progressCount: 0,
          reviewCount: 0,
          completedCount: 0,
        };
      }
    } catch (error) {
      console.error("Error loading tasks from Firestore: ", error);
      return {
        columns: { Progress: [], Review: [], Completed: [] },
        progressCount: 0,
        reviewCount: 0,
        completedCount: 0,
      };
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    columns: { Progress: [], Review: [], Completed: [] },
    progressCount: 0,
    reviewCount: 0,
    completedCount: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    addNewTask(state, action) {
      const { column, task } = action.payload;
      state.columns[column].unshift(task);
      state[`${column.toLowerCase()}Count`]++;

      saveTasksToFirestore(state); 
    },
    removeTask(state, action) {
      const { column, taskId } = action.payload;
      state.columns[column] = state.columns[column].filter(
        (task) => task.id !== taskId
      );
      state[`${column.toLowerCase()}Count`]--;
      
      saveTasksToFirestore(state); 
    },
    editTask(state, action) {
      const { column, taskId, newDescription } = action.payload;
      const taskIndex = state.columns[column].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.columns[column][taskIndex].description = newDescription;

        saveTasksToFirestore(state); 
      }
    },
    moveTask(state, action) {
      const { sourceColumn, destinationColumn, sourceIndex, destinationIndex } = action.payload;

      const [movedTask] = state.columns[sourceColumn].splice(sourceIndex, 1);
      state.columns[destinationColumn].splice(destinationIndex, 0, movedTask);

      if (sourceColumn !== destinationColumn) {
        state[`${sourceColumn.toLowerCase()}Count`]--;
        state[`${destinationColumn.toLowerCase()}Count`]++;
      }

      saveTasksToFirestore(state); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasksFromFirestore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTasksFromFirestore.fulfilled, (state, action) => {
        state.columns = action.payload.columns;
        state.progressCount = action.payload.progressCount;
        state.reviewCount = action.payload.reviewCount;
        state.completedCount = action.payload.completedCount;
        state.status = 'succeeded';
      })
      .addCase(loadTasksFromFirestore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const saveTasksToFirestore = async (state) => {
  const taskDocRef = doc(db, "Tasks", "taskId");
  try {
    await setDoc(taskDocRef, {
      columns: state.columns,
      progressCount: state.progressCount,
      reviewCount: state.reviewCount,
      completedCount: state.completedCount,
    });
  } catch (error) {
    console.error("Error saving tasks to Firestore: ", error);
  }
};

export const taskActions = taskSlice.actions;
export default taskSlice;
