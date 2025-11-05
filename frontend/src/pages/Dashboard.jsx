import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import FilterTabs from '../components/FilterTabs';
import DeleteModal from '../components/DeleteModal';
import EditModal from '../components/EditModal';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const {
    tasks,
    loading,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskCounts,
  } = useContext(TaskContext);

  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateTask = async (formData) => {
    const result = await createTask(formData);
    if (result.success) {
      setShowCreateForm(false);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteTask(selectedTask._id);
    setDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const counts = getTaskCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              {showCreateForm ? '✕ Cancel' : '+ New Task'}
            </button>
          </div>

          {/* Create Task Form */}
          {showCreateForm && (
            <div className="mb-8">
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          )}

          {/* Filter Tabs */}
          <FilterTabs
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? "Get started by creating your first task!"
                  : `No ${filter} tasks found. Try a different filter.`}
              </p>
              {!showCreateForm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  + Create Task
                </button>
              )}
            </div>
          ) : (
            /* Task List */
            <div className="grid md:grid-cols-2 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={toggleTaskStatus}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        taskTitle={selectedTask?.title}
      />

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        task={selectedTask}
        onUpdate={updateTask}
      />
    </div>
  );
};

export default Dashboard;