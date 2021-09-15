/* eslint-disable max-len */
import React, {useEffect} from 'react';
import Head from 'next/head';

import {BASE_API_URL} from '../../utils/constants';
import MoviePlayer from '../../components/moviePlayer';
import MoviePageLayout from '../../components/movie-page/moviePageLayout';


import Banner from '../../components/Banner/Banner';
import Row from '../../components/Row/Row';
// import Credits from '../../components/Credits/Credits';
import {motion} from 'framer-motion';
import {defaultPageFadeInVariants} from '../../utils/motionUtils';
import {useDispatch, useSelector} from 'react-redux';
import {selectShowMoviePlayer, togglePlayer} from '../../lib/slices/moviePlayerSlice';

/**
 * @param {Object} context nextjs context
 */
export async function getStaticProps(context) {
  const code = context.params.code;

  const res1 = await fetch(BASE_API_URL + '/api/movies');
  const allMovies = await res1.json();
  const allAvailableMovies = (Array.isArray(allMovies) ? allMovies : []).filter((en) => en.isAvailable);

  const res2 = await fetch(BASE_API_URL + '/api/movies/code/' + code);
  const movie = await res2.json();

  return {
    props: {
      movie,
      allMovies: allAvailableMovies,
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
  // const {movie, allMovies} = props
  const movie = props.movie || {
    images: {},
    sources: [],
    subtitles: [],
  };
  const allMovies = props.allMovies || [];

  const dispatch = useDispatch();
  const showMoviePlayer = useSelector(selectShowMoviePlayer);

  useEffect(() => {
    dispatch(togglePlayer(false));

    return () => dispatch(togglePlayer(false));
  }, [movie.code]);

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
      <motion.div
        className="Movies"
        variants={defaultPageFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Banner type='movies' movie={movie} style={{display: showMoviePlayer ? 'none' : ''}}/>
        <MoviePlayer movie={movie}/>

        <Row title="Expected premiere" isLarge={true}
          rowData={{data: allMovies, loading: false}}
        />
        {/* <Credits /> */}
      </motion.div>
    </MoviePageLayout>
  );
}
