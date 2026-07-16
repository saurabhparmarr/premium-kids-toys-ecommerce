import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

import { registerUser } from "../features/auth/authThunk";
import { clearError } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      toast.success("Registration Successful 🎉");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (trimmedName.length < 4) {
      return toast.error("Name must be at least 4 characters");
    }

    if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
      return toast.error("Name can contain only letters and spaces");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return toast.error("Please enter a valid email address");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    dispatch(
      registerUser({
        name: trimmedName,
        email: trimmedEmail,
        password,
      })
    );
  };

  if (loading) {
    return <Loader message="Creating your account..." />;
  }

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[2rem] border border-orange-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur md:p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950">
            Create an Account
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Join us to manage orders and explore premium collections.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
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

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
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
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#f97316] hover:text-[#ea580c]"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;