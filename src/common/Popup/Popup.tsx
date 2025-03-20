import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Button from "../Button/Button";

// Define Role Interface
interface Role {
  guard_name: string;
  id: string;
  landing_page: string;
  name: string;
}

// Define Props Interface
interface PopupProps {
  handleApplyFilter: () => void;
  handleResetFilter: () => void;
  setSelectedRole: (roleId: string) => void;
  selectedRole: string;
}

const Popup: React.FC<PopupProps> = ({
  handleApplyFilter,
  handleResetFilter,
  setSelectedRole,
  selectedRole,
}) => {
  const { role } = useSelector((state: RootState) => state.role);

  return (
    <div className="absolute top-12 right-0 bg-white shadow-lg border border-gray-200 rounded-md p-4 w-70 z-10">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Role
      </label>
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">Select Role</option>
        {role?.map((roleData: Role) => (
          <option key={roleData.id} value={roleData.id}>
            {roleData.name}
          </option>
        ))}
      </select>

      <div className="flex justify-between mt-4">
        <Button
          className="text-blue-600 font-medium"
          onClick={handleApplyFilter}
          label="APPLY FILTER"
        />

        <Button
          className="text-gray-500"
          onClick={handleResetFilter}
          label="RESET FILTER"
        />
      </div>
    </div>
  );
};

export default Popup;