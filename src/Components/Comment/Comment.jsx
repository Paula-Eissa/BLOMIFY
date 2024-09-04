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

    const rating = parseFloat(ratingInput.value);

    try {
      const reviewsCollectionRef = collection(doc(db, 'products', productId), 'reviews');
      await setDoc(doc(reviewsCollectionRef), {
        rating: rating,
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
    <div className="w-full p-8 bg-pale-grayish">
      <h3 className="text-2xl font-semibold text-dark-brownish mb-6 text-center">Add Your Review</h3>
      <div className="mb-6">
        <label htmlFor="rating" className="block text-deep-burgundy font-medium mb-2">Rating</label>
        <input
          type="number"
          id="rating"
          min="0"
          max="5"
          step="0.1"
          placeholder="rate this product from 0 to 5"
          className="w-full p-3 border border-deep-burgundy rounded focus:outline-none focus:border-dusty-mauve bg-light-pink text-dark-brownish"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="comment" className="block text-deep-burgundy font-medium mb-2">Comment</label>
        <textarea
          id="comment"
          placeholder="Write your review..."
          className="w-full p-3 border border-deep-burgundy rounded focus:outline-none focus:border-dusty-mauve bg-light-pink text-dark-brownish h-32"
        />
      </div>
      <button 
        onClick={setReview}
        className="rounded-tr-full rounded-bl-full w-full bg-deep-burgundy text-white py-3 rounded hover:bg-dusty-mauve transition duration-300 ease-in-out"
      >
        Submit
      </button>
    </div>
  );
};

export default Comment;
