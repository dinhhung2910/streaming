import React from 'react';
import Head from 'next/head';

import ExpectedPremiere from '../../components/expectedPremiere';
import {BASE_API_URL} from '../../utils/constants';
import MoviePageLayout from '../../components/movie-page/moviePageLayout';

/**
 * @param {Object} context nextjs context
 */
export async function getStaticProps(context) {
  console.log(BASE_API_URL);
  const res1 = await fetch(BASE_API_URL + '/api/movies');
  const allMovies = await res1.json();

  return {
    props: {
      allMovies,
    },
    revalidate: 10,
  };
}

/**
 * @param {*} props props
 * @return {Component} Movie main page
 */
export default function c(props) {
  const {allMovies} = props;

  return (
    <MoviePageLayout>
      <Head>
        <title>Dashboard | HFilms </title>
      </Head>
      <div className="padding" style={{height: '60px'}} />
      <ExpectedPremiere allMovies={allMovies}/>
    </MoviePageLayout>
  );
}
