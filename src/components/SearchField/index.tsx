import "./searchField.scss";
import { IoSearch } from "react-icons/io5";

export type SearchFieldProps = {
  searchTerm?: string;
  changeSearchTerm: (value: string) => void;
  handleSearch: () => void;
};

export const SearchField = (props: SearchFieldProps) => {
  const { handleSearch, searchTerm, changeSearchTerm } = props;
  return (
    <div className="search-field">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => changeSearchTerm(e.target.value)}
        className="input"
      />
      <button
        onClick={() => {
          handleSearch();
        }}
        className="button"
      >
        <IoSearch size={"20px"} />
      </button>
    </div>
  );
};
