import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { Vortex } from "react-loader-spinner";

const Profile = () => {
  // const userdata = localStorage.getItem("userdata");
  // const profileData = JSON.parse(userdata);
  // let { setUserToken,setUserId} = useContext(UserContext);
  // let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  let { setUserToken,setUserId ,userId} = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const Data = await getDoc(doc(db, "users", userId));
        const uData = Data.data();
        setUserData(uData)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserData()
  }, []);

  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setUserToken(null);
    setUserId(null)
    navigate("/login");
  }
  return (
    <ScrollToTop>
    {loading? (<div className="flex justify-center items-center h-lvh">
          <Vortex
            height={150}
            width={150}
            radius={5}
            colors={["#E8E1DA", "#F3C0C7", "#AE6B77", "#4C1B1B", "#6C5A4B", "#F3C0C7"]}
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>) :(
          <div className="container mx-auto p-6 max-w-2xl">
          <div className="bg-light-pink shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-deep-burgundy">
              Profile Information
            </h2>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Name</label>
              <p className="text-lg text-gray-900">{userData.name}</p>
            </div>
            <hr className="my-4 border-deep-burgundy" />
            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Phone Number
              </label>
              <p className="text-lg text-gray-900">{userData.phone}</p>
            </div>
            <hr className="my-4 border-deep-burgundy" />
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <p className="text-lg text-gray-900">{userData.email}</p>
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
        )}
    </ScrollToTop>
  );
};

export default Profile;
