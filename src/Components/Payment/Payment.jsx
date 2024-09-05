import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { doc, collection, addDoc , setDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";



const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [methodType, setMethodType] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const navigate = useNavigate();

  const saveOrderToFirebase = async () => {
    if (userId && cartItems.length > 0) {
      try {
        const userRef = doc(db, "users", userId);
        const ordersRef = collection(userRef, "orders");
        await addDoc(ordersRef, {
          items: cartItems,
          paymentMethod: methodType ? "Cash on Delivery" : "Online",
          orderDate: new Date(),
        });
      } catch (error) {
        console.error("Error saving order to Firebase:", error);
      }
    }
  };

  const clearCartInFirebase = async () => {
    if (userId) {
      try {
        const cartRef = doc(db, "carts", userId);
        await setDoc(cartRef, { items: [] });
      } catch (error) {
        console.error("Error clearing cart in Firebase:", error);
      }
    }
  };

  const handlePayment = async (method) => {
    if (method === "cash") {
      setMethodType(true);
    } else {
      setMethodType(false);
    }

    setIsLoading(true);

    await saveOrderToFirebase();

    setTimeout(async() => {
      setIsLoading(false);
      setPaymentSuccess(true);
      dispatch(clearCart());
      await clearCartInFirebase();
    }, 1000);
  };


return (
  <div className="flex justify-center items-center min-h-screen bg-pale-grayish">
    <div className="bg-white border border-dark-brownish rounded-lg shadow-lg w-full max-w-md p-8">
      {!paymentSuccess ? (
        <form className="space-y-4">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-dark-brownish font-medium"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300"
            />
          </div>

          <div className="flex space-x-4">
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-dark-brownish font-medium"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="form-input mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="block text-dark-brownish font-medium"
              >
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="form-input mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
          </div>

          {!isLoading ? (
            <>
              <button
                type="button"
                onClick={() => handlePayment("online")}
                className="w-full py-3 text-white rounded-tr-full rounded-bl-full bg-deep-burgundy rounded-lg hover:bg-dusty-mauve transition"
              >
                Pay Now
              </button>
              <button
                type="button"
                onClick={() => handlePayment("cash")}
                className="w-full py-3 text-white rounded-tr-full rounded-bl-full bg-deep-burgundy rounded-lg hover:bg-dusty-mauve transition"
              >
                Cash On Delivery
              </button>
            </>
          ) : (
            <button
              type="button"
              className="w-full py-3 text-white bg-deep-burgundy rounded-lg flex justify-center items-center"
            >
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            </button>
          )}
        </form>
      ) : !methodType ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-deep-burgundy mb-4">
            Payment Successful!
          </h2>
          <p className="text-dark-brownish">
            Thank you for your purchase. Your transaction has been completed.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-deep-burgundy mb-4">
            You can pay cash on delivery
          </h2>
          <p className="text-dark-brownish">
            Thank you for your purchase.
          </p>
        </div>
      )}
    </div>
  </div>
);
};

export default Payment;