import { Collapse, Dropdown, initTWE } from "tw-elements";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/logo.png";
import { UserContext } from "../../Context/UserContext";
import Image from "../../Assets/images/profile.jpg";
import { useSelector } from "react-redux";
import Search from "../Search/Search";

function Navbar() {
  // Log out part and logedin user data --------------------------------------------------------------------------------------------------------------------------------------------------------------

  let { userToken, userId, adminId, setUserToken, setUserId } =
    useContext(UserContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setUserToken(null);
    setUserId(null);
    navigate("./login");
  }

  // useEffect(() => {
  //   logOut();
  // }, []);

  // End of Logout part--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // Ocassion Menu DropDown code---------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const occasions = [
    "All bouquets",
    "Bridal Bouquet",
    "Mother's Day",
    "birthday",
    "Valentine's Day",
    "Graduation Day",
    "Anniversary",
    "Get well soon",
  ];

  const dropdownRef = useRef(null);
  const cartItems = useSelector((state) => state.cart);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize tw-elements
  initTWE({ Collapse, Dropdown });
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Initialize tw-elements
  initTWE({ Collapse, Dropdown });

  // End of ocassion part ------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <nav className="relative flex w-full items-center justify-between opacity-9 bg-dusty-mauve py-2 shadow-dark-mild dark:bg-deep-burgundy ">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* Hamburger button for mobile view */}
        <button
          className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-twe-collapse-init
          data-twe-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon */}
          <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* Collapsible navigation container */}
        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
          data-twe-collapse-item
        >
          {/* Logo */}
          <Link
            className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            to="#"
          >
            <img
              src={logo}
              style={{ height: "40px", borderRadius: "50%" }}
              alt="TE Logo"
              loading="lazy"
            />
          </Link>
          <Search /> 
          {/* Left navigation links */}
          {/* Check if the lging in person is the admin or not */}
          {userId === adminId && userToken !== null ? (
            <ul
              className="list-style-none me-auto  items-center flex flex-col ps-0 lg:flex-row"
              data-twe-navbar-nav-ref
            >
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                {/* Home link */}
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/"
                  data-twe-nav-link-ref
                >
                  Home
                </Link>
              </li>
              {/* Shop link */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/products"
                  data-twe-nav-link-ref
                >
                  Shop
                </Link>
              </li>
              {/* ocassion link */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <div
                  ref={dropdownRef}
                  className={`dropdown  ${
                    isOpen ? "dropdown-open dropdown-end" : "dropdown-end"
                  } text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 `}
                  onClick={toggleDropdown}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost rounded-btn font-medium text-base"
                  >
                    Occasions
                    <svg
                      class="w-2.5 h-2.5 mt-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                  {isOpen && (
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-pale-grayish w-36 rounded-box z-[1] mt-4 ml-8 p-1 shadow"
                    >
                      {occasions.map((item, index) => (
                        <li key={index}>
                          <Link
                            to="./products"
                            state={{ message: item }}
                            onClick={closeDropdown} // Close dropdown on item click
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
              {/* About us link */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/about"
                  data-twe-nav-link-ref
                >
                  About Us
                </Link>
              </li>
              {/* Contact us link */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/contactus"
                  data-twe-nav-link-ref
                >
                  Contact Us
                </Link>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/dashboard"
                  data-twe-nav-link-ref
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          ) : (
            <ul
              className="list-style-none me-auto  items-center flex flex-col ps-0 lg:flex-row"
              data-twe-navbar-nav-ref
            >
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                {/* Home link */}
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/"
                  data-twe-nav-link-ref
                >
                  Home
                </Link>
              </li>
              {/* Shop link */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/products"
                  data-twe-nav-link-ref
                >
                  Shop
                </Link>
              </li>
              {/* ocassion link */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <div
                  ref={dropdownRef}
                  className={`dropdown  ${
                    isOpen ? "dropdown-open dropdown-end" : "dropdown-end"
                  } text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 `}
                  onClick={toggleDropdown}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost rounded-btn font-medium text-base"
                  >
                    Occasions
                    <svg
                      class="w-2.5 h-2.5 mt-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                  {isOpen && (
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-pale-grayish w-36 rounded-box z-[1] mt-4 ml-8 p-1 shadow"
                    >
                      {occasions.map((item, index) => (
                        <li key={index}>
                          <Link
                            to="./products"
                            state={{ message: item }}
                            onClick={closeDropdown} // Close dropdown on item click
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
              {/* About us link */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/about"
                  data-twe-nav-link-ref
                >
                  About Us
                </Link>
              </li>
              {/* Contact us link */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  to="/contactus"
                  data-twe-nav-link-ref
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Right elements */}
        {/* Logout / Login / Register */}

        <div className="relative flex  items-center space-x-4">
          {userToken !== null ? (
            <>
              {userId !== adminId ? (
                <Link
                  className="flex items-center text-grayish-blue dark:text-light-beige"
                  to="/cart"
                  id="dropdownMenuButton1"
                  role="button"
                  data-tw-dropdown-toggle-ref
                  aria-expanded="false"
                >
                  <span
                    className="[&>svg]:w-5 text-deep-burgundy hover:text-light-pink"
                    id="cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                  </span>
                  <span
                    htmlFor="cart"
                    className="t-0 absolute left-0 mb-4 ms-4 rounded-full bg-red-600 px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-light-beige"
                  >
                    {cartItems.length}
                  </span>
                </Link>
              ) : (
                ""
              )}

              {/* Second dropdown container */}
              <div
                className="relative"
                data-twe-dropdown-ref
                data-twe-dropdown-alignment="end"
              >
                {/* Second dropdown trigger */}
                <Link
                  className="flex items-center  text-neutral-600 dark:text-white`` "
                  to="/profile"
                  id="dropdownMenuButton2"
                  role="button"
                  // data-twe-dropdown-toggle-ref
                  aria-expanded="false"
                >
                  {/* Second dropdown trigger image */}
                  <img
                    src={Image}
                    className="rounded-full"
                    style={{ height: "22px", width: "22px" }}
                    alt="Avatar"
                    loading="lazy"
                  />
                </Link>
                {/* Second dropdown menu */}
                <ul
                  className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                  aria-labelledby="dropdownMenuButton2"
                  data-twe-dropdown-menu-ref
                >
                  {/* Second dropdown menu items */}
                  {userToken !== null ? (
                    <>
                      <span
                        onClick={logOut}
                        className="cursor-pointer text-deep-burgundy hover:text-light-pink dark:text-light-beige dark:hover:text-dark-blue lg:px-2 block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                      >
                        Logout
                      </span>
                    </>
                  ) : (
                    <>
                      <Link
                        className="text-deep-burgundy hover:text-light-pink dark:text-light-beige dark:hover:text-dark-blue lg:px-2"
                        to="./login"
                      >
                        Login
                      </Link>
                      <Link
                        className="text-deep-burgundy hover:text-light-pink dark:text-light-beige dark:hover:text-dark-blue lg:px-2"
                        to="./register"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="./register">Register /</Link>
              <Link to="./login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
