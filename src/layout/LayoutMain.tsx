import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import { Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { Notifications } from "../utils/notification";
import { logOut } from "../redux/features/authSlice";
import { logOutUserData } from "../services/action/user";

type Layout = {
  children: ReactNode;
};

const LayoutMain = ({ children }: Layout) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (route: string) => {
    navigate(route);
  };
 const nameUser = localStorage.getItem('name');
  const sidebar = [
    {
      name: "User",
      path: "/dashboard",
      img: "../../public/multiuser.png",
    },
    {
      name: "Activity Log",
      path: "/dashboard",
      img: "../../public/multiuser.png",
    },
  ];
  const handleLogOut = async () => {
    logOutUserData().then(() => {
      localStorage.clear();
          dispatch(logOut());
          navigate("/");
          Notifications("success", "Log out successfully");
    })
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 transition-all duration-300`}
      >
        <div className="flex gap-5 items-center justify-center h-16 bg-gray-900">
          {isSidebarOpen && (
            <div>
              <img src="../../public/logo.png" width={150} />
            </div>
          )}
          <button
            onMouseEnter={() => setIsSidebarOpen(!isSidebarOpen)}
            // onMouseLeave={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white focus:outline-none"
          >
            {isSidebarOpen ? (
              <div>
                <svg
                  data-v-47bee7fc=""
                  version="1.1"
                  viewBox="0 0 24 24"
                  height="24px"
                  width="24px"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                >
                  <title //xmlns="http://www.w3.org/2000/svg"
                  >
                    Stockholm-icons / Navigation / Angle-double-left
                  </title>
                  <desc xmlns="http://www.w3.org/2000/svg">
                    Created with Sketch.
                  </desc>
                  <defs xmlns="http://www.w3.org/2000/svg"></defs>
                  <g
                    xmlns="http://www.w3.org/2000/svg"
                    id="Stockholm-icons-/-Navigation-/-Angle-double-left"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                    <path
                      d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                      id="Path-94"
                      fill="blue"
                      fillRule="nonzero"
                      transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) "
                    ></path>
                    <path
                      d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                      id="Path-94"
                      fill="blue"
                      fillRule="nonzero"
                      opacity="0.3"
                      transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) "
                    ></path>
                  </g>
                </svg>
              </div>
            ) : (
              <div>
                <svg
                  data-v-47bee7fc=""
                  version="1.1"
                  viewBox="0 0 24 24"
                  height="24px"
                  width="24px"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                >
                  <title // xmlns="http://www.w3.org/2000/svg"
                  >
                    Stockholm-icons / Navigation / Angle-double-left
                  </title>
                  <desc xmlns="http://www.w3.org/2000/svg">
                    Created with Sketch.
                  </desc>
                  <defs xmlns="http://www.w3.org/2000/svg"></defs>
                  <g
                    xmlns="http://www.w3.org/2000/svg"
                    id="Stockholm-icons-/-Navigation-/-Angle-double-left"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                    <path
                      d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                      id="Path-94"
                      fill="blue"
                      fillRule="nonzero"
                      transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) "
                    ></path>
                    <path
                      d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                      id="Path-94"
                      fill="blue"
                      fillRule="nonzero"
                      opacity="0.3"
                      transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) "
                    ></path>
                  </g>
                </svg>
              </div>
            )}
          </button>
        </div>
        {
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex-1 px-2 py-4 bg-gray-800">
              {sidebar.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center p-2  gap-5 mt-2 text-gray-100 hover:bg-gray-700"
                  onClick={() => handleNavigate(record.path)}
                >
                  <div className="h-7 w-7">
                    <img src={record.img} />
                  </div>
                  {isSidebarOpen && <div>{record.name}</div>}
                </div>
              ))}
            </div>
          </div>
        }
      </div>

      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-72 z-50 bg-white shadow-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Admin Profile</h2>
            <Button onClick={() => setIsOpen(false)} label={"✖️"} />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">{nameUser}</h3>
            <p className="text-gray-500">Administrator</p>
          </div>

          <div className="flex items-center text-sm text-gray-700 mb-4">
            <Mail className="mr-2" />
            <span>admin@gmail.com</span>
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              className="bg-[#D9EDF7]"
              onClick={() => setIsOpen(false)}
              label={"Role"}
            />
            <Button
              className="bg-[#D9EDF7]"
              onClick={() => setIsOpen(false)}
              label={"Change Password"}
            />
            <Button
              className="bg-[#D9EDF7]"
              onClick={() => {
              handleLogOut()
              }}
              label={"Sign out"}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
          </div>
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="fixed top-4 right-4  text-white p-2 rounded-md z-50"
            >
              <div>
                <p className="text-gray-400 inline font-medium">
                  Hi,{" "}
                  <span className="text-black font-bold mr-3">
                  {nameUser}
                  </span>
                  <span>☰</span>
                </p>
                <div></div>
              </div>
            </button>
          )}
        </div>
        <div className="p-4">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutMain;
