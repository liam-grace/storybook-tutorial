import react from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { ITask, Task } from './Task';

type Story = ComponentStoryObj<typeof Task>;

export default {
    component: Task,
    title: 'Task',
} as ComponentMeta<typeof Task>;

const defaultTask: ITask = {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX'
}

export const Default: Story = {
    args: { task: defaultTask }
}

export const Pinned: Story = {
    args: { task: { ...defaultTask, state: 'TASK_PINNED' } }
}

export const Archived: Story = {
    args: { task: { ...defaultTask, state: 'TASK_ARCHIVED' } }
}
