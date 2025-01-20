import { shallowEqual } from "react-redux";
import { SearchField } from "../components";
import { useAppSelector, useSearchMovie } from "../hooks";

export const HomePage = () => {
  const { options } = useSearchMovie();
  const searchKey = useAppSelector(
    (s) => s.search?.lastSearchKey,
    shallowEqual
  );
  const movies = useAppSelector(
    (s) => s.search.searchList?.[searchKey ?? "-"]?.data.result?.Search ?? [],
    shallowEqual
  );
  return (
    <div>
      <h1>OMDb API Example</h1>
      <SearchField />
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
