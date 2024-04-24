import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import {
  Box,
  Button,
  Card,
  ChakraProvider,
  Flex,
  Text,
} from "@chakra-ui/react";

function Review() {
  const name = localStorage.getItem("user");
  const [userReview, setUserReview] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [edit, setEdit] = useState(false);
  const [reviewEdited, setReviewEdited] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.post(
          "https://spotless-tunes.onrender.com/user/get-reviews",
          { name }
        );
        const { userReviews, otherReviews } = response.data;
        setUserReview(userReviews);
        setReviews(otherReviews);
      } catch (err) {
        console.log(err);
      }
    };
    if (name) {
      getReviews();
    }
  }, [name, reviewEdited]);

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = edit
      ? "https://spotless-tunes.onrender.com/user/edit-review"
      : "https://spotless-tunes.onrender.com/user/add-review";
    const data = edit
      ? { review: reviewText, rating, reviewId: userReview[0]._id }
      : { review: reviewText, rating, name };
    try {
      await axios.post(url, data);
      setReviewEdited(true);
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <ChakraProvider>
      <Box
        width={{ base: "90%", md: "70%", lg: "50%" }} // Adjust width based on screen size
        marginX={"auto"}
        marginTop={"20px"}
      >
        {!userReview || edit ? (
          <Card
            padding={5}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            borderRadius={8}
          >
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              textAlign="center"
              mb={5}
            >
              Write a Review
            </Text>
            <form onSubmit={handleSubmit}>
              <textarea
                value={reviewText}
                onChange={handleReviewTextChange}
                rows={4}
                placeholder="Write your review here..."
                className="review-textarea"
                required
                style={{ width: "100%", resize: "vertical" }} // Set width to 100% to make it responsive
              />
              <br />
              {/* Adjust the size and orientation of the Rating component */}
              <Flex justify="center" align="center">
                <Text marginRight="10px" color="white">
                  Your Rating:
                </Text>
                <Rating
                  value={rating}
                  onChange={setRating}
                  halfFillMode={"box"}
                  className="my-rating-class"
                  style={{
                    fontSize: { base: "16px", md: "20px" },
                    display: "flex",
                  }}
                />
              </Flex>
              <br />
              <Flex justify="center">
                <Button type="submit" colorScheme="green" mt={3} mr={2}>
                  Submit
                </Button>
                {edit && (
                  <Button onClick={() => setEdit(false)} mt={3}>
                    Cancel
                  </Button>
                )}
              </Flex>
            </form>
          </Card>
        ) : (
          <Card
            key={userReview[0]._id}
            padding={5}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            borderRadius={8}
          >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text as="b" className={"user"} color={"white"}>
                {name}
              </Text>
              <Rating
                value={userReview[0].rating}
                readOnly
                halfFillMode={"box"}
              />
            </Flex>
            <Text className={"review"} mt={3} color={"white"}>
              {userReview[0].review}
            </Text>
            <Button mt={3} onClick={handleEdit}>
              Edit
            </Button>
          </Card>
        )}
      </Box>

      {/* Other reviews */}
      <Box width={"90%"} marginX={"auto"} marginTop={"10%"}>
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          textAlign="center"
          mb={5}
          color={"white"}
        >
          Other Reviews
        </Text>
        <Flex flexWrap={"wrap"} justifyContent={"center"}>
          {reviews &&
            reviews.map((review) => (
              <Card
                key={review._id}
                width={{ base: "90%", sm: "45%", md: "30%", lg: "20%" }}
                marginY={3}
                padding={5}
                backgroundColor={"rgba(0, 0, 0, 1.0)"}
                borderRadius={8}
                margin={2}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Text as="b" className={"user"} color={"white"}>
                    {review._id}
                  </Text>
                  <Rating
                    value={review.reviews[0].rating}
                    readOnly
                    halfFillMode={"box"}
                  />
                </Flex>
                <Text className={"review"} mt={3} color={"white"}>
                  {review.reviews[0].review}
                </Text>
              </Card>
            ))}
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default Review;
