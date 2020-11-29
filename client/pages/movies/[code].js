import React from 'react';
import Head from 'next/head';

import ExpectedPremiere from '../../components/expectedPremiere';
import {BASE_API_URL} from '../../utils/constants';
import MoviePlayer from '../../components/moviePlayer';
import MoviePageLayout from '../../components/movie-page/moviePageLayout';

/**
 * @param {Object} context nextjs context
 */
export async function getStaticProps(context) {
  const code = context.params.code;

  const res1 = await fetch(BASE_API_URL + '/api/movies');
  const allMovies = await res1.json();

  const res2 = await fetch(BASE_API_URL + '/api/movies/code/' + code);
  const movie = await res2.json();

  return {
    props: {
      movie,
      allMovies,
    },
    revalidate: 10,
  };
}

/**
 *
 */
export async function getStaticPaths() {
  const res = await fetch(BASE_API_URL + '/api/movies');
  const movies = await res.json();

  const paths = movies.map((movie) => ({
    params: {code: movie.code},
  }));

  return {
    paths,
    fallback: true,
  };
}

/**
 * @param {*} props props
 * @return {Component} Movie main page
 */
export default function c(props) {
  // const {movie, allMovies} = props;
  const movie = props.movie || {
    images: {},
    sources: [],
    subtitles: [],
  };
  const allMovies = props.allMovies || [];

  return (
    <MoviePageLayout>
      <Head>
        <title>{movie.name} | HFilms </title>
        <meta property="og:title" content={
          `${movie.name}` +
          (movie.alternativeName ? ` (${movie.alternativeName})` : '') +
          ` | ${movie.year} | HFilms`
        }></meta>
        <meta property="og:image" content={movie.images.poster}></meta>
        <meta property="og:description" content={movie.description}></meta>
        <meta property="og:type" content="video.movie"></meta>
      </Head>
      <section className="home">

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="home__title">
                WATCHING <b>{movie.name}</b>
              </h1>
            </div>

            <MoviePlayer movie={movie}/>
          </div>
        </div>
      </section>
      <ExpectedPremiere allMovies={allMovies}/>
    </MoviePageLayout>
  );
}
