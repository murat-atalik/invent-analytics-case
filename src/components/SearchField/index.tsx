import React from "react";
import { SearchInput } from "../SearchInput";
import { SelectBox } from "../SelectBox";
import { useSearchMovie } from "../../hooks";
import { eOMDBType } from "../../network";
import "./searchField.scss";
import { IoSearch } from "react-icons/io5";
import { YearPicker } from "../YearPicker";

export const SearchField = () => {
  const { changeSearchTerm, changeType, changeYear, handleSearch, options } =
    useSearchMovie();

  return (
    <div className="search-field">
      <SearchInput
        changeSearchTerm={changeSearchTerm}
        handleSearch={handleSearch}
        searchTerm={options.searchTerm}
      />
      <div className="search-field-filters">
        <SelectBox options={Object.values(eOMDBType)} onChange={changeType} />
        <YearPicker onChange={changeYear} />
        <button
          className="search-field-button"
          onClick={() => {
            handleSearch();
          }}
        >
          <IoSearch size={"20px"} />
          Search
        </button>
      </div>
    </div>
  );
};
