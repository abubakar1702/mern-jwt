import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path:"/register",
    element: <Register />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/dashboard",
    element: <Dashboard />
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
