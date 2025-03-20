// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// type FormData = {
//   email: string;
//   password: string;
// };

// type FormErrors = {
//   email: string;
//   password: string;
// };

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState<FormErrors>({ email: "", password: "" });
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const validateForm = (): boolean => {
//     let valid = true;
//     const newErrors: FormErrors = { email: "", password: "" };

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//       valid = false;
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <div className="h-full bg-gray-400 dark:bg-gray-900">
//     //   <div className="mx-auto">
//     <div className="h-screen w-full">
//       <div className="w-full h-full flex">
//         <div className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover ">
//           {/* // style="background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"> */}
//         </div>
//         {/* <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5  ">
//               <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
//                 Create an Account!
//               </h3>
//               <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
//                 <div className="mb-4 md:flex md:justify-between">
//                   <div className="mb-4 md:mr-2 md:mb-0">
//                     <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
//                       First Name
//                     </label>
//                     <input
//                       className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                       id="firstName"
//                       type="text"
//                       placeholder="First Name"
//                     />
//                   </div>
//                   <div className="md:ml-2">
//                     <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
//                       Last Name
//                     </label>
//                     <input
//                       className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                       id="lastName"
//                       type="text"
//                       placeholder="Last Name"
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
//                     Email
//                   </label>
//                   <input
//                     className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                     id="email"
//                     type="email"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div className="mb-4 md:flex md:justify-between">
//                   <div className="mb-4 md:mr-2 md:mb-0">
//                     <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
//                       Password
//                     </label>
//                     <input
//                       className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                       id="password"
//                       type="password"
//                       placeholder="******************"
//                     />
//                     <p className="text-xs italic text-red-500">
//                       Please choose a password.
//                     </p>
//                   </div>
//                   <div className="md:ml-2">
//                     <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
//                       Confirm Password
//                     </label>
//                     <input
//                       className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                       id="c_password"
//                       type="password"
//                       placeholder="******************"
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-6 text-center">
//                   <button
//                     className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
//                     type="button"
//                   >
//                     Register Account
//                   </button>
//                 </div>
//                 <hr className="mb-6 border-t" />
//                 <div className="text-center">
//                   <a
//                     className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
//                     href="#"
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>
//                 <div className="text-center">
//                   <a
//                     className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
//                     href="./index.html"
//                   >
//                     Already have an account? Login!
//                   </a>
//                 </div>
//               </form>
//             </div> */}
//         <div className="flex h-screen items-center justify-center bg-gray-100">
//           <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//             <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
//             <p className="text-gray-500 text-center mb-6">
//               Enter your username and password
//             </p>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-600 mb-1"
//                 >
//                   Email*
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="admin@gmail.com"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-600 mb-1"
//                 >
//                   Password*
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="••••••"
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//                 )}
//               </div>

//               <div className="flex justify-between items-center mb-6">
//                 <div></div>
//                 <a href="#" className="text-blue-500 text-sm hover:underline">
//                   Forgot Password?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 className={`w-full text-white py-3 rounded-md transition ${
//                   loading
//                     ? "bg-blue-500 cursor-not-allowed"
//                     : "bg-blue-700 hover:bg-blue-800"
//                 }`}
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Submit"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//     //   </div>
//     // </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/action/auth";
import { AxiosError } from "axios";

type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
   
    dispatch(loginUser(formData) as any)
      .then(() => {
        navigate("/user");
      })
      .catch((error :AxiosError) => {
        console.log(error,"error");
        
      })
      .finally(() => setLoading(false));
  
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white flex items-center justify-center flex-col p-10">
        <h1 className="text-4xl font-bold">EASTERN</h1>
        <p className="mt-4 text-lg">Welcome to Eastern Techno Solutions!</p>
        <p className="absolute bottom-4">© 2025 Eastern Techno Solutions</p>
      </div>

      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
          <p className="text-gray-500 text-center mb-6">
            Enter your username and password
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password*
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <div></div>
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full text-white py-3 rounded-md transition ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
