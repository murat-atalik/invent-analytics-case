import React from "react";
import { Link } from "react-router-dom";
import "./movieCard.scss";
import { eOMDBType, SearchItemType } from "../../network";
import { LazyLoadImage } from "react-lazy-load-image-component";
import defaultImage from "../../assets/images/default-movie.jpg";

export const MovieCard = (props: SearchItemType) => {
  const { Poster, Title, Type, Year, imdbID } = props;

  let icon;
  switch (Type) {
    case eOMDBType.MOVIE:
      icon = "🎬";
      break;
    case eOMDBType.SERIES:
      icon = "📺";
      break;
    case eOMDBType.EPISODE:
      icon = "📖";
      break;
    default:
      icon = "";
  }

  return (
    <Link to={`/detail/${imdbID}`} className="card">
      <LazyLoadImage
        className="card__image"
        src={Poster}
        alt={Title}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = defaultImage;
        }}
      />
      <div className="card__info">
        <h2 className="card__title">
          {Title} ({Year})
        </h2>
      </div>
      <div className="card__icon">{icon}</div>
    </Link>
  );
};
