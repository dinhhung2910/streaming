import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {BASE_URL} from '../utils/constants';

/**
 * Must use class component to extend nextJS document object
 */
class CustomDocument extends Document {
  /**
   * @return {Component} custom document
   */
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href={BASE_URL + '/icon/favicon-32x32.png'} />
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}

export default CustomDocument;

