const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onToggle(task._id)}
            className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          />

          {/* Task Content */}
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                task.status === 'completed'
                  ? 'line-through text-gray-400'
                  : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`mt-1 text-sm ${
                  task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {task.description}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              Created: {formatDate(task.createdAt)}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {task.status === 'completed' ? '✓ Completed' : '○ Pending'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;