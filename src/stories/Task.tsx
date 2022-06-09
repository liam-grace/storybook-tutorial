import react from 'react';
import PropTypes from 'prop-types';
import './task.scss';

export interface ITask {
    id: string;
    title: string;
    state: string
    updatedAt?: Date; 
}

interface TaskProps {
    task: ITask;
    onArchiveTask: (id: string) => void;
    onPinTask: (id: string) => void;
}

export const Task = ({ task, onArchiveTask, onPinTask }: TaskProps) => {
    const { id, title, state } = task!;
    return (
        <div className={`list-item ${state}`}>
            <label className="checkbox">
                <input 
                    type="text" 
                    defaultChecked={state === 'TASK_ARCHIVED'}
                    disabled={true} 
                    name="checked"
                />
                <span 
                    className="checkbox-custom"
                    onClick={() => onArchiveTask(id)}
                            id={`archiveTask-${id}`} 
                            aria-label={`archiveTask-${id}`}
                />
            </label>
            <div className="title">
                <input type="text" value={title} readOnly={true} placeholder="Input title" />
            </div>

            <div className="actions" onClick={event => event.stopPropagation()}>
                {state !== 'TASK_ARCHIVED' && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a onClick={() => onPinTask(id)}>
                        <span 
                            className={'icon-star'} 
                            id={`pinTask-${id}`} 
                            aria-label={`pinTask-${id}`}
                        />
                    </a>
                )}
            </div>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
    }),
    onArchiveTask: PropTypes.func,
    onPinTask: PropTypes.func
};