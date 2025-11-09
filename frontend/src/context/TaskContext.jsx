import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const { user } = useContext(AuthContext);

  // Fetch all tasks
  const fetchTasks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const endpoint = filter === 'all' ? '/api/tasks' : `/api/tasks?status=${filter}`;
      const { data } = await api.get(endpoint);
      setTasks(data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      const { data } = await api.post('/api/tasks', taskData);
      setTasks([data.data, ...tasks]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create task',
      };
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      const { data } = await api.put(`/api/tasks/${id}`, taskData);
      setTasks(tasks.map((task) => (task._id === id ? data.data : task)));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update task',
      };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete task',
      };
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (id) => {
    try {
      const { data } = await api.patch(`/api/tasks/${id}/status`);
      setTasks(tasks.map((task) => (task._id === id ? data.data : task)));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to toggle status',
      };
    }
  };

  // Fetch tasks when user logs in or filter changes
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, filter]);

  // Get task counts
  const getTaskCounts = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const pending = tasks.filter((task) => task.status === 'pending').length;
    return { total, completed, pending };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        filter,
        setFilter,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        fetchTasks,
        getTaskCounts,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
