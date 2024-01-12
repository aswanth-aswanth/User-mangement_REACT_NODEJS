// Home.jsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../reducers/authSlice";
import { BASE_URL } from "../url";

function Home() {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/getUser/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="bg-violet-950 h-screen flex items-center justify-center">
      <div className="col-span-6 lg:w-[40%] text-center flex flex-col items-center mx-auto p-10 bg-white min-h-72 rounded-md shadow-md relative">
        <img src={`${BASE_URL}/uploads/${userData.profile}`} alt="Profile" className="rounded-full border w-32 h-32 mb-4 bg-slate-400" />
        {userData && <h3 className="font-bold text-xl">Hey {userData.name} 👋</h3>}
        <h3 className="font-bold text-xl">Welcome to this homepage</h3>
        <p className="max-w-[90%] my-2">Let's start with a quick product tour, and we will have you up and running in no time</p>
        <button onClick={handleLogout} className="bg-violet-700 mt-4 rounded-full px-10 text-white p-2">
          Logout
        </button>
        <Link to={`/edituserhome/${userId}`}>
          <button className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 rounded-full px-3 py-1 text-white">Edit</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
