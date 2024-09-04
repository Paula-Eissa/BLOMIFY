import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { Vortex } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Profile = () => {
  // const userdata = localStorage.getItem("userdata");
  // const profileData = JSON.parse(userdata);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  let { setUserToken, setUserId, userId } = useContext(UserContext);
  // const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems)
  let navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const Data = await getDoc(doc(db, "users", userId));
        const uData = Data.data();
        setUserData(uData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  // console.log(userData)
  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    // localStorage.removeItem("cart");
    setUserToken(null);
    setUserId(null);
    navigate("/login");
  }

  useEffect(() => {
    setPreview(localStorage.getItem("profilePhoto"));
  }, []);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const SavePhoto = () => {
    if (userId) {
      const SaveImage = async () => {
        try {
          const ImageREf = doc(db, "users", userId);
          await setDoc(ImageREf, { image: preview });
        } catch (error) {
          console.error("Error saving cart to Firebase:", error);
        }
      };

      SaveImage();
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        SavePhoto();
        // localStorage.setItem("profilePhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ScrollToTop>
      {loading ? (
        <div className="flex justify-center items-center h-lvh">
          <Vortex
            height={150}
            width={150}
            radius={5}
            colors={[
              "#E8E1DA",
              "#F3C0C7",
              "#AE6B77",
              "#4C1B1B",
              "#6C5A4B",
              "#F3C0C7",
            ]}
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="container mx-auto p-6 max-w-2xl">
          <div className="bg-light-pink shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-deep-burgundy">
              Profile Information
            </h2>
            {/* profile photo */}
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
            ;{/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Name</label>
              <p className="text-lg text-gray-900">{userData?.name}</p>
            </div>
            <hr className="my-4 border-deep-burgundy" />
            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Phone Number
              </label>
              <p className="text-lg text-gray-900">{userData?.phone}</p>
            </div>
            <hr className="my-4 border-deep-burgundy" />
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <p className="text-lg text-gray-900">{userData?.email}</p>
            </div>
            <hr className="my-4 border-deep-burgundy" />
            {/* Buttons */}
            <div className="flex justify-between">
              <button
              onClick={()=>navigate('/orders')}
               className="bg-deep-burgundy hover:bg-dusty-mauve text-white font-bold py-2 px-4 rounded">
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
