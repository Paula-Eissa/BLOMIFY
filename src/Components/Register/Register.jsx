import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.js";
import registerImg from "../../Assets/images/register.png";
import Loader from "../Loader/Loader.jsx";
import FailTost from "../Toasters/FailTost.jsx";
import { Helmet } from "react-helmet";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  let navigate = useNavigate();

  // registeration userData part -----------------------------------------------------------------------------------------------------------------------------

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass,setShowPass]=useState(false);
  setTimeout(() => {
    if (error) {
      setError(null);
    }
  }, 4000);
  async function registerSubmit(values) {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // add register user data in firebase collection users
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });
      

      const user = userCredential.user;
      localStorage.setItem("userToken", user.accessToken); // Or any token mechanism you use
      navigate("/login");
    } catch (error) {
      setError(error.message); // Display Firebase error message
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
    console.log(values);
    // localStorage.setItem("userdata", JSON.stringify(values));
  }

  // End of registeration userData part -----------------------------------------------------------------------------------------------------------------------------

  // using yup & formik part to validate login data and forms ----------------------------------------------------------------------------------------------------------------------

  let phoneRegExp = /^(010|011|012|015)\d{8}$/;
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name minLength is 3")
      .max(30, "Name maxLength is 30")
      .required("Name is required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must be at least 6 characters long and include both letters and numbers"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords is incorrect")
      .required("Confirm Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  // End part of formik and yup--------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="font-[sans-serif]">
        <div className="flex flex-col items-center justify-center pt-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="lg:h-[700px] md:h-[300px] max-md:mt-8 flex justify-center">
              <img
                src={registerImg} // Change this to your registration image
                className="w-full h-full object-contain"
                alt="Register"
              />
            </div>

            <div className="border border-gray-300 rounded-lg p-6 max-w-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-deep-burgundy text-3xl font-extrabold mb-5">
                    Register Now
                  </h3>
                  {error ? (
                    <>
                      <FailTost message={error} />
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div>
                  <label className="text-deep-burgundy text-sm mb-2 block">
                    Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-deep-burgundy"
                      placeholder="Enter your name"
                    />
                  </div>
                  {formik.errors.name && formik.touched.name ? (
                    <div className="text-red-600 mb-4">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-deep-burgundy text-sm mb-2 block">
                    Phone
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-deep-burgundy"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="text-red-600 mb-4">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-deep-burgundy text-sm mb-2 block">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="email"
                      type="text"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-deep-burgundy"
                      placeholder="Enter your email"
                    />
                  </div>
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-red-600 mb-4">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-deep-burgundy text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-deep-burgundy"
                      placeholder="Enter password"
                    />
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <div className="text-red-600 mb-4">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-deep-burgundy text-sm mb-2 block">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="rePassword"
                      type="password"
                      name="rePassword"
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-deep-burgundy"
                      placeholder="Confirm password"
                    />
                  </div>
                  {formik.errors.rePassword && formik.touched.rePassword ? (
                    <div className="text-red-600 mb-4">
                      {formik.errors.rePassword}
                    </div>
                  ) : null}
                </div>

                <div className="!mt-8">
                  {isLoading ? (
                    <div className="grid justify-items-stretch ">
                      <button
                        type="button"
                        className="w-1/3 justify-self-center flex justify-center items-center shadow-xl py-3 text-sm tracking-wide rounded-tr-full rounded-bl-full bg-deep-burgundy text-white hover:bg-dusty-mauve focus:outline-none"
                      >
                        <Loader width={22} height={22} />
                      </button>
                    </div>
                  ) : (
                    <div className="grid justify-items-stretch ">
                      <button
                        type="submit"
                        className="w-1/3 justify-self-center shadow-xl py-3 text-sm tracking-wide rounded-tr-full rounded-bl-full bg-deep-burgundy text-white hover:bg-dusty-mauve focus:outline-none"
                        disabled={!(formik.isValid && formik.dirty)}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-sm !mt-8 text-center text-gray-800">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-deep-burgundy font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Log in here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Helmet>
        <title>Register </title>
      </Helmet>
    </>
  );
}
