const DeleteModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Task?</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "<strong>{taskTitle}</strong>"? This action cannot be
          undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;