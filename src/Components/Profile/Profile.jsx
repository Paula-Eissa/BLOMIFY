import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userdata = localStorage.getItem("userdata");
  const profileData = JSON.parse(userdata);
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  // Upload profile photo
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        localStorage.setItem("profilePhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setPreview(localStorage.getItem("profilePhoto"));
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-light-pink shadow-lg rounded-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-deep-burgundy">
          Profile Information
        </h2>
        {/* Profile photo */}
        <div className="container mx-auto p-6 max-w-md">
          <form>
            <div className="mb-6 text-center">
              <div className="inline-block">
                <label htmlFor="fileInput" className="cursor-pointer">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="rounded-full w-32 h-32 object-cover border-4 border-deep-burgundy transform transition-all duration-500 hover:rotate-6 hover:scale-110"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-2 border-dashed border-deep-burgundy transform transition-all duration-500 hover:rotate-6 hover:scale-110">
                      <span className="text-gray-400">Click to Upload</span>
                    </div>
                  )}
                </label>
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </form>
        </div>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name</label>
          <p className="text-lg text-gray-900">{profileData.name}</p>
        </div>
        <hr className="my-4 border-deep-burgundy" />
        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Phone Number
          </label>
          <p className="text-lg text-gray-900">{profileData.phone}</p>
        </div>
        <hr className="my-4 border-deep-burgundy" />
        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <p className="text-lg text-gray-900">{profileData.email}</p>
        </div>
        <hr className="my-4 border-deep-burgundy" />

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-deep-burgundy hover:bg-dusty-mauve text-white font-bold py-2 px-4 rounded transform transition-transform duration-300 hover:scale-105">
            Order Summary
          </button>
          <button
            onClick={() => logOut()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transform transition-transform duration-300 hover:scale-105"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
