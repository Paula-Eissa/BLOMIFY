import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import three from "../../Assets/images/three.png";
import { Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import slider1 from "../../Assets/images/Bridal Bouquet.jpeg";
import slider2 from "../../Assets/images/Comcon-Mums-Day-1-shutterstock_1304896138-1dj7umb2e.jpg";
import slider3 from "../../Assets/images/birthday-cake-for-milestone-birthday-celebration.webp";
import slider4 from "../../Assets/images/graduation.jpg"
import slider6 from "../../Assets/images/images.jfif";
import slider7 from "../../Assets/images/341607-1600x1066-birthday-party-names-1001540940.jpg";
import slider5 from "../../Assets/images/slider2.jpg";


export default function Occasion() {
  const location = useLocation();
  const message = location.state?.message || "Not Available";
  const slides = [slider1, slider2, slider3,slider4,slider5,slider6,slider7];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextImg,setnextImg]=useState(1)
  const [nextImg2,setnextImg2]=useState(2)

 

  const [products, setProducts] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchData = async () => {
      SetLoading(true);
      const querySnapShot = await getDocs(collection(db, "products"));
      const dataQuery = querySnapShot.docs.map((element) => ({
        id: element.id,
        ...element.data()
      }));
      SetLoading(false);
      setProducts(dataQuery);
      message==="All bouquets"||message==="Not Available"?
      setData(dataQuery.slice(0,36)): setData(products)
    };
    fetchData();
  }, [message]);

  // console.log(products.length)


  function ToDetails(id) {
    navigate(`/productsDetails/${id}`);
    
  }

  useEffect(() => {
   
  }, []);
  
  function moreData(){
    setData(data.concat(products.slice(data.length,data.length+20)))
    console.log(data.length)
  }

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

          
          <div className="flex flex-wrap items-cente justify-center ">  


           


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 mt-12 mx-16 pt-2">
             

              {data.map((product, index) => (
                product.category===message||message==="All bouquets"||message==="Not Available"?
                <div
                  onClick={() => {
                    ToDetails(product.id);
                  }}
                  style={{ backgroundColor: "#F3C0C7" }}
                  key={product.id}
                  className={`max-w-sm bg-dusty-mauve rounded-3xl overflow-hidden shadow-lg scrollAnimated pb-4`}
                >
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

                    <div className="grid justify-items-stretch ">
                      <button
                        onClick={() => {
                          ToDetails();
                        }}
                        // style={{ backgroundColor: "#4C1B1B", color: "#E8E1DA" }}
                        className="rounded-tr-full rounded-bl-full w-2/3 justify-self-center  hover:bg-dusty-mauve bg-deep-burgundy "
                      >
                        <p className="my-1 text-red-50">Buy</p>
                      </button>
                    </div>
                  </div>
                </div>
                :
                null
              ))}
              
            </div>
            <button
                        onClick={() => {
                          moreData();
                        }}
                        // style={{ backgroundColor: "#4C1B1B", color: "#E8E1DA" }}
                        className="rounded-tr-full rounded-bl-full px-10 mt-8 justify-self-center  hover:bg-dusty-mauve bg-deep-burgundy "
                      >
                        <p className="my-1 text-red-50">See More</p>
                      </button>
          </div>
        </>
      )}
    </>
    
  );
}
