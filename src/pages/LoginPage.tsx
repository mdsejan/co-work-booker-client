import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Loggin in...");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setUser({ token: response.token }));
      toast.success("Logged In Successfull", { id: toastId, duration: 2000 });

      navigate(location?.state ? location.state : "/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Login failed. Please try again.", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error("An unexpected error occurred.", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-8 lg:p-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded border w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-8 text-center">
          <p className="text-md">
            Don't have an account? &nbsp;
            <Link to="/signup" className="text-blue-500 hover:underline">
              <span className="font-bold">Sign up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
