import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
    if (tasks.length === 0) {
        return <div className="no-tasks">No tasks found</div>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
