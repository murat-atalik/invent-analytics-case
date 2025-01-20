import React, { useState, useEffect } from "react";
import { SearchField, SelectBox } from "../components";
import { eOMDBType } from "../network";
import { useAppSelector, useSearchMovie } from "../hooks";

export const HomePage = () => {
  const {
    changePage,
    changeSearchTerm,
    changeType,
    changeYear,
    handleSearch,
    options,
    searchKey,
  } = useSearchMovie();

  const movies = useAppSelector(
    (s) => s.search?.[searchKey ?? "-"]?.data.result?.Search ?? []
  );
  return (
    <div>
      <h1>OMDb API Example</h1>
      <SearchField
        changeSearchTerm={changeSearchTerm}
        handleSearch={handleSearch}
        searchTerm={options.searchTerm}
      />
      <SelectBox options={Object.values(eOMDBType)} onChange={changeType} />
      <p>{JSON.stringify(options)}</p>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <h2>
              {movie.Title} ({movie.Year})
            </h2>
            <img src={movie.Poster} alt={movie.Title} width="150" />
          </li>
        ))}
      </ul>
    </div>
  );
};
