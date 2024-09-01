import React, { useContext } from "react";
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
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-light-pink shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-deep-burgundy">
          Profile Information
        </h2>
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
        <div className="flex justify-between">
          <button className="bg-deep-burgundy hover:bg-dusty-mauve text-white font-bold py-2 px-4 rounded">
            Order Summary
          </button>
          <button
            onClick={() => logOut()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
