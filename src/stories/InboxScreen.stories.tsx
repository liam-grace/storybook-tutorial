import React from 'react';
import InboxScreen from './InboxScreen';
import store from '../lib/store';
import { rest } from 'msw';
import { MockedState } from './TaskList.stories';

import { Provider } from 'react-redux';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { fireEvent, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';

type Story = ComponentStoryObj<typeof InboxScreen>

export default {
    component: InboxScreen,
    title: 'InboxScreen',
    decorators: [(story) => <Provider store={store}>{story()}</Provider>]
} as ComponentMeta<typeof InboxScreen>;


export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                rest.get(
                    'https://jsonplaceholder.typicode.com/todos?userId=1',
                    (req, res, ctx) => res(ctx.json(MockedState.tasks))
                )
            ]
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        // Waits for the component to transition from the loading state
        await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
        // Waits for the component to be updated based on the store
        await waitFor(async () => {
            // Simulates pinning the first task
            await fireEvent.click(canvas.getByLabelText('pinTask-1'));
            // Simulates pinning the third task
            await fireEvent.click(canvas.getByLabelText('pinTask-3'));
        });
    }
};

export const Error: Story = {
    parameters: {
        msw: {
            handlers: [
                rest.get(
                    'https://jsonplaceholder.typicode.com/todos?userId=1',
                    (req, res, ctx) => res(ctx.status(403))
                )
            ]
        }
    }
};
