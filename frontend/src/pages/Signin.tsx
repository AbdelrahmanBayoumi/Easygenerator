import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Signin() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");

  const onSubmit = async (data: any) => {
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        data
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          {...register("email")}
          placeholder="Email"
          className="p-2 border"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="p-2 border"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">
          Sign In
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}
