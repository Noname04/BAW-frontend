import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {

  const [tvSeries, setTvSeries] = useState([]);
  const [selectedTvSeries, setSelectedTvSeries] = useState();
  const [selectedTvSeriesDetails, setSelectedTvSeriesDetails] = useState();

  const handleSearch = (searchValue) => {
    fetch(`http://localhost:3000/api/shows/all?search=${searchValue}`)
      .then((res) => res.json())
      .then((data) => setTvSeries(data));
  };

  const listshows = () => {
    if (tvSeries.length === 0)
      fetch(`http://localhost:3000/api/shows`)
        .then((res) => res.json())
        .then((data) => setTvSeries(data));
  };

  const pageChange = (page) => {
    if (page !== "/shows?page=9" && page != null)
      fetch(`http://localhost:3000/api${page}`)
        .then((res) => res.json())
        .then((data) => setTvSeries(data));
  };

 const getTvSeries = (id) => {
    if( id )
        {    fetch(`http://localhost:3000/api/shows/${id}`).then((res)=> res.json()).then((data)=>setSelectedTvSeriesDetails(data))}
  };

  return (
    <DataContext.Provider
      value={{ handleSearch, tvSeries, listshows, pageChange, selectedTvSeries, setSelectedTvSeries, getTvSeries, selectedTvSeriesDetails }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
