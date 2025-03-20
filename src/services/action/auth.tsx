import { logIn } from "../../redux/features/authSlice";
import { Notifications } from "../../utils/notification";
import  { apiRequest } from "../apiConfig";
import { PATH } from "../apiConstant";

// type apiPath = {
//   url: string;
//   method: string;
//   data?: any;
//   headers?: any;
//   noHeaders: any;
// };
type dataLogin = {
  email: string;
  password: string;
};



export const loginUser = (data: dataLogin) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    apiRequest({
      method: "POST",
      url: PATH.auth.login,
      data,
    })
      .then((response: any) => {
        resolve(response.data);
        let userData = response.data ;
        dispatch(logIn(userData));
        localStorage.setItem("access_token", userData.authorization);
        localStorage.setItem("name", userData.name);
        Notifications("success", "login successfully");
      })
      .catch((error: any) => {
        reject(error)
        Notifications("error", "CREDENTIAL INVALID !");
      });
  });
};

