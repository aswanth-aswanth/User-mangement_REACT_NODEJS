import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";
import axios from "axios";
import { BASE_URL } from "../url";
function Register() {
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
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

    axios
      .post(`${BASE_URL}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const userData = response.data;
        dispatch(setUser(userData));
        console.log("registration success : ",response);
        navigate("/login");
      })
      .catch((error) => {
        // console.error("Registration failed", error);
        // console.log(error.response.data.message);
        alert(error.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A2238]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <label htmlFor="upload" className={`inline-block bg-gray-200 rounded-full ${imagePreview ? "p-0" : "p-10"} cursor-pointer`}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="rounded-full w-32 h-32 object-cover border p-2" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" />
                </svg>
              )}
            </label>
            <input type="file" id="upload" accept="image/*" style={{ display: "none" }} required onChange={handleImageChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input type="text" id="name" className="htmlForm-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="James Brown" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input type="email" id="email" className="htmlForm-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="hello@alignui.com" value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <Link to="/login">
            <button className="mx-auto flex mt-4 underline">go back to login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
