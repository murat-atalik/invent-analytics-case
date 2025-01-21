import { shallowEqual } from "react-redux";
import { SearchField } from "../../components";
import { useAppSelector, useSearchMovie } from "../../hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import image from "../../assets/backgrounds/back.png";
import "./homePage.scss";
import { MovieCard } from "../../components/MovieCard";

export const HomePage = () => {
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
      <div className="homepage__header">
        <div className="homepage__banner">
          <LazyLoadImage
            className="homepage__banner-image"
            alt={"background"}
            src={image}
          />
          <div className="homepage__banner-gradient" />
        </div>

        <div className="homepage__search">
          <SearchField />
        </div>
      </div>

      <div className="homepage__movies">
        {movies.map((movie, index) => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </div>
    </div>
  );
};
