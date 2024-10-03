import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Signing up...");

    if (!name || !email || !password || !phone || !address) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await signup({
        name,
        email,
        password,
        phone,
        address,
        role: "user",
      }).unwrap();

      dispatch(setUser({ token: response.token }));
      toast.success("Signup Successful", { id: toastId, duration: 2000 });

      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Signup failed. Please try again.", {
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
        className="bg-white  p-8 rounded border w-full max-w-md "
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter your name"
            required
          />
        </div>

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

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter your address"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="mt-8 text-center">
          <p className="text-md">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-500 hover:underline">
              <span className="font-bold">Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
