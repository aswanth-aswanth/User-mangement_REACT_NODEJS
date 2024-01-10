// Home.jsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../url";

function Home() {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Extract user ID from localStorage or wherever you store it after login
        const userId = localStorage.getItem("userId");

        // Fetch user data from the API using the user ID
        const response = await axios.get(`http://localhost:3000/user/getUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage consistently
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  // Inside your Logout button click handler
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('userId'); // Remove the user ID from localStorage
    // Other logout logic, such as navigating to the login page
    navigate('/login');
  };

  return (
    <div className="bg-violet-950 h-screen flex items-center justify-center">
      <div className="col-span-6 lg:w-[40%] text-center flex flex-col items-center mx-auto p-10 bg-white min-h-72 rounded-md shadow-md">
        {/* {userData && ( */}
          <img
            src={`${BASE_URL}/uploads/${userData.profile}`} // Replace with the actual property name for the profile image
            alt="Profile"
            className="rounded-full border w-32 h-32 mb-4 bg-slate-400"
          />
        {/* )} */}
        {userData && <h3 className="font-bold text-xl">Hey {userData.name} 👋</h3>}
        <h3 className="font-bold text-xl">Welcome to this homepage</h3>
        <p className="max-w-[90%] my-2">Let's start with a quick product tour, and we will have you up and running in no time</p>
        <button
          onClick={handleLogout}
          className="bg-violet-700 mt-4 rounded-full px-10 text-white p-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
