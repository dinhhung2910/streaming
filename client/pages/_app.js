import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/style.scss';
import '../public/css/swiper.min.css';

import 'plyr/dist/plyr.css';

import '../public/font-awesome/css/all.min.css';

import store from '../store';

const MyApp = ({Component, pageProps}) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default MyApp;
