import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

type FormData = z.infer<typeof schema>;

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError("");
      await axios.post("http://localhost:4000/auth/register", data);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      setError("Registration failed. Email might already be in use.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <input
          {...register("email")}
          placeholder="Email"
          className="p-2 border"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("name")}
          placeholder="Name"
          className="p-2 border"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="p-2 border"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button type="submit" className="p-2 bg-blue-500 text-white">
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500 hover:text-blue-600">
          Sign in
        </Link>
      </p>
    </div>
  );
}
