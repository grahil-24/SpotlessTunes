import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/review.css";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import {Box, Button, Card, ChakraProvider, Flex, Text} from "@chakra-ui/react";

function Review() {
  const name = localStorage.getItem("user");
  const [userReview, setUserReview] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [edit, setEdit] = useState(false);
  const [reviewEdited, setReviewEdited] = useState(false);

  useEffect(() => {
    const getReviews = async() => {
      try{
        const response= await axios.post("https://spotless-tunes.onrender.com/user/get-reviews", {name});
        const {userReviews, otherReviews} = response.data;
        const review = userReviews;
        console.log(review);
        console.log(otherReviews);
        if(review === null || review === undefined){
          setUserReview(null);
        }else{
          setUserReview(review);
        }
        setReviews(otherReviews);
      }catch(err){
        console.log(err);
      }
    }
    if(name){
      getReviews();
    }

  }, [name, reviewEdited]);

  const reviewFormComponent = () => {
    return (
        <div className="review-container">
          <h2>Write a Review</h2>
          <form className="review-form" onSubmit={handleSubmit}>
            <label>
              Your Review:
              <textarea
                  className="review-textarea"
                  value={reviewText}
                  onChange={handleReviewTextChange}
                  rows={4}
                  cols={50}
              />
            </label>
            <br/>
            <label>
              Your Rating:
              <Rating className="my-rating-class" value={rating} onChange={setRating} halfFillMode={'box'}/>
            </label>
            <br/>
            <button className="submit-button" type="submit">
              Submit
            </button>
            {edit && <Button onClick={() => {setEdit(false)}}>Cancel</Button>}
          </form>
        </div>
    );
  }

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleEdit = () => {
    setEdit(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic to submit the review and rating

    if(!edit){
      await axios.post("https://spotless-tunes.onrender.com/user/add-review", {
        review: reviewText,
        rating: rating,
        name: name,
      });
    }else{
      await axios.post("https://spotless-tunes.onrender.com/user/edit-review", {
        review: reviewText,
        rating: rating,
        reviewId: userReview[0]._id,
      });
      setReviewEdited(true);
      setEdit(false);
    }

    window.location.reload();
    console.log("Submitting review:", reviewText);
    console.log("Rating:", rating);
    // Optionally, you can call a function to submit the review to your backend
  };

  return (
      <ChakraProvider resetCSS={false}>
        <Box marginTop={"10%"}>
        <Box className={"review-parent"} width={"30%"} marginLeft={"auto"} marginRight={"auto"} marginTop={"20px"}>
          {userReview === null || edit ? reviewFormComponent():(
              <Card key={userReview[0]._id} className={"review-card"} padding={"3"} backgroundColor={"rgba(0, 0, 0, 0.3)"}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Text as  = 'b' className={"user"}>{name}</Text>
                  <Rating className="my-rating-class" value={userReview[0].rating} readOnly halfFillMode={'box'}/>
                </Flex>
                <p className={"review"}>{userReview[0].review}</p>
                <Button width={"30%"} onClick={handleEdit}>Edit</Button>
              </Card>)}
        </Box>
        <Box marginLeft={"auto"} marginRight={"auto"} width={"90%"} className={"other-reviews"} marginTop={"10%"}>
          <h3>Other Reviews: </h3>
          <Flex flexDirection={"row"}>
            {reviews !== null && reviews.map((review) => (
                <Card key={review._id} className={"review-card"} marginRight={"50px"} padding={"3"} minW={"270px"} backgroundColor={"rgba(0, 0, 0, 1.0)"}>
                  <Flex alignItems={"center"} justifyContent={"space-between"} >
                    <Text  as  = 'b' className={"user"}>{review._id}</Text>
                    <Rating className="my-rating-class" value={review.reviews[0].rating} readOnly halfFillMode={'box'}/>
                  </Flex>
                  <p className={"review"}>{review.reviews[0].review}</p>
                </Card>
            ))}
          </Flex>
        </Box>
        </Box>
      </ChakraProvider>
  );
}

export default Review;
