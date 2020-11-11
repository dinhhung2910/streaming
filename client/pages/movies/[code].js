import React, {Fragment} from 'react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Partners from '../../components/partners';

/**
 * @return {Component} Movie main page
 */
export default function c() {
  return (
    <Fragment>
      <Navbar />
      {/* home */}
      <section className="home">

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="home__title">
                WATCHING <b>THE</b>
              </h1>
            </div>

            <div id="video-container">
            </div>
          </div>
        </div>
      </section>
      {/* end home */}

      {/* expected premiere */}
      <section
        className="section section--bg"
        data-bg="/img/section/section.jpg">
        <div className="container">
          <div id="all-movie" className="row">
            {/* section title */}
            <div className="col-12">
              <h2 className="section__title">Expected premiere</h2>
            </div>
            {/* end section title */}

            {/* card */}
            {/* <div class="col-6 col-sm-4 col-lg-3 col-xl-2">
<div class="card">
<div class="card__cover">
<img src="img/covers/Call-of-the-Wild_miniposter-1-1-pdf-692x1024.jpg" alt="">
<a href="#" class="card__play">
<i class="icon ion-ios-play"></i>
</a>
</div>
<div class="card__content">
<h3 class="card__title"><a href="#">The Call of the Wild</a></h3>
<span class="card__category">
<a href="#">Action</a>
<a href="#">Triler</a>
</span>
<span class="card__rate"><i class="icon ion-ios-star"></i>8.4</span>
</div>
</div>
</div> */}
            {/* end card */}

            {/* section btn */}
            <div className="col-12">
              <a href="#" className="section__btn">
                Show more
              </a>
            </div>
            {/* end section btn */}
          </div>
        </div>
      </section>
      {/* end expected premiere */}

      <Partners />
      <Footer />
    </Fragment>
  );
}
