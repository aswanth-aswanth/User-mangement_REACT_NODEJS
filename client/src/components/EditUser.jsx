import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";
import axios from "axios";
import { BASE_URL } from "../url";
function EditUser() {
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const ID = useParams();
  console.log(ID);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePhoto", imagePreview); // Assuming imagePreview is the base64 representation of the image
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    const adminToken = localStorage.getItem("adminToken");
    console.log("AdminToken : ", adminToken);
    axios
    .put(`${BASE_URL}/admin/users/${ID.userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: adminToken,
      },
    })
    .then((response) => {
      const userData = response.data;
      
      console.log("registration success : ", response);
      navigate("/");
    })
    .catch((error) => {
      // console.error("Registration failed", error);
      // console.log(error.response.data.message);
      alert(error.response.data.message);
    });
  };
  
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    axios
      .get(`${BASE_URL}/admin/users/${ID.userId}`, {
        headers: {
          Authorization: adminToken,
        },
      })
      .then((result) => {
        console.log("result : ", result);
        setUser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A2238]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <label htmlFor="upload" className={`inline-block bg-gray-200 rounded-full p-0  cursor-pointer`}>
              <img src={imagePreview ? imagePreview : `${BASE_URL}/uploads/${user.profile}`} alt="Preview" className="rounded-full w-32 h-32 object-cover border p-2" />
            </label>
            {console.log(user.name)}
            <input type="file" id="upload" accept="image/*" style={{ display: "none" }} required onChange={handleImageChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input type="text" id="name" className="htmlForm-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder={user.name} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input type="email" id="email" className="htmlForm-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder={user.email} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password *
            </label>
            <input type="password" id="password" className="htmlForm-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="text-gray-600 text-xs mt-1">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Register
          </button>
          <Link to="/dashboard">
            <button className="mx-auto flex mt-4 underline">go back</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
