import { useDispatch } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon
import { logoutAdmin } from "../reducers/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    // Check if adminToken is present before making the request
    if (adminToken) {
      axios
        .get(`${BASE_URL}/admin/users`, {
          headers: {
            Authorization: adminToken,
          },
        })
        .then((results) => {
          setUsers(results.data);
        })
        .catch((error) => {
          // Handle errors, e.g., unauthorized access
          console.error("Error fetching user data:", error.response.data);
        });
    } else {
      // Handle case where adminToken is missing
      console.error("Admin token not found.");
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
    // localStorage.removeItem('userId'); // Remove the user ID from localStorage
    // Other logout logic, such as navigating to the login page
    navigate("/login");
  };

  const handleDelete = (userId) => {
    if (confirm("Are you sure ?")) {
      axios.delete(`${BASE_URL}/admin/users/${userId}`).then((result) => {
        console.log("then");
        console.log(result);
      });
    }
  };

  return (
    <div className="bg-white h-screen ">
      <div className="bg-emerald-500 flex items-center justify-center h-20">
        <h1 className="text-white text-xl font-bold">Welcome 🎉🎉🎉</h1>
        <button onClick={handleLogout} className="ml-4 bg-transparent flex items-center hover:bg-gray-200 text-white hover:text-gray-900 font-bold py-2 px-4 rounded-full">
          <FaSignOutAlt className="w-4 h-4" /> Logout
        </button>
      </div>
      <div className="relative pb-40">
        <div className="flex items-center absolute -top-12 left-40 ">
          <p className="mr-4">Search: </p>
          <input className="p-2 outline outline-2 rounded-md outline-gray-200 focus:outline-gray-400" type="text" placeholder="search..." />
        </div>
        <div className="flex text-gray-300 gap-2 absolute right-40 -top-12">
          <FaChevronLeft className="border p-2 cursor-pointer w-12 h-8" />
          <FaChevronRight className="border p-2 cursor-pointer w-12 h-8" />
        </div>
        <table className="bg-white shadow-xl w-[80%] mt-20 text-gray-600 mx-auto overflow-hidden  rounded-lg">
          <thead className="bg-slate-100">
            <tr>
              <td className="border-b-2 p-4 pl-10 text-start">Profile</td>
              <td className="border-b-2 p-4 text-start">Name</td>
              <td className="border-b-2 p-4 text-start">Email</td>
              <td className="border-b-2 p-4 text-start">Created at</td>
              <td className="border-b-2 p-4 text-start">Edit</td>
              <td className="border-b-2 p-4 text-start">Delete</td>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => {
              return (
                <tr key={item._id} className="hover:bg-gray-200 hover:text-gray-950">
                  <td className="border-b-2 p-4 pl-10">
                    <div className="w-16 h-16 rounded-full border">
                      <img src={`${BASE_URL}/uploads/${item.profile}`} alt="image" />
                    </div>
                  </td>
                  <td className="border-b-2 p-4">{item.name}</td>
                  <td className="border-b-2 p-4">{item.email}</td>
                  <td className="border-b-2 p-4">{item.createdAt}</td>
                  <td className="border-b-2 p-4">
                    <Link to={`/editUser/${item._id}`}>
                      <MdEdit />
                    </Link>
                  </td>
                  <td onClick={() => handleDelete(item._id)} className="border-b-2 p-4">
                    <MdDeleteForever />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
