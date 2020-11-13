import React from 'react';
import MovieCard from './movieCard';

/**
 * @return {Component} Expected premiere
 * @param {*} props props
 */
function ExpectedPremiere(props) {
  const {allMovies} = props;

  return (
    <section
      className="section section--bg"
      data-bg="/img/section/section.jpg">
      <div className="container">
        <div id="all-movie" className="row">
          <div className="col-12">
            <h2 className="section__title">Expected premiere</h2>
          </div>
          {allMovies.map((item) => (<MovieCard key={item._id} movie={item} />))}
          <div className="col-12">
            <a href="#" className="section__btn">
            Show more
            </a>
          </div>
          {/* end section btn */}
        </div>
      </div>
    </section>

  );
}

export default ExpectedPremiere;
