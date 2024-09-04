import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
// import Product from "./Components/Products/Products.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/Notfound/NotFound.jsx";
import CounterContextProvider from "./Context/CounterContext.js";
import UserContxtProvider, { UserContext } from "./Context/UserContext.js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
// import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts.jsx";
import Occasion from "./Components/Occasion/Occasion.jsx";
import About from "./Components/About/About.jsx";
import Contactus from "./Components/Contactus/Contactus.jsx";
import Product from "./Components/Product/Product.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Profile from "./Components/Profile/Profile.jsx";
import Address from "./Components/Address/Address.jsx";
import Payment from "./Components/Payment/Payment.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Orders from "./Components/Orders/Orders.jsx";

// paths in project------------------------------------------------------------------------------------------------------------------------------

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "/productsDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "address",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "occasion",
        element: <Occasion />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contactus",
        element: <Contactus />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// End of pathes ---------------------------------------------------------------------------------------------------------------------------------------------------

export default function App() {
  //keep the token and userid when the user refresh the page
  let { setUserToken, setUserId } = useContext(UserContext);
  useEffect(() => {
    if (
      localStorage.getItem("userToken") !== null &&
      localStorage.getItem("userId") !== null
    ) {
      setUserToken(localStorage.getItem("userToken"));
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  return (
    <UserContxtProvider>
      <CounterContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </CounterContextProvider>
    </UserContxtProvider>
  );
}
