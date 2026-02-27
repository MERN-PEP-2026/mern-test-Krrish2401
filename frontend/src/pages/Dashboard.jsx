import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const res = await api.get('/tasks', { params });
      setTasks(res.data.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (data) => {
    try {
      const res = await api.post('/tasks', data);
      setTasks([res.data.data.task, ...tasks]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await api.put(`/tasks/${id}`, data);
      setTasks(tasks.map((t) => (t._id === id ? res.data.data.task : t)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="create-task">
          <h2>Add New Task</h2>
          <TaskForm onSubmit={handleCreate} />
        </section>

        <section className="tasks-section">
          <div className="tasks-header">
            <h2>Your Tasks</h2>
            <div className="filter-group">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={filter === 'pending' ? 'active' : ''}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          {error && <div className="error">{error}</div>}
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
