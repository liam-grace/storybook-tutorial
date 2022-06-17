import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

interface IExternalTask {
    id: number;
    title: string;
    completed: boolean;
}

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
    const data: IExternalTask[] = await response.json();
    const result: ITask[] = data.map((task) => ({
        id: `${task.id}`,
        title: task.title,
        state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX'
    }));
    return result;
});


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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.tasks = [];
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.status = 'failed';
                state.error = 'Something went wrong';
                state.tasks = [];
            });
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