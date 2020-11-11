import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import '../public/css/main.scss';

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
