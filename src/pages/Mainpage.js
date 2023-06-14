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
    handleUserList,
    userList,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searched, setsearched] = useState(false);

  /*
        go to show details
    */

  const goToShowDetails = (tvSeries) => {
    setSelectedTvSeries(tvSeries.id);
    localStorage.setItem("showId", tvSeries.id )
    let str = tvSeries.name;
    str = str.replace(/\s+/g, "-").toLowerCase();
    navigate(`/details/${str}`);
  };

  /*
    call function to get first page of shows 
  */

  useEffect(() => {
    listshows();
    handleUserList();
  }, []);

    console.log(tvSeries);
    /*
    Add show to watched
  */

  const addToWatched = async (id) => {
    const requestOptions = {
      method: "Post",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showId: id }),
    };
    const response = await fetch(
      "http://localhost:3000/api/lists",
      requestOptions
    );
    const data = await response.json();
    if (response.status !== 201) {
    } else{
      window.location.reload(false);
    }
    
  };


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
                    className="text-xl mb-6 text-center hover:cursor-pointer hover:scale-110 ease-in duration-500"
                    onClick={() => goToShowDetails(tvSeries)}
                  >
                    {tvSeries.name}
                  </h1>
                  <img
                    className="flex hover:cursor-pointer hover:scale-110 ease-in duration-500"
                    alt="poster"
                    onClick={() => goToShowDetails(tvSeries)}
                    src={tvSeries.imagePath}
                  />
                  {localStorage.getItem("token") && userList ? (
                    <div className="py-2">
                      {userList.filter((show) => show.show.id === tvSeries.id)
                        .length ? (
                          <button className="bg-slate-700 bg-blue-900 px-2 py-2 rounded-md disabled first-letter">
                          Already in Watched List
                          </button>
                      ) : (
                        <button
                        className="hover:bg-slate-700 bg-blue-900 px-2 py-2 rounded-md  first-letter"
                        onClick={() => addToWatched(tvSeries.id)}
                      >
                        Add to Watched list
                      </button>

                      )}
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
