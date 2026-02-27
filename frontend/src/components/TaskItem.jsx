import { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdate, onDelete }) => {
    const [editing, setEditing] = useState(false);

    const handleStatusToggle = () => {
        onUpdate(task._id, {
            status: task.status === 'pending' ? 'completed' : 'pending',
        });
    };

    const handleEdit = async (data) => {
        await onUpdate(task._id, data);
        setEditing(false);
    };

    if (editing) {
        return (
            <div className="task-item editing">
                <TaskForm
                    initialData={task}
                    onSubmit={handleEdit}
                    onCancel={() => setEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className={`task-item ${task.status}`}>
            <div className="task-content">
                <div className="task-header">
                    <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={handleStatusToggle}
                    />
                    <h3 className={task.status === 'completed' ? 'completed-text' : ''}>
                        {task.title}
                    </h3>
                </div>
                {task.description && <p>{task.description}</p>}
                <span className={`status-badge ${task.status}`}>{task.status}</span>
            </div>
            <div className="task-actions">
                <button onClick={() => setEditing(true)} className="btn-edit">
                    Edit
                </button>
                <button onClick={() => onDelete(task._id)} className="btn-delete">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
