import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, doc, setDoc, getDoc } from "../../firebase"; 

export const loadTasksFromFirestore = createAsyncThunk(
  'tasks/loadTasks',
  async (uid) => {
    const taskDocRef = doc(db, "Tasks", uid);
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
      const { column, task, uid } = action.payload;
      state.columns[column].unshift(task);
      state[`${column.toLowerCase()}Count`]++;

      saveTasksToFirestore(state, uid); 
    },
    removeTask(state, action) {
      const { column, taskId, uid } = action.payload;
      state.columns[column] = state.columns[column].filter(
        (task) => task.id !== taskId
      );
      state[`${column.toLowerCase()}Count`]--;
      
      saveTasksToFirestore(state, uid); 
    },
    editTask(state, action) {
      const { column, taskId, newDescription, uid } = action.payload;
      const taskIndex = state.columns[column].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = state.columns[column][taskIndex];
        const previousDescription = task.description;
        
        if (previousDescription !== newDescription) {
          task.description = newDescription;
          saveTasksToFirestore(state, uid); 
        }
      }
    },    
    moveTask(state, action) {
      const { sourceColumn, destinationColumn, sourceIndex, destinationIndex, uid } = action.payload;
    
      const [movedTask] = state.columns[sourceColumn].splice(sourceIndex, 1);
      state.columns[destinationColumn].splice(destinationIndex, 0, movedTask);
    
      if (sourceColumn !== destinationColumn) {
        state[`${sourceColumn.toLowerCase()}Count`]--;
        state[`${destinationColumn.toLowerCase()}Count`]++;
      }
    
      saveTasksToFirestore(state, uid);
    },    
    clearTasks(state) {
      state.columns = { Progress: [], Review: [], Completed: [] };
      state.progressCount = 0;
      state.reviewCount = 0;
      state.completedCount = 0;
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

const saveTasksToFirestore = async (state, uid) => {
  if (!uid) return;
  const taskDocRef = doc(db, "Tasks", uid);
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
