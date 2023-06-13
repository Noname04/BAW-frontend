import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../DataContext";

export default function Details() {
  const { selectedTvSeries, getTvSeries, selectedTvSeriesDetails } =
    useContext(DataContext);


  useEffect(() => {
    getTvSeries(selectedTvSeries);
  }, []);

  if (selectedTvSeriesDetails) {
    console.log(
      Math.max(...selectedTvSeriesDetails.episodes.map((e) => e.season))
    );
    console.log(selectedTvSeriesDetails);
  }

  return (
    <div>
      {selectedTvSeriesDetails ? (
        <div>
          <div className="flex bg-black  ">
            <img className="px-4" src={selectedTvSeriesDetails.imagePath} alt="" />
            <div className="w-2/4 mx-10">
              <h3 className=" font-semibold text-2xl">Overview:</h3>
              <p className="pt-1">{selectedTvSeriesDetails.description}</p>
              <div className="flex">
                <h3 className="pr-2 font-semibold text-2xl">score:</h3>
                {selectedTvSeriesDetails.score ? (
                  <p className=" font-semibold">
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
          <div className="pb-10 ">
            <div className=" py-4">
              <div className=" flex row mb-4 mx-8">
                <h3 className="mr-2">Rating:</h3>
                <div className=" w-1/5 ">
                </div>
              </div>
              <div className=" ">
                <textarea className="bg-gray-500 mx-6 px-2 py-2 w-3/4 h-60" />
              </div>
              <button className="hover:bg-slate-700 bg-blue-900 px-2 py-2 rounded-md my-2 mx-6 mt-4">
                {" "}
                Submit{" "}
              </button>
            </div>
            <h4 className="text-4xl">Reviews</h4>
          </div>
        </div>
      ) : null}
    </div>
  );
}
