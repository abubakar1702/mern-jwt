import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth";


const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
      if (!user) {
          navigate("/login"); // Redirect to login if not logged in
      }
  }, [user, navigate]);

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
              {user ? (
                  <>
                      <h2 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h2>
                      <p className="text-gray-700">Email: {user.email}</p>
                      <button
                          onClick={logout}
                          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                          Log Out
                      </button>
                  </>
              ) : (
                  <h2 className="text-2xl font-bold mb-6">Please log in.</h2>
              )}
          </div>
      </div>
  );
};

export default Dashboard;
