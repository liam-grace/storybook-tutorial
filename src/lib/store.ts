import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../stories/Task";

export interface Taskbox {
    tasks: ITask[];
    status: string;
    error: string | null;
}

const defaultTasks: ITask[] = [
    { id: '1', title: 'Something', state: 'TASK_INBOX' },
    { id: '2', title: 'Something more', state: 'TASK_INBOX' },
    { id: '3', title: 'Something else', state: 'TASK_INBOX' },
    { id: '4', title: 'Something new', state: 'TASK_INBOX' },
];

const TaskBoxData: Taskbox = {
    tasks: defaultTasks,
    status: 'idle',
    error: null
};


const TasksSlice = createSlice({
    name: 'taskbox',
    initialState: TaskBoxData,
    reducers: {
        updateTaskState: (state, action) => {
            const { id, newTaskState } = action.payload;
            const task = state.tasks.findIndex((task) => task.id === id)
            if (task >= 0) {
                state.tasks[task].state = newTaskState;
            }
        }
    }
});

export const { updateTaskState } = TasksSlice.actions;

const store = configureStore({
    reducer: {
        taskbox: TasksSlice.reducer
    }
});

export type TasksState = ReturnType<typeof store.getState>;
export type UpdateTaskDispatch = typeof store.dispatch;

export default store;