import React, {Fragment} from 'react';
import Navbar from '../Navbar/navbar';
import DetailModal from '../../components/DetailModal/DetailModal';
import {AnimatePresence} from 'framer-motion';

/**
 * @param {*} props props
 * @return {Component} Movie page layout
 */
export default function MoviePageLayout(props) {
  return (
    <Fragment>
      <Navbar />
      <DetailModal />
      <AnimatePresence exitBeforeEnter>
        {props.children}
      </AnimatePresence>
    </Fragment>
  );
}
