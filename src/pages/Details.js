import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../DataContext";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "1",
  1: "2",
  1.5: "3",
  2: "4",
  2.5: "5",
  3: "6",
  3.5: "7",
  4: "8",
  4.5: "9",
  5: "10",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function Details() {
  const {
    selectedTvSeries,
    getTvSeries,
    selectedTvSeriesDetails,
    handleUserReviews,
    userReviews,
  } = useContext(DataContext);
  const [review, setReview] = useState("");
  const [value, setValue] = React.useState(2.5);
  const [hover, setHover] = React.useState(-1);
  const [sent, setSent] = useState(false);

  /*
    call funtciton to get detail of show 
  */

  useEffect(() => {
    getTvSeries(selectedTvSeries);
    handleUserReviews();
  }, []);

  if (!selectedTvSeriesDetails) {
    getTvSeries(localStorage.getItem("showId"));
    handleUserReviews();
  }

  /*
    add Review
  */

  const handleAddReview = async () => {
    if (review && value && review.length <= 1000) {
      const requestOptions = {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showId: selectedTvSeries,
          score: value * 2,
          comment: review,
        }),
      };
      const response = await fetch(
        "http://localhost:3000/api/ratings",
        requestOptions
      );
      const data = await response.json();
      if (response.status !== 201) {
      } else {
        window.location.reload(false);
      }
    }
  };

  return (
    <div>
      {selectedTvSeriesDetails ? (
        <div>
          <div className="flex bg-black  ">
            <img
              className="px-4"
              src={selectedTvSeriesDetails.imagePath}
              alt=""
            />
            <div className="w-2/4 mx-10">
              <h3 className=" font-semibold text-2xl">Overview:</h3>
              <p className="pt-1">{selectedTvSeriesDetails.description}</p>
              <div className="flex">
                <h3 className="pr-2 font-semibold text-2xl">Score:</h3>
                {selectedTvSeriesDetails.score ? (
                  <p className="mt-2 font-semibold">
                    {selectedTvSeriesDetails.score}
                  </p>
                ) : (
                  <p className=" pt-2 font-semibold">No rating</p>
                )}
              </div>
              <div className="flex">
                <h3 className=" font-semibold text-lg"> Numbers of seasons:</h3>
                <p className="pt-1 pl-3">
                  {Math.max(
                    ...selectedTvSeriesDetails.episodes.map((e) => e.season)
                  )}
                </p>
              </div>
              <div className="flex">
                <h3 className=" font-semibold text-lg">
                  {" "}
                  Numbers of episodes:
                </h3>
                <p className="pt-1 pl-3">
                  {" "}
                  {selectedTvSeriesDetails.episodes.length}
                </p>
              </div>
            </div>
          </div>
          {localStorage.getItem("token") &&
          userReviews &&
          userReviews.filter((r) => r.showId === localStorage.getItem("showId"))
            .length === 0 ? (
            <div>
              <div className=" py-4">
                <div>
                  <div className=" flex row mb-4 mx-8">
                    <h3 className="mr-2">Rating:</h3>
                    <div className=" w-1/5 ">
                      <Box
                        sx={{
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          name="hover-feedback"
                          value={value}
                          precision={0.5}
                          className="bg-slate-600 border-2 border-black"
                          getLabelText={getLabelText}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                        {value !== null && (
                          <Box sx={{ ml: 2 }}>
                            {labels[hover !== -1 ? hover : value]}
                          </Box>
                        )}
                      </Box>
                    </div>
                  </div>
                  <div>
                    <textarea
                      className="bg-gray-500 mx-6 px-2 py-2 w-3/4 h-60 rounded-md border-black border-2"
                      onChange={(e) => {
                        setReview(e.target.value);
                        setSent(false);
                      }}
                    />
                  </div>
                  <button
                    className="hover:bg-slate-700 bg-blue-900 px-2 py-2 rounded-md my-2 mx-6 mt-4"
                    onClick={() => {
                        handleAddReview();
                        setSent(true);
                    }}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                </div>
                {!review && sent ? (
                  <Alert className="my-4 mx-5  w-1/5" severity="error">
                    {" "}
                    Review can't be empty.{" "}
                  </Alert>
                ) : null}
                {review.length > 1000 ? (
                  <Alert className="mb-4" severity="error">
                    {" "}
                    Review is too long.{" "}
                  </Alert>
                ) : null}
              </div>
            </div>
          ) : null}
          <div>
            <h4 className="text-4xl px-4 pb-4 ">Reviews</h4>
            <div>
              <div>
                {selectedTvSeriesDetails.ratings.map((rating) => {
                  return (
                    <div
                      className="bg-gray-500 mx-6 px-2 mb-6 py-2 w-3/4 h-fit rounded-md border-black border-2"
                      key={rating.id}
                    >
                      <div className=" flex row mb-4 mx-8">
                        <h3 className="mr-2 font-semibold">Rating:</h3>
                        <p>{rating.score}/10</p>
                      </div>
                      <p>{rating.comment}</p>
                      <p className="pb-4">
                        Added: {new Date(rating.added).toLocaleDateString()}{" "}
                        {new Date(rating.added).toLocaleTimeString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
