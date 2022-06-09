import React from 'react';

import { TaskList } from './TaskList';
import * as TaskStories from './Task.stories';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ITask } from './Task';
import { Taskbox, TasksState } from '../lib/store';
type Story = ComponentStoryObj<typeof TaskList>

const defaultTask = TaskStories.Default.args?.task || { id: '1', title: 'Test Task', state: 'TASK_INBOX' };
export const MockedState = {
    tasks: [
    { ...defaultTask, id: '1', title: 'Task 1' },
    { ...defaultTask, id: '2', title: 'Task 2' },
    { ...defaultTask, id: '3', title: 'Task 3' },
    { ...defaultTask, id: '4', title: 'Task 4' },
    { ...defaultTask, id: '5', title: 'Task 5' },
    { ...defaultTask, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
};

const Mockstore = ({ taskboxState, children}: {taskboxState: Taskbox, children: any}) => (
    <Provider
        store={configureStore({
            reducer: {
                taskbox: createSlice({
                    name: 'taskbox',
                    initialState: taskboxState,
                    reducers: {
                        updateTaskState: (state, action) => {
                            const { id, newTaskState } = action.payload;
                            const task = state.tasks.findIndex((task: ITask) => task.id === id)
                            if (task >= 0) {
                                state.tasks[task].state = newTaskState;
                            }
                        }
                    }
                }).reducer
            }
    })}>
        {children}
    </Provider>
);


export default {
    component: TaskList,
    title: 'TaskList',
    decorators: [(story) => <div style={{ padding: '3rem' }}>{ story() }</div>],
    excludeStories: /.*MockedState$/
} as ComponentMeta<typeof TaskList>


const defaultTaskArgs = TaskStories.Default.args?.task || { id: '1', title: 'Default Task', state: 'TASK_INBOX' };

export const Default: Story = {
    decorators: [
        (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>
    ]
};

export const WithPinnedTasks: Story = {
    decorators: [
        (story) => {
            const pinnedTasks = [
                ...MockedState.tasks.slice(0, 5),
                { ...defaultTaskArgs, id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
            ];

            return (
                <Mockstore 
                    taskboxState={{
                        ...MockedState,
                        tasks: pinnedTasks
                    }}
                >
                    {story()}
                </Mockstore>);
        }
    ]
};

export const Loading: Story = {
    decorators: [
        (story) => (
            <Mockstore
                taskboxState={{
                    ...MockedState,
                    status: 'loading'
                }}
            >
                {story()}
            </Mockstore>
        )
    ]
}

export const Empty: Story = {
    decorators: [
        (story) => (
            <Mockstore
                taskboxState={{
                    ...MockedState,
                    tasks: []
                }}
            >
                {story()}
            </Mockstore>
        )
    ]
}