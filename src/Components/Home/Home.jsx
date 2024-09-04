// Home.jsx
import React, { useEffect, useState } from "react";
import slider1 from "../../Assets/images/slider1.jpg";
import slider2 from "../../Assets/images/slider2.jpg";
import slider3 from "../../Assets/images/slider3.jpg";
import three from "../../Assets/images/three.png";
import {Helmet} from "react-helmet"; 
import { Link } from "react-router-dom";
export default function Home() {
  const slides = [slider1, slider2, slider3];
  const categories = [
    {
      image:
        "https://cdn.pixabay.com/photo/2021/12/22/02/29/motherhood-6886538_1280.jpg",
      cat: "Mother's Day",
      description:
        "you can bu for your mother fom our sore make your mother happy",
    },
    {
      image:
        "https://images.pexels.com/photos/4255484/pexels-photo-4255484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cat: "Valantin's day",
      description: "you can bu for your love fom our sore make your love happy",
    },
    {
      image:
        "https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cat: "Marriage",
      description: "you can bu for your wife fom our sore make your wife happy",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const [description, setdescription] = useState("");
  const words = ["Welcome to Bloomify Egypt..."];
  let i = 0;
  let j = 0;
  let currentWord = "";
  const type = () => {
    currentWord = words[i];
    if (words.length) {
      setdescription(currentWord.substring(0, j + 1));
      j++;
    }
    setTimeout(type, 100);
  };
  useEffect(() => {
    type();
  }, []);
  return (
    <>
      <section
        className={`bg-center bg-no-repeat bg-gray-700 bg-blend-multiply`}
      >
        <div
          style={{ backgroundImage: `url(${slides[currentIndex]})` }}
          className="w-full h-full  bg-center bg-cover bg-gray-700 bg-blend-multiply"
        >
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1
              className={`mb-4 text-4xl font-extrabold tracking-tight leading-none text-light-pink md:text-5xl lg:text-6xl`}
            >
              {description}
            </h1>
            <p
              className={`mb-8 text-lg font-normal text-light-pink lg:text-xl sm:px-16 lg:px-48 `}
            >
              your local flower shop where every bouquet is crafted with love
              and care to brighten your day and add a touch of nature's beauty
              to your life
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <Link
                to={"/products"}
                className={`inline-flex justify-center items-center rounded-bl-3xl rounded-tr-3xl py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-deep-burgundy  hover:bg-light-pink focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900`}
              >
                Shopping Now
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
              <Link
                to={"/about"}
                className={`inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 rounded-bl-3xl rounded-tr-3xl sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-dusty-mauve hover:bg-light-pink focus:ring-4 focus:ring-gray-400`}
              >
                About us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categeties */}

      <div
        className={`scrollAnimated flex justify-center flex-wrap my-10 bg-slate-400 items-center bg-dusty-mauve w-60 rounded-tr-3xl rounded-br-3xl`}
      >
        <p className="text-2xl font-semibold text-deep-burgundy dark:text-white text-center mr-4 ">
          Categeties
        </p>
        <img src={three} alt="bracket" width={60} />
      </div>

      <div className="flex flex-wrap flex-row row-span-2 justify-center">
        {categories.map((item, index) => (
          <div key={index} className="card bg-base-100 scrollAnimated ml-6 mb-3 image-full w-96 shadow-xl">
            <figure>
              <img src={item.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.cat}</h2>
              <p>{item.description}</p>
              {/* <div className="card-actions justify-end">
                <button className="rounded-tr-3xl p-2 rounded-bl-3xl  hover:bg-dusty-mauve bg-deep-burgundy ">
                  <p className="my-1 text-red-50">Go Now</p>
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Best Seller */}
      <div
        className={`scrollAnimated flex justify-center flex-wrap my-10 bg-slate-400 items-center bg-dusty-mauve w-60 rounded-tr-3xl rounded-br-3xl`}
      >
        <p className="text-2xl font-semibold text-deep-burgundy dark:text-white text-center mr-4 ">
          Best Seller
        </p>
        <img src={three} alt="bracket" width={60} />
      </div>
      <div className="flex flex-wrap row-span-2 justify-center">
        {slides.map((item, index) => (
          <div key={index}>
            <div
              className={`scrollAnimated max-w-sm ml-6 mb-3 bg-light-pink border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 `}
            >
              <Link href="#">
                <img className="rounded-t-lg" src={item} alt="" />
              </Link>
              <div className="p-5">
                <Link href="#">
                  <h5
                    className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}
                  >
                    Noteworthy technology acquisitions 2021
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center px-3 rounded-tr-3xl rounded-bl-3xl py-2 text-sm font-medium text-center text-white bg-deep-burgundy rounded-lg hover:bg-dusty-mauve focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Collection */}

      <div
        className={`scrollAnimated flex justify-center flex-wrap my-10 bg-slate-400 items-center bg-dusty-mauve w-64 rounded-tr-3xl rounded-br-3xl`}
      >
        <p className="text-2xl font-semibold text-deep-burgundy dark:text-white text-center mr-4 ">
          New Collection
        </p>
        <img src={three} alt="bracket" width={60} />
      </div>
      <div className="flex flex-wrap row-span-2 justify-center">
        {slides.map((item, index) => (
          <div key={index}>
            <div
              className={`scrollAnimated  max-w-sm ml-6 mb-3 bg-light-pink border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 `}
            >
              <Link href="#">
                <img className="rounded-t-lg" src={item} alt="" />
              </Link>
              <div className="p-5">
                <Link href="#">
                  <h5
                    className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}
                  >
                    Noteworthy technology acquisitions 2021
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center px-3 rounded-tr-3xl rounded-bl-3xl py-2 text-sm font-medium text-center text-white bg-deep-burgundy rounded-lg hover:bg-dusty-mauve focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended */}

      <div
        className={`scrollAnimated flex justify-center flex-wrap my-10 bg-slate-400 items-center bg-dusty-mauve w-64 rounded-tr-3xl rounded-br-3xl`}
      >
        <p className="text-2xl font-semibold text-deep-burgundy dark:text-white text-center mr-4 ">
          Recommended
        </p>
        <img src={three} alt="bracket" width={60} />
      </div>
      <div className="flex flex-wrap row-span-2 justify-center">
        {slides.map((item, index) => (
          <div key={index}>
            <div
              className={`scrollAnimated  max-w-sm ml-6 mb-3 bg-light-pink border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 `}
            >
              <Link href="#">
                <img className="rounded-t-lg" src={item} alt="" />
              </Link>
              <div className="p-5">
                <Link href="#">
                  <h5
                    className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}
                  >
                    Noteworthy technology acquisitions 2021
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center px-3 rounded-tr-3xl rounded-bl-3xl py-2 text-sm font-medium text-center text-white bg-deep-burgundy rounded-lg hover:bg-dusty-mauve focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Helmet>
        <title>Bloomify</title>
    </Helmet>
    </>
  );
}
