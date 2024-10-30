import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        columns: {
            Progress: [],
            Review: [],
            Completed: []
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
            const existingItem = state.columns[column].find((task) => task.id === id);
            if (existingItem) {
                state.columns[column] = state.columns[column].filter(task => task.id !== id);
                state[`${column.toLowerCase()}Count`]--;
            }
        }
    }
});

export const taskActions = taskSlice.actions;

export default taskSlice;
