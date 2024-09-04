import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import { Trash } from "lucide-react";
import { db } from "../../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { setCartItems } from "../../redux/cartSlice";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  const handleDelete = (id) => {
    dispatch(deleteFromCart({ id }));
    toast.success("Item removed from cart");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

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
    

  const navigate = useNavigate();

  return (
    <>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-dark-brownish sm:text-4xl">
            Your Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-pale-grayish shadow-lg lg:col-span-8  p-6"
            >
              <h2 id="cart-heading" className="sr-only">
                Cart Items
              </h2>
              <div role="list" className="divide-y divide-dark-brownish">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((product, index) => {
                      const { id, name, price, image, quantity, category } =
                        product;
                      return (
                        <div key={index} className="py-6">
                          <li className="flex sm:py-6">
                            <div className="flex-shrink-0">
                              <img
                                src={image}
                                alt={name}
                                className="h-24 w-24 sm:h-32 sm:w-32 rounded-md object-cover"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                              <div className="pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
                                <div>
                                  <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold text-dark-brownish">
                                      {name}
                                    </h3>
                                  </div>
                                  <p className="text-sm text-deep-burgundy">
                                    {category}
                                  </p>
                                  <p className="mt-2 text-lg font-medium text-dark-brownish">
                                    {price} EGP
                                  </p>
                                </div>
                                <div className="flex items-center space-x-4 sm:justify-end">
                                  <button
                                    onClick={() => handleDecrement(id)}
                                    type="button"
                                    className="h-7 w-7 bg-light-pink border border-dusty-mauve rounded-md hover:bg-dusty-mauve hover:text-white"
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    className="mx-1 h-7 w-9 rounded-md border text-center"
                                    value={quantity}
                                    readOnly
                                  />
                                  <button
                                    onClick={() => handleIncrement(id)}
                                    type="button"
                                    className="h-7 w-7 bg-light-pink border border-dusty-mauve rounded-md hover:bg-dusty-mauve hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                          <div className="flex items-center justify-between mt-4">
                            <button
                              onClick={() => handleDelete(id)}
                              type="button"
                              className="flex items-center text-deep-burgundy hover:text-dusty-mauve"
                            >
                              <Trash size={16} />
                              <span className="ml-1 text-sm font-medium">
                                Remove
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <h2 className="text-lg font-semibold text-dark-brownish">
                      Your cart is empty
                    </h2>
                    <p className="text-deep-burgundy">
                      Add items to your cart to view them here.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-pale-grayish shadow-lg lg:col-span-4 lg:mt-0 p-6"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-dark-brownish border-b border-dark-brownish pb-4"
              >
                Order Summary
              </h2>
              <div className="mt-4">
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-deep-burgundy">
                      Price ({cartItemTotal} items)
                    </dt>
                    <dd className="text-sm font-medium text-dark-brownish">
                      {cartTotal} EGP
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-deep-burgundy">
                      Delivery Charges
                    </dt>
                    <dd className="text-sm font-medium text-dark-brownish">
                      Free
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-dark-brownish pt-4">
                    <dt className="text-lg font-medium text-dark-brownish">
                      Total Amount
                    </dt>
                    <dd className="text-lg font-medium text-dark-brownish">
                      {cartTotal} EGP
                    </dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <button
                    onClick={() => navigate("/address")}
                    disabled={cartItems.length > 0 ? false : true}
                    className="w-full px-4 py-3 rounded-tr-full rounded-bl-full  disabled:bg-dusty-mauve text-white bg-deep-burgundy hover:bg-dusty-mauve transition rounded-md"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
      <Helmet>
        <title>Your Cart</title>
      </Helmet>
    </>
  );
};

export default Cart;
