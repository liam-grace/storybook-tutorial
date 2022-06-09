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

// const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

// export const Default = Template.bind({})
// Default.args = {
//     task: {
//         id: '1',
//         title: 'Test Task',
//         state: 'TASK_INBOX',
//         updatedAt: new Date(2022, 7, 1, 23, 0)
//     },
// };

// export const Pinned = Template.bind({});
// Pinned.args = {
//     task: {
//         ...Default.args.task,
//         state: 'PINNED_TASK'
//     },
// };

// export const Archived = Template.bind({})
// Archived.args = {
//     task: {
//         ...Default.args.task,
//         state: 'ARCHIVED_TASK'
//     },
// };