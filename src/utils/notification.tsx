import { toast, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Notifications = (type: TypeOptions, message: string) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    type: type,
  };

  toast(<p>{message}</p>, options);
};