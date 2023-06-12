import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [search, setSearch] = useState("");

  const [tvSeries, setTvSeries] = useState([]);

  /*	const getShowsRequest = async (searchValue) => {
		const url = `http://localhost:3000/api/shows`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setTvSeries(responseJson.Search);
		}
	};
*/

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

  return (
    <DataContext.Provider
      value={{ handleSearch, tvSeries, listshows, pageChange }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
