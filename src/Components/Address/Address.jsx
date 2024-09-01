import React, { useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../Loader/Loader";

const Address = () => {
  const [isLoading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const phoneRegex = /^((\+20|0)?1[0125]\d{8})|((\+20|0)?2\d{7,8})$/;

  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .matches(phoneRegex, "Invalid phone number")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
  });

  const UserCartId = localStorage.getItem("UserCartID");
  console.log(UserCartId);

  const handleGoToOnlinePayment = async (values) => {
    setLoading(true);
    // Implement your payment logic here
    // Example:
    // let { data } = await Payment(UserCartId, "http://localhost:3000", values);
    // window.location.href = data?.session.url;
    setLoading(false);
    console.log(values);
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-pale-grayish">
      <div className="bg-light-pink border border-deep-burgundy rounded-lg shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-dark-brownish text-center mb-6">
          Checkout Details
        </h1>

        <Formik
          validationSchema={validationSchema}
          initialValues={{
            details: "",
            phone: "",
            city: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            setUserDetails(values);
            handleGoToOnlinePayment(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Details Field */}
              <label
                htmlFor="details"
                className="text-dark-brownish font-medium mb-1"
              >
                Enter Your Details
              </label>
              <input
                className={`form-control p-2 border ${
                  errors.details && touched.details
                    ? "border-deep-burgundy"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-deep-burgundy`}
                id="details"
                type="text"
                name="details"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.details}
                placeholder="e.g., John Doe"
              />
              {errors.details && touched.details && (
                <p className="text-deep-burgundy text-sm mt-1">
                  {errors.details}
                </p>
              )}

              {/* City Field */}
              <label
                htmlFor="city"
                className="text-dark-brownish font-medium mt-4 mb-1"
              >
                Enter City
              </label>
              <input
                className={`form-control p-2 border ${
                  errors.city && touched.city
                    ? "border-deep-burgundy"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-deep-burgundy`}
                id="city"
                type="text"
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                placeholder="e.g., Cairo"
              />
              {errors.city && touched.city && (
                <p className="text-deep-burgundy text-sm mt-1">{errors.city}</p>
              )}

              {/* Phone Field */}
              <label
                htmlFor="phone"
                className="text-dark-brownish font-medium mt-4 mb-1"
              >
                Enter Phone
              </label>
              <input
                className={`form-control p-2 border ${
                  errors.phone && touched.phone
                    ? "border-deep-burgundy"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-deep-burgundy`}
                id="phone"
                type="tel"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="e.g., +201234567890"
              />
              {errors.phone && touched.phone && (
                <p className="text-deep-burgundy text-sm mt-1">
                  {errors.phone}
                </p>
              )}

              {/* Submit Button */}
              {!isLoading ? (
                <button
                  onClick={() => navigate("/payment")}
                  type="submit"
                  className={`mt-6 py-2 px-4 bg-deep-burgundy rounded-tr-full rounded-bl-full text-white font-semibold rounded-md hover:bg-dusty-mauve transition-colors disabled:bg-dusty-mauve`}
                  disabled={isSubmitting || !(isValid && dirty)}
                >
                  Checkout
                </button>
              ) : (
                <button
                  type="button"
                  className="mt-6 py-2 px-4 bg-deep-burgundy text-white font-semibold rounded-md flex justify-center items-center"
                  disabled
                >
                  <Loader width={22} height={22} />
                </button>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Address;
