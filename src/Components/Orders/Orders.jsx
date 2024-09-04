import { collection, doc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { UserContext } from "../../Context/UserContext";
import { Trash } from "lucide-react";

const OrderItem = ({ item }) => (
  <li className="flex sm:py-6">
    <div className="flex-shrink-0">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 sm:h-32 sm:w-32 rounded-md object-cover"
      />
    </div>
    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
      <div className="pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
        <div>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-dark-brownish">
              {item.name}
            </h3>
          </div>
          <p className="text-sm text-deep-burgundy">{item.category}</p>
          <p className="mt-2 text-lg font-medium text-dark-brownish">
            {item.price} EGP
          </p>
        </div>
      </div>
    </div>
  </li>
);

const Orders = () => {
  const { userId } = useContext(UserContext);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(doc(db, "users", userId), "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const orders = ordersSnapshot.docs.map((doc) => doc.data());
      setOrdersData(orders);
    } catch (error) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <section
        aria-labelledby="orders-heading"
        className="rounded-lg bg-pale-grayish shadow-lg lg:col-span-8 p-6"
      >
        <h2 id="orders-heading" className="sr-only">
          Orders
        </h2>
        <div role="list" className="divide-y divide-dark-brownish">
          {ordersData.length > 0 ? (
            ordersData.flatMap((order) =>
              order.items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))
            )
          ) : (
            <div className="text-center py-6">
              <h2 className="text-lg font-semibold text-dark-brownish">
                No Orders Found
              </h2>
              <p className="text-deep-burgundy">
                Add items to your cart to view them here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders;
