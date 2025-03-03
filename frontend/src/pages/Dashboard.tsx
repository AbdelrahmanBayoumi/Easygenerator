import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  email: string;
  name: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Authentication failed");
        localStorage.removeItem("token");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome to the Application
      </h1>
      {user && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {user.name}!
            </h2>
            <p className="text-gray-600 mt-2">Email: {user.email}</p>
          </div>
        </div>
      )}

      <button
        className="w-full mt-6 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
      >
        Logout
      </button>
    </div>
  );
}
