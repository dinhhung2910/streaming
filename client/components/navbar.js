import React from 'react';
import Link from 'next/link';

/**
 * @return {Component} Page header navigation bar
 */
function Navbar() {
  return (
    <header className="header">
      <div className="header__wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                {/* header logo */}
                <Link href="/">
                  <a className="header__logo">
                    <img src="/img/logo.svg" alt="" />
                  </a>
                </Link>
                {/* end header logo */}

                {/* header nav */}
                <ul className="header__nav">
                  {/* dropdown */}
                  <li className="header__nav-item">
                    <Link href="#">
                      <a
                        className="dropdown-toggle header__nav-link"
                        role="button"
                        id="dropdownMenuHome"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Home
                      </a>
                    </Link>

                    <ul
                      className="dropdown-menu header__dropdown-menu"
                      aria-labelledby="dropdownMenuHome"
                    >
                      <li>
                        <Link href="#">
                          <a href="/index.html">Home slideshow bg</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a href="/index2.html">Home static bg</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* end dropdown */}

                  {/* dropdown */}
                  <li className="header__nav-item">
                    <Link href="#">
                      <a
                        className="dropdown-toggle header__nav-link"
                        href="#"
                        role="button"
                        id="dropdownMenuCatalog"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Catalog
                      </a>
                    </Link>

                    <ul
                      className="dropdown-menu header__dropdown-menu"
                      aria-labelledby="dropdownMenuCatalog"
                    >
                      <li>
                        <a href="/catalog1.html">Catalog Grid</a>
                      </li>
                      <li>
                        <a href="/catalog2.html">Catalog List</a>
                      </li>
                      <li>
                        <a href="/details1.html">Details Movie</a>
                      </li>
                      <li>
                        <a href="/details2.html">Details TV Series</a>
                      </li>
                    </ul>
                  </li>
                  {/* end dropdown */}

                  <li className="header__nav-item">
                    <a href="/pricing.html" className="header__nav-link">
                        Pricing Plan
                    </a>
                  </li>

                  <li className="header__nav-item">
                    <a href="/faq.html" className="header__nav-link">
                        Help
                    </a>
                  </li>

                  {/* dropdown */}
                  <li className="dropdown header__nav-item">
                    <a
                      className={`
                        dropdown-toggle 
                        header__nav-link 
                        header__nav-link--more
                      `}
                      href="#"
                      role="button"
                      id="dropdownMenuMore"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                    </a>

                    <ul
                      className="dropdown-menu header__dropdown-menu"
                      aria-labelledby="dropdownMenuMore"
                    >
                      <li>
                        <a href="/about.html">About</a>
                      </li>
                      <li>
                        <a href="/signin.html">Sign In</a>
                      </li>
                      <li>
                        <a href="/signup.html">Sign Up</a>
                      </li>
                      <li>
                        <a href="/404.html">404 Page</a>
                      </li>
                    </ul>
                  </li>
                  {/* end dropdown */}
                </ul>
                {/* end header nav */}

                {/* header auth */}
                <div className="header__auth">
                  <button className="header__search-btn" type="button">
                    {/* <i class="icon ion-ios-search"></i> */}
                    <ion-icon name="search-outline"></ion-icon>
                  </button>

                  <a href="/signin.html" className="header__sign-in">
                    {/* <i class="icon ion-ios-log-in"></i> */}
                    {/* <ion-icon name="log-in"></ion-icon> */}
                    <span>sign in</span>
                  </a>
                </div>
                {/* end header auth */}

                {/* header menu btn */}
                <button className="header__btn" type="button">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                {/* end header menu btn */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* header search */}
      <form action="#" className="header__search">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__search-content">
                <input
                  type="text"
                  // eslint-disable-next-line max-len
                  placeholder="Search for a movie, TV Series that you are looking for"
                />

                <button type="button">search</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* end header search */}
    </header>
  );
}


export default Navbar;
