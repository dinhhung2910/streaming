import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {withResizeDetector} from 'react-resize-detector';

/**
 * @return {Component}
 * @param {Object} props
 */
function MovieCard(props) {
  const {movie, width} = props;
  const [posterHeight, setPosterHeight] = useState(0);

  useEffect(() => {
    setPosterHeight(width * 1.48);
  }, [width]);

  return (
    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
      <div className="card">
        <div className="card__cover"
          style={{height: parseInt(posterHeight) + 'px'}}>
          <img
            src={movie.images.poster}
            alt="" />
          <Link href={'/movies/' + movie.code}>
            <a href="#" className="card__play">
              <i className="fal fa-play"></i>
            </a>
          </Link>
        </div>
        <div className="card__content">
          <h3 className="card__title" title={movie.name}>
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
            <i className="fas fa-star"></i>
            {movie.point}
          </span>
        </div>
      </div>
    </div>
  );
}

export default withResizeDetector(MovieCard);
