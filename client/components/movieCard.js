import React from 'react';
import Link from 'next/link';

/**
 * @return {Component}
 * @param {Object} props
 */
function MovieCard(props) {
  const {movie} = props;

  return (
    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
      <div className="card">
        <div className="card__cover">
          <img
            src={movie.images.poster}
            alt="" />
          <Link href={'/movies/' + movie.code}>
            <a href="#" className="card__play">
              <i className="icon ion-ios-play"></i>
            </a>
          </Link>
        </div>
        <div className="card__content">
          <h3 className="card__title">
            <Link href={'/movies/' + movie.code}>
              <a href="#">{movie.name}</a>
            </Link>
          </h3>
          <span className="card__category">
            {movie.tags.map((item, index) => (
              <a key={index} href="#">{item.code}</a>),
            )}
          </span>
          <span className="card__rate">
            <i className="icon ion-ios-star"></i>
            {movie.point}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
