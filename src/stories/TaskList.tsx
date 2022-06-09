import React from 'react';
import PropTypes from 'prop-types';

import { Task, ITask } from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { TasksState, UpdateTaskDispatch, updateTaskState } from '../lib/store';

interface TaskListProps {
    tasks: ITask[],
    loading: boolean;
    onPinTask: (id: string) => void,
    onArchiveTask: (id: string) => void,
}

// export const TaskList = ({loading, tasks, onPinTask, onArchiveTask}: TaskListProps) => {
export const TaskList = () => {

    // Retrieve state from the store
    const tasks = useSelector((state: TasksState) => {
        const tasksInOrder = [
            ...state.taskbox.tasks.filter(t => t.state === 'TASK_PINNED'),
            ...state.taskbox.tasks.filter(t => t.state !== 'TASK_PINNED'),
        ];

        const filteredTasks = tasksInOrder.filter(
            t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
        );

        return filteredTasks;
    });

    const { status } = useSelector((state: TasksState) => state.taskbox);

    const dispatch: UpdateTaskDispatch = useDispatch();

    const pinTask = (value: string) => {
        dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED'}));
    }

    const archiveTask = (value: string) => {
        dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED'}));
    }

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-textbox" />
            <span className="glow-text" >
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );

    if (status === 'loading') {
        return (
            <div className="list-items" data-testid="loading" key={"loading"}>
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="list-items">
                <div className="wrapper-message">
                    <span className="icon-check"/>
                    <span className="title-message">You have no tasks</span><br />
                    <span className="subtle-message">Sit back and relax</span>
                </div>
            </div>
        );
    }

    const tasksInOrder = [
        ...tasks.filter(t => t.state === 'TASK_PINNED'),
        ...tasks.filter(t => t.state !== 'TASK_PINNED'),
    ];

    return (
        <div className="list-items">
            {tasksInOrder.map(task => (
                <Task 
                    key={task.id} 
                    task={task}
                    onPinTask={task => pinTask(task)} 
                    onArchiveTask={task => archiveTask(task)} 
                />
            ))}
        </div>
    );
};

TaskList.propTypes = {
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
    onPinTask: PropTypes.func,
    onArchiveTask: PropTypes.func
};

TaskList.defaultProps = {
    loading: false
};