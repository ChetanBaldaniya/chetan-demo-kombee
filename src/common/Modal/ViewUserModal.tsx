import React from 'react';
import { X } from 'lucide-react';

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({
  isOpen,
  onClose,
  userData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="bg-[#1A1A29] text-white text-lg font-bold py-3 px-4 rounded-t-lg flex justify-between items-center">
          <span>VIEW USER</span>
          <button onClick={onClose}>
            <X className="text-white cursor-pointer" size={20} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {[
            { label: 'Name', value: userData.name },
            { label: 'Email', value: userData.email },
            { label: 'Role', value: userData.role?.name },
            { label: 'Dob', value: userData.dob },
            { label: 'Profile', value: <a href={userData.profileLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a> },
            { label: 'Gender', value: userData.gender },
            { label: 'Status', value: userData.status }
          ].map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} rounded-md py-2 px-3`}
            >
              <span className="font-bold">{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
