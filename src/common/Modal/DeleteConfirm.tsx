import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="bg-[#1A1A29] text-white text-lg font-bold py-3 px-4 rounded-t-lg">
          DELETE CONFIRMATION
        </div>
        <div className="p-4 text-center text-gray-600">
          Are you sure you want to delete this record?
        </div>
        <div className="flex justify-center gap-4 p-4">
          <button
            onClick={onConfirm}
            className="bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-900"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
