import React from 'react';
import InboxScreen from './InboxScreen';
import store from '../lib/store';

import { Provider } from 'react-redux';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

type Story = ComponentStoryObj<typeof InboxScreen>

export default {
    component: InboxScreen,
    title: 'InboxScreen',
    decorators: [(story) => <Provider store={store}>{story()}</Provider>]
} as ComponentMeta<typeof InboxScreen>;

export const Default: Story = {};
export const Error: Story = {};