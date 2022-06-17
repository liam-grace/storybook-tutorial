import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, TasksState } from '../lib/store';
import { TaskList } from './TaskList';

const InboxScreen = () => {
    const dispatch = useDispatch();

    const { error } = useSelector((state: TasksState) => state.taskbox);

    // Triggeres the data fetching when the component is mounted
    useEffect(() => {
        dispatch((fetchTasks as any)()); // What is going on here?
    }, []);

    if (error) {
        return (
            <div className='page lists-show'>
                <div className='wrapper-message'>
                    <span className='icon-face-sad' />
                    <div className='title-message'>Oh no!</div><br />
                    <div className='subtitle-message'>Something went wrong</div>
                </div>
            </div>
        );
    }

    return (
        <div className='page lists-show'>
            <nav>
                <h1 className='title-page'>
                    <span className='title-wrapper'>Taskbox</span>
                </h1>
            </nav>
            <TaskList tasks={[]} />
        </div>
    );
};

export default InboxScreen;