import { shallowEqual } from "react-redux";
import { SearchField } from "../../components";
import { useAppSelector, useSearchMovie } from "../../hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import image from "../../assets/backgrounds/back.png";
import "./homePage.scss";

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
    <div className="homepage">
      <div className="homepage__banner">
        <LazyLoadImage
          className="homepage__banner-image"
          alt={"background"}
          src={image}
        />
        <div className="homepage__banner-gradient" />
        <div className="homepage__search">
          <SearchField />
        </div>
      </div>

      <p className="homepage__options">{JSON.stringify(options)}</p>
      <ul className="homepage__movies">
        {movies.map((movie, index) => (
          <li key={index}>
            <h2>
              {movie.Title} ({movie.Year})
            </h2>
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))}
      </ul>
    </div>
  );
};
