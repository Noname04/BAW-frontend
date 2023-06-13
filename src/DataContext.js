import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {

  const [tvSeries, setTvSeries] = useState([]);
  const [selectedTvSeries, setSelectedTvSeries] = useState();
  const [selectedTvSeriesDetails, setSelectedTvSeriesDetails] = useState();
  const [userList, setUserList] = useState(null);

  /*
    get searched show from all
  */

  const handleSearch = (searchValue) => {
    
    fetch(`http://localhost:3000/api/shows/all?search=${searchValue}`)
      .then((res) => res.json())
      .then((data) => setTvSeries(data));
  };

  /*
    get fisrt page of shows 
  */

  const listshows = () => {
    if (tvSeries.length === 0)
      fetch(`http://localhost:3000/api/shows`)
        .then((res) => res.json())
        .then((data) => setTvSeries(data));
  };


  /*
    change page
  */
  const pageChange = (page) => {
    if (page !== "/shows?page=9" && page != null)
      fetch(`http://localhost:3000/api${page}`)
        .then((res) => res.json())
        .then((data) => setTvSeries(data));
  };


    /*
      get details of chosen show
    */  
 const getTvSeries = (id) => {
    if( id )
        {    fetch(`http://localhost:3000/api/shows/${id}`).then((res)=> res.json()).then((data)=>setSelectedTvSeriesDetails(data))}
  };

    /*
    Add show to watched
  */


      /*
    Get User List
*/

  const handleUserList = async () => {
    const requestOptions = {
      method: "GET",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    const response = await fetch(
      "http://localhost:3000/api/lists",
      requestOptions
    );
    const data = await response.json();
    if (response.status !== 200) {
    }
    setUserList(data);
  };

  return (
    <DataContext.Provider
      value={{ handleSearch, tvSeries, listshows, pageChange, selectedTvSeries, setSelectedTvSeries, getTvSeries, selectedTvSeriesDetails, handleUserList, userList }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
