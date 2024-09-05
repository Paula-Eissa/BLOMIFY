import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.js"; // Import the auth instance from your Firebase configuration
import loginImg from "../../Assets/images/login.png";
import Loader from "../Loader/Loader.jsx";
import FailTost from "../Toasters/FailTost.jsx";
import {Helmet} from "react-helmet";


export default function Login() {

// Login userData part -----------------------------------------------------------------------------------------------------------------------------
 
  let { setUserToken, setUserId ,adminId}  = useContext(UserContext);
  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass,setShowPass]=useState(false)
  setTimeout(() => {
    if (error) {
      setError(null);
    }
  }, 4000);
  console.log(error)

  async function loginSubmit(values) {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);

      // Store token and navigate (adjust as needed for your use case)
      const token = await user.getIdToken();
      const thisId = await user.uid; 
      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", thisId);
      setUserToken(token);
      setUserId(thisId)
      if(user.uid === adminId){
        navigate("/dashboard")
      }else{
        navigate("/");
      }
    } catch (error) {
      setError(error.message); // Display Firebase error message
      console.error("Error logging in user:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

// End of login userData part ----------------------------------------------------------------------------------------------------------------------------

// using yup & formik part to validate login data and forms ----------------------------------------------------------------------------------------------------------------------
  
  let validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password is incorrect"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

// End part of formik and yup--------------------------------------------------------------------------------------------------------------------------------------


  return (
    <>
    <div className="font-[sans-serif]">
      <div className="flex flex-col items-center justify-center pt-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="lg:h-[600px] md:h-[300px] max-md:mt-4 flex justify-center">
            <img
              src={loginImg}
              className="w-full h-full object-cotain"
              alt="Login"
            />
          </div>

          <div className="border border-gray-300 rounded-lg p-6 max-w-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="mb-6">
                <h3 className="text-deep-burgundy text-3xl font-extrabold mb-5">
                  Sign in
                </h3>
                {error ? <FailTost message={error} /> : ""}
              </div>

              <div>
                <label className="text-deep-burgundy text-sm mb-2 block">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-deep-burgundy"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                {formik.errors.email && formik.touched.email ? (
                  <div className="text-red-600 mb-4">{formik.errors.email}</div>
                ) : null}
              </div>

              <div>
                <label className="text-deep-burgundy text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                  
                  
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-deep-burgundy"
                    placeholder="Enter password"
                  />
                  <div onClick={()=>{setShowPass(!showPass)}}>
                  <svg
                  
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  {showPass?
                    <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                
                :
                <>
                 <path
                     d="M64 24C22.127 24 1.367 60.504.504 62.057a4 4 0 0 0 0 3.887C1.367 67.496 22.127 104 64 104s62.633-36.504 63.496-38.057a4 4 0 0 0 0-3.887C126.633 60.504 105.873 24 64 24zM64 96c-31.955 0-50.553-24.775-55.293-31.994C13.447 56.775 32.045 32 64 32c31.955 0 50.553 24.775 55.293 31.994C114.535 71.205 95.854 96 64 96z"
                 ></path>
                <path
                     d="M85.463 85.463l-42.926-42.926-5.657 5.657 42.926 42.926 5.657-5.657z"
                ></path>
                </>
                }
                </svg>
                  </div>
                  
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-red-600 mb-4">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="!mt-8">
                {isLoading ? (
                  <div className="grid justify-items-stretch ">
                    <button
                      type="button"
                      className="w-1/3 justify-self-center flex items-center justify-center shadow-xl py-3 px-4 text-sm tracking-wide rounded-tr-full rounded-bl-full bg-deep-burgundy text-white hover:bg-dusty-mauve focus:outline-none"
                    >
                      <Loader width={22} height={22} />
                    </button>
                  </div>
                ) : (
                  <div className="grid justify-items-stretch ">
                    <button
                      type="submit"
                      className="w-1/3 justify-self-center shadow-xl py-3 px-4 text-sm tracking-wide rounded-tr-full rounded-bl-full bg-deep-burgundy text-white hover:bg-dusty-mauve focus:outline-none"
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      Log in
                    </button>
                  </div>
                )}
              </div>

              <p className="text-sm !mt-8 text-center text-gray-800">
                Don't have an account{" "}
                <Link
                  to="/register"
                  className="text-deep-burgundy font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Helmet>
    <title>Login</title>
</Helmet>
    </>
  );
}
