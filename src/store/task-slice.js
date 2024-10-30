import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState:{
        allTasks: [],
        progress: 0,
        review: 0,
        completed:0,
    },
    reducers: {
        addNewTask(state, action){
            const newTask = action.payload
            state.progress++
            state.allTasks.push({
                id: newTask.id,
                description: newTask.description
            })
        },
        removeTask(state,action){
            const id = action.payload
            const existingItem = state.allTasks.find((task) => task.id == id)
            if(existingItem){
                state.allTasks = state.allTasks.filter(task => task.id !== id)
            }
            
        }

    }
})

export const taskActions = taskSlice.actions

export default taskSlice