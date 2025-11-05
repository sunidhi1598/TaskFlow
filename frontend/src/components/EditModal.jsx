import TaskForm from './TaskForm';

const EditModal = ({ isOpen, onClose, task, onUpdate }) => {
  if (!isOpen) return null;

  const handleSubmit = async (formData) => {
    const result = await onUpdate(task._id, formData);
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default EditModal;