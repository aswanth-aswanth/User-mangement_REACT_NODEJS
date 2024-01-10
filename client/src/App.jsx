import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import { Provider, useSelector } from "react-redux";
import store from "./store/configureStore";
import EditUser from "./components/EditUser";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("user : ", isAuthenticated);
  const isAdminAuthenticated = useSelector((state) => state.auth.isAdminAuthenticated);
  console.log("admin : ", isAdminAuthenticated);
  if (isAdminAuthenticated) {
    return <Dashboard />;
  } else if (isAuthenticated) {
    return <Home />;
  } else {
    return <Login/>;
  }
};

const PublicRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdminAuthenticated=useSelector((state)=>state.auth.isAdminAuthenticated);
  if(isAdminAuthenticated&&element){
    return element;
  }
  if(isAdminAuthenticated){
    return <Navigate to="/dashboard"/>
  }
  if (isAuthenticated) {
    // Redirect to home or dashboard if already logged in
    return <Navigate to="/" />;
  }

  // Allow access to the public route
  return element;
};

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<PublicRoute element={<Register />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/edituser/:userId" element={<PublicRoute element={<EditUser />} />} />

          {/* Use PrivateRoute to restrict access to the Dashboard */}
          <Route path="/dashboard" element={<PrivateRoute />} />

          {/* Add a route for not-authorized page */}
          <Route path="/not-authorized" element={<NotAuthorized />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

// NotAuthorized component for displaying an unauthorized page
const NotAuthorized = () => {
  return (
    <div>
      <h1>Not Authorized</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};
