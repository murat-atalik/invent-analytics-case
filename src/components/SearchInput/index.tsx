import "./searchInput.scss";
import { IoSearch } from "react-icons/io5";

export type SearchFieldProps = {
  searchTerm?: string;
  changeSearchTerm: (value: string) => void;
  handleSearch: () => void;
};

export const SearchInput = (props: SearchFieldProps) => {
  const { handleSearch, searchTerm, changeSearchTerm } = props;
  return (
    <div className="search-input-area">
      <div className="input-container">
        <input
          type="text"
          placeholder=" "
          value={searchTerm}
          onChange={(e) => changeSearchTerm(e.target.value)}
          className="input"
        />
        <label className={`floating-label ${searchTerm ? "float" : ""}`}>
          Search movies or series...
        </label>
      </div>
      <button
        onClick={() => {
          handleSearch();
        }}
        className="search-button"
      >
        <IoSearch size={"20px"} />
      </button>
    </div>
  );
};
