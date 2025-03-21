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
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({ email: "", password: "" });
  const [submitted, setSubmitted] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (submitted) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: value ? "" : prevErrors[id] }));
    }
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
    setSubmitted(true);

    if (!validateForm()) return;

    setLoading(true);
    dispatch(loginUser(formData) as any)
      .then(() => navigate("/user"))
      .catch((error: AxiosError) => console.log(error, "error"))
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
          <p className="text-gray-500 text-center mb-6">Enter your email and password</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                Password*
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
                loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
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
