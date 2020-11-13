import React, {Fragment} from 'react';
import Footer from '../footer';
import Navbar from '../navbar';
import Partners from '../partners';

/**
 * @param {*} props props
 * @return {Component} Movie page layout
 */
export default function MoviePageLayout(props) {
  return (
    <Fragment>
      <Navbar />
      {props.children}
      <Partners />
      <Footer />
    </Fragment>
  );
}
