import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { UserContext } from '../../Context/UserContext';

const Comment = ({ productId }) => {
  let { userId } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const Data = await getDoc(doc(db, "users", userId));
        const uData = Data.data();
        setUserData(uData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [userId]);

  async function setReview() {
    const ratingInput = document.querySelector('input[type="number"]');
    const comment = document.querySelector('textarea');

    if (!ratingInput || !comment.value) {
      console.log("Rating and comment are required.");
      return;
    }

    const rating = parseFloat(ratingInput.value); // Convert to number

    try {
      const reviewsCollectionRef = collection(doc(db, 'products', productId), 'reviews');
      await setDoc(doc(reviewsCollectionRef), {
        rating: rating, // Now rating is a number
        comment: comment.value,
        userName: userData.name,
        userId: userId,
      });
    } catch (error) {
      console.log(error);
    }

    clearInput();
  }

  function clearInput() {
    const ratingInput = document.querySelector('input[type="number"]');
    const comment = document.querySelector('textarea');
    if (ratingInput) ratingInput.value = "";
    if (comment) comment.value = "";
  }

  return (
    <div className="comment-form">
      <input type="number" min='0' max='5' step='0.1' placeholder="Enter your rating" />
      <textarea
        placeholder="Write your review..."
        style={{
          width: "100%",
          height: "80px",
          marginBottom: "10px",
        }}
      />
      <button 
        onClick={setReview} 
        style={{
          padding: "10px 20px",
          backgroundColor: " #4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}>Submit</button>
    </div>
  );
};

export default Comment;
