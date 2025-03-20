import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash,
  Search,
  Filter,
  Plus,
  Download,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../common/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import {
  deleteMultiple,
  deleteUserById,
  fetchUsers,
} from "../../redux/features/userSlice";
import { RootState } from "../../redux/store";
import { fetchRoles } from "../../redux/features/roleSlice";
import Popup from "../../common/Popup/Popup";
import SortIcon from "../../common/SortIcone/SortIcone";
import DeleteModal from "../../common/Modal/DeleteConfirm";
import ViewUserModal from "../../common/Modal/ViewUserModal";
import { exportCsvFile } from "../../services/action/user";
import InfiniteProgressBar from "../../common/PogressBar/pograss";

type DeleteId = {
  id: string[];
};
type DeleteType = {
  id: string;
  open: boolean;
  type?: string;
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  dob: string;
  gender: string;
  status: string;
}
type ViewType = {
  isOpen: boolean;
  data?: User;
};
const Dashboard = () => {
  const { users, totalPages } = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("access_token");
  //currentPage,
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [viewUser, setViewUser] = useState<ViewType>({
    isOpen: false,
    data: {} as User,
  });
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<string>("");
  const [singleDelete, setSingleDelete] = useState<DeleteType>({
    id: "",
    open: false,
    type: "",
  });
  const [orderBy, setOrderBy] = useState<string>("asc");
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserListingData();
  }, [dispatch, token, currentPage, rowsPerPage, searchValue, sort, orderBy]);

  useEffect(() => {
    dispatch(fetchRoles({ page: currentPage, per_page: 10 }) as any);
  }, [dispatch, currentPage]);

  const getUserListingData =async () => {
    setLoading(true)
   await dispatch(
      fetchUsers({
        page: currentPage,
        per_page: rowsPerPage,
        search: searchValue,
        filter,
        sort,
        order_by: orderBy,
      }) as any
    );
    setLoading(false)
  };

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrderBy(orderBy === "asc" ? "desc" : "asc");
    } else {
      setSort(field);
      setOrderBy("asc");
    }
  };

  // const handlePageChange = (newPage: number) => {
  //   dispatch(setCurrentPage(newPage));
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => (prev < 100 ? prev + 20 : 100));
  //   }, 400);

  //   setTimeout(() => {
  //     // setData(users)
  //     if (users?.length) {
  //       setLoading(false);
  //     }
  //   }, 400);

  //   return () => clearInterval(interval);
  // }, [users]);

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const singleDeleteData = (id: string, type: string) => {
    setSingleDelete({ open: true, id, type });
  };
  const handleSingleDelete = async () => {
    if (singleDelete.type === "single") {
      await dispatch(deleteUserById(singleDelete.id) as any);
    } else {
      handleDeleteUser();
    }
    setSingleDelete({ open: false, id: "", type: "" });
  };

  const handleChangeRowsPerPage = (event: number) => {
    setRowsPerPage(event);
    setCurrentPage(1);
  };
  const handleEditUser = (id: string) => {
    navigate(`/user/edit/${id}`);
  };
  const handleApplyFilter = () => {
    getUserListingData();
    setPopoverOpen(false);
  };
  const handleResetFilter =async () => {
    setLoading(true)
    setFilter("");
  await  dispatch(
      fetchUsers({
        page: 1,
        per_page: 10,
        search: searchValue,
        filter: "",
        sort,
        order_by: orderBy,
      }) as any
    );
    setLoading(false);
    setPopoverOpen(false);
    setRowsPerPage(10);
    setCurrentPage(1);
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users?.map((user) => user.id) as any);
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUsers.length) {
      const payloadData = { id: selectedUsers } as DeleteId;
      try {
        const resultAction = await dispatch(deleteMultiple(payloadData) as any);

        if (deleteMultiple.fulfilled.match(resultAction)) {
          setSelectedUsers([]);
          setSingleDelete({ id: "", open: false });
        } else {
          console.error("Delete failed:", resultAction.error.message);
        }
      } catch (error) {
        console.error("Failed to delete users:", error);
      }
    }
  };

  const handleAddUser = () => {
    navigate("/user/add");
  };
  const handelViewUser = (user: User) => {
    setViewUser({ isOpen: true, data: user });
  };

  const closeModal = () => {
    setSingleDelete({ open: false, id: "" });
    setViewUser({ isOpen: false, data: {} as User });
  };

  const handleExport = async () => {
    exportCsvFile({
      page: 1,
      per_page: 10,
      search: searchValue,
      filter: "",
      sort,
      order_by: orderBy,
    }).then((response) => {
      const currentDate = new Date().toISOString().split("T")[0];
      const fileName = `user_${currentDate}.csv`;
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center border-b border-teal-500 w-1/3">
          <Search className="text-teal-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border-none focus:ring-0 focus:outline-none w-full"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative inline-block">
            <button
              className="bg-blue-600 text-white rounded-md p-2"
              onClick={() => setPopoverOpen(!isPopoverOpen)}
            >
              <Filter size={18} />
            </button>

            {isPopoverOpen && (
              <Popup
                selectedRole={filter}
                setSelectedRole={setFilter}
                handleApplyFilter={handleApplyFilter}
                handleResetFilter={handleResetFilter}
              />
            )}
          </div>
          <button
            className="bg-teal-600 text-white rounded-md p-2"
            onClick={() => handleAddUser()}
          >
            <Plus size={18} />
          </button>
          <button
            className="bg-blue-600 text-white rounded-md p-2"
            onClick={() => handleExport()}
          >
            <Download size={18} />
          </button>
          {selectedUsers?.length > 0 && (
            <button
              className="bg-blue-600 text-white rounded-md p-2"
              onClick={() => singleDeleteData("", "multiple")}
            >
              <Trash size={18} />
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="relative overflow-hidden shadow-lg rounded-lg">
          <table className="min-w-full bg-white  ">
            <thead className=" bg-teal-800 text-white sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left">
                  {users?.length > 0 &&<input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedUsers.length === users.length}
                  />}
                </th>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <button>
                    <SortIcon
                      sortKey="name"
                      activeSort={sort}
                      activeOrder={orderBy}
                    />
                  </button>
                </th>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email
                  <button>
                    <SortIcon
                      sortKey="email"
                      activeSort={sort}
                      activeOrder={orderBy}
                    />
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Dob</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* {loading && (
            <div className="absolute top-10 left-0 w-full h-2 bg-gray-300 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )} */}
            <tbody>
              {loading &&
                <tr>
                  <td colSpan={8}>
                    <InfiniteProgressBar />
                  </td>
                </tr>
              }
              {users?.map((user: User | any, index: number) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="py-3 px-4">{user?.name}</td>
                  <td className="py-3 px-4">{user?.email}</td>
                  <td className="py-3 px-4">{user?.role?.name}</td>
                  <td className="py-3 px-4">{user?.dob}</td>
                  <td className="py-3 px-4">{user?.gender_text}</td>
                  <td
                    className={`py-3 px-4 ${
                      user.status_text === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user.status_text}
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-2">
                    <Eye
                      className="text-gray-500 cursor-pointer"
                      onClick={() => handelViewUser(user)}
                    />
                    <Pencil
                      className="text-gray-500 cursor-pointer"
                      onClick={() => handleEditUser(user.id)}
                    />
                    <Trash
                      className="text-gray-500 cursor-pointer"
                      onClick={() => singleDeleteData(user.id, "single")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-end  mt-4 justify-end">
        <Pagination
          totalItems={totalPages}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onPageChange={handleChangePage}
        />
      </div>
      <div>
        <DeleteModal
          isOpen={singleDelete.open}
          onClose={() => closeModal()}
          onConfirm={() => handleSingleDelete()}
        />
      </div>
      <div>
        <ViewUserModal
          isOpen={viewUser.isOpen}
          onClose={() => closeModal()}
          userData={viewUser.data}
        />
      </div>
    </div>
  );
};

export default Dashboard;
