import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";

export default function Mainpage() {
  const {
    handleSearch,
    tvSeries,
    listshows,
    pageChange,
    selectedTvSeries,
    setSelectedTvSeries,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searched, setsearched] = useState(false);

  const goToPage = (tvSeries) => {
    setSelectedTvSeries(tvSeries.id);
    let str = tvSeries.name;
    
    str = str.replace(/\s+/g, "-").toLowerCase();
    navigate(`/details/${str}`);
  };

  useEffect(() => {
    listshows();
  });
  return (
    <>
      <div className="flex justify-center pt-10   ">
        <h1 className="text-4xl ">Search for tv series...</h1>
      </div>
      <div className="flex justify-center items-center ">
        <input
          className=" text-black  m-4 rounded-lg block p-2.5 "
          type="text"
          autoComplete="off"
          placeholder="Search show..."
          id="search-input"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          className="hover:bg-slate-700 bg-blue-900 px-2 py-2 rounded-md my-2 "
          onClick={() => {
            handleSearch(searchValue);
            setsearched(true);
          }}
        >
          Search
        </button>
      </div>
      <div className="flex justify-center mb-10 place-items-center space-x-4 ">
        {searched === false ? (
          <>
            <button
              className="hover:bg-slate-700 bg-blue-900 px-2 py-2 rounded-md "
              onClick={() => {
                pageChange(tvSeries.prevPage);
              }}
            >
              Previous Page
            </button>
            <button
              className="hover:bg-slate-700 bg-blue-900 px-2 py-2 rounded-md  first-letter"
              onClick={() => {
                pageChange(tvSeries.nextPage);
              }}
            >
              Next Page
            </button>
          </>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-center px-4 ">
        {tvSeries.shows
          ? tvSeries.shows.map((tvSeries) => {
              return (
                <div
                  className="flex flex-col justify-between items-center mx-2 w-1/5 mb-10 "
                  key={tvSeries.id}
                >
                  <h1
                    className="text-xl mb-6 text-center hover:cursor-pointer hover:scale-125 ease-in duration-500"
                    onClick={() => goToPage(tvSeries)}
                  >
                    {tvSeries.name}
                  </h1>
                  
                    <img
                      className="flex hover:cursor-pointer hover:scale-125 ease-in duration-500"
                      alt="poster"
                      onClick={() => goToPage(tvSeries)}
                      src={tvSeries.imagePath}
                    />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
