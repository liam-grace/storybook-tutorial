import React from 'react';

import { TaskList } from './TaskList';
import * as TaskStories from './Task.stories';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

type Story = ComponentStoryObj<typeof TaskList>

export default {
    component: TaskList,
    title: 'TaskList',
    decorators: [(story) => <div style={{ padding: '3rem' }}>{ story() }</div>],
} as ComponentMeta<typeof TaskList>


const defaultTaskArgs = TaskStories.Default.args?.task || { id: '1', title: 'Default Task', state: 'TASK_INBOX' };

export const Default: Story = {
    args: {
        tasks: [
            { ...defaultTaskArgs, id: '1', title: 'Task 1' },
            { ...defaultTaskArgs, id: '2', title: 'Task 2' },
            { ...defaultTaskArgs, id: '3', title: 'Task 3' },
            { ...defaultTaskArgs, id: '4', title: 'Task 4' },
            { ...defaultTaskArgs, id: '5', title: 'Task 5' },
            { ...defaultTaskArgs, id: '6', title: 'Task 6' },
        ]
    }
};

export const WithPinnedTasks: Story = {
    args: {
        tasks: [
            ...Default.args!.tasks!.slice(0, 5),
            { ...defaultTaskArgs, id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
        ]
    }
};

export const Loading: Story = {
    args: {
        tasks: [],
        loading: true
    }
}

export const Empty: Story = {
    args: {
        tasks: [],
        loading: false 
    }
}