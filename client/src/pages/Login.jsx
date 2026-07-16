import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

import { loginUser } from "../features/auth/authThunk";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      toast.success("Login Successful 🎉");
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  if (loading) {
    return <Loader message="Authenticating, please wait..." />;
  }

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[2rem] border border-orange-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Login to manage your orders and track delivery.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          <Button
            type="submit"
            className="mt-2 w-full py-3.5 text-sm"
            disabled={loading}
          >
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold tracking-wide text-[#f97316] hover:text-[#ea580c]"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;