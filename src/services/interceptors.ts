// import axios from "axios";
// axios.interceptors.request.use(
//   function (response) {
//     const accessToken = localStorage.getItem("access_token") ;
//     Object.assign(response.headers , {
//       // "Content-type": "application/json",
//       // Accept: "application/json",
//       Authorization: "Bearer " + accessToken,
//     });
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// import axios from "axios";


// axios.interceptors.request.use(
//   function (response) {
//     const token = localStorage.get("access_token");
//     const accessToken = token || null;
//     Object.assign(response.headers, {
//       "Content-type": "application/json",
//       Accept: "application/json",
//       Authorization: "Bearer " + accessToken,
//     });
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );



