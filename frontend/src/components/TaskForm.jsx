import { useState } from 'react';

const TaskForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState(initialData?.status || 'pending');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ title, description, status });
            if (!initialData) {
                setTitle('');
                setDescription('');
                setStatus('pending');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
            </div>
            {initialData && (
                <div className="form-group">
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            )}
            <div className="form-actions">
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : initialData ? 'Update' : 'Add Task'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn-cancel">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
