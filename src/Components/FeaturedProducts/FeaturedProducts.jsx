import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import three from "../../Assets/images/three.png";
import { Vortex } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import slider1 from "../../Assets/images/Bridal Bouquet.jpeg";
import slider2 from "../../Assets/images/Comcon-Mums-Day-1-shutterstock_1304896138-1dj7umb2e.jpg";
import slider3 from "../../Assets/images/birthday-cake-for-milestone-birthday-celebration.webp";
import slider4 from "../../Assets/images/graduation.jpg"
import slider6 from "../../Assets/images/images.jfif";
import slider7 from "../../Assets/images/341607-1600x1066-birthday-party-names-1001540940.jpg";
import slider5 from "../../Assets/images/slider2.jpg";
import { useDispatch , useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { setCartItems } from "../../redux/cartSlice";
import Filter from "../Filter/Filter";

export default function Occasion() {
  const location = useLocation();
  const message = location.state?.message || "Not Available";
  const slides = [slider1, slider2, slider3,slider4,slider5,slider6,slider7];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextImg,setnextImg]=useState(1)
  const [nextImg2,setnextImg2]=useState(2)

  const occasions=[
    
  ]

  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();
 
// get all data from firebase part--------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      SetLoading(true);
      const querySnapShot = await getDocs(collection(db, "products"));
      const dataQuery = querySnapShot.docs.map((element) => ({
        id: element.id,
        ...element.data()
      }));
      SetLoading(false);
      setProducts(dataQuery)
      setFilteredProduct(dataQuery);
    };
    fetchData();
  }, []);

// End get all data part--------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setnextImg((prevIndex2) => (prevIndex2 + 1) % slides.length)
      setnextImg2((prevIndex3) => (prevIndex3 + 1) % slides.length)
    }, 4000);
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

// Cart part on shop page-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  const cartItems = useSelector((state)=> state.cart);
  // console.log(cartItems);
  
  const dispatch = useDispatch();

  const addCart = (item) => {
    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      dispatch(addToCart(item));
      toast.success(`${item.name} added to cart`);
    }
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (userId) {
      const saveCartToFirebase = async () => {
        try {
          const cartRef = doc(db, "carts", userId);
          await setDoc(cartRef, { items: cartItems });
        } catch (error) {
          console.error("Error saving cart to Firebase:", error);
        }
      };
  
      const delulu = setTimeout(() => saveCartToFirebase(), 1000);
      return () => clearTimeout(delulu);
    }
  }, [cartItems, userId]);
  
  useEffect(() => {
    if (userId) {
      const loadCartFromFirebase = async () => {
        try {
          const cartRef = doc(db, "carts", userId);
          const cartDoc = await getDoc(cartRef);
          if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            dispatch(setCartItems(cartData.items || []));
          }
        } catch (error) {
          console.error("Error loading cart from Firebase:", error);
        }
      };
  
      loadCartFromFirebase();
    }
  }, [dispatch, userId]);
  

  useEffect(() => {
    const delulu = setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, 1000); 
  
    return () => clearTimeout(delulu);
  }, [cartItems]);
  

// End Cart-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Filteration part on products --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const handleFilterarton = (filteredData) => {
    setFilteredProduct(filteredData); 
  };
// End Filteration part --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    return (
      <>
        {loading ? (
          <div className="flex justify-center items-center  h-lvh">
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
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            <Filter data={products} filteration={handleFilterarton} />        
            <div className="flex flex-wrap items-cente justify-center ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 mt-12 mx-16 pt-2">
                {filteredProduct.map((product, index) => (
                  product.category===message||message==="All bouquets"||message==="Not Available"?
                  <div
                    style={{ backgroundColor: "#F3C0C7" }}
                    key={product.id}
                    className={`max-w-sm bg-dusty-mauve rounded-3xl overflow-hidden shadow-lg scrollAnimated pb-4`}
                  >
                  <Link to={`/productsDetails/${product.id}`} >
                    <img
                      className="w-full h-48 object-fill"
                      src={product.image}
                      alt={product.description}
                    />
  
                    <div className="flex flex-col m-2 px-4 mb-2 text-center">
                      <h2 className="text-lg font-semibold mt-2">
                        {product.name.slice(0, 18)}
                        {product.name.length < 18 ? null : "...."}
                      </h2>
                      <div className="flex justify-between items-center mb-3 ">
                        <span className="text-gray-700 font-mono">
                          {product.price} EGP
                        </span>
                      </div>
                    </div>
                    </Link>
                    <div className="grid justify-items-stretch ">
                        <button
                          onClick={() => 
                            addCart(product)}
                          // style={{ backgroundColor: "#4C1B1B", color: "#E8E1DA" }}
                          className="rounded-tr-full rounded-bl-full w-2/3 justify-self-center  hover:bg-dusty-mauve bg-deep-burgundy "
                        >
                          <p className="my-1 text-red-50">
                          {cartItems.some((cartItem) => cartItem.id === product.id)
                            ? "Added to Cart"
                            : "Add to Cart"}
                        </p>
                        </button>
                      </div>
                  </div>
                  :
                  null
                ))}
              </div>
            </div>
          </>
        )}
      </>
  
    
  );
}
