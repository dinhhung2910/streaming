/* eslint-disable no-tabs */
/* eslint-disable max-len */
import {useState, useRef} from 'react';
import useViewport from '../../hooks/useViewport';
import useScroll from '../../hooks/useScroll';
import useOutsideClick from '../../hooks/useOutsideClick';
import {motion} from 'framer-motion';
import {navbarFadeInVariants} from '../../utils/motionUtils';
import {FaCaretDown} from 'react-icons/fa';
import Searchbar from '../Searchbar/Searchbar';
import {useDispatch, useSelector} from 'react-redux';
// import {selectCurrentUser} from '../../redux/auth/auth.selectors';
// import {signOutStart} from '../../redux/auth/auth.actions';
import Link from 'next/link';
import NavLink from './navlink';
import {selectShowMoviePlayer} from '../../lib/slices/moviePlayerSlice';

// for server only
const LOGO_URL = '/streaming/img/Fakeflix_logo.png';
const MOBILE_LOGO_URL = '/streaming/img/Fakeflix_favicon_192.png';
const PROFILE_PIC_URL = '/streaming/img/Fakeflix_profilepic.png';

const Navbar = () => {
  const {width} = useViewport();
  const isScrolled = useScroll(70);
  const [genresNav, setGenresNav] = useState(false);
  const [profileNav, setProfileNav] = useState(false);
  const genresNavRef = useRef();
  const profileNavRef = useRef();
  const currentUser = null; // useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const showMoviePlayer = useSelector(selectShowMoviePlayer);

  useOutsideClick(genresNavRef, () => {
    if (genresNav) setGenresNav(false);
  });
  useOutsideClick(profileNavRef, () => {
    if (profileNav) setProfileNav(false);
  });

  return (
    <>
      <motion.nav
        className={`Navbar ${isScrolled ? 'Navbar__fixed' : ''} ${showMoviePlayer ? 'Navbar__on-player' : ''}`}
        variants={navbarFadeInVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Link href="/">
          <img className="Navbar__logo" src={width >= 600 ? LOGO_URL : MOBILE_LOGO_URL} alt="" />
        </Link>
        {width >= 1024 ? (
          <ul className="Navbar__primarynav Navbar__navlinks">
            <li className="Navbar__navlinks--link">
              <NavLink href="/browse" activeClassName="activeNavLink">
								Home
              </NavLink>
            </li>
            <li className="Navbar__navlinks--link">
              <NavLink href="/tvseries" activeClassName="activeNavLink">
								TV Series
              </NavLink>
            </li>
            <li className="Navbar__navlinks--link">
              <NavLink href="/movies" activeClassName="activeNavLink">
								Movies
              </NavLink>
            </li>
            <li className="Navbar__navlinks--link">
              <NavLink href="/popular" activeClassName="activeNavLink">
								New & Popular
              </NavLink>
            </li>
            <li className="Navbar__navlinks--link">
              <NavLink href="/mylist" activeClassName="activeNavLink">
								My list
              </NavLink>
            </li>
          </ul>
        ) : (
          <div
            className={`Navbar__primarynav Navbar__navlinks ${isScrolled ? 'Navbar__primarynav--scrolled' : ''}`}
            onClick={() => setGenresNav(!genresNav)}
          >
            <span className="Navbar__navlinks--link">Discover</span>
            <FaCaretDown className="Navbar__primarynav--toggler Navbar__primarynav--caret" />
            <div
              className={`Navbar__primarynav--content ${genresNav ? 'active' : ''}`}
            >
              {genresNav && (
                <ul
                  className="Navbar__primarynav--content-wrp"
                  ref={genresNavRef}
                >
                  <li className="Navbar__navlinks--link">
                    <NavLink href="/browse" activeClassName="activeNavLink">
											Home
                    </NavLink>
                  </li>
                  <li className="Navbar__navlinks--link">
                    <NavLink href="/tvseries" activeClassName="activeNavLink">
											TV Series
                    </NavLink>
                  </li>
                  <li className="Navbar__navlinks--link">
                    <NavLink href="/movies" activeClassName="activeNavLink">
											Movies
                    </NavLink>
                  </li>
                  <li className="Navbar__navlinks--link">
                    <NavLink href="/popular" activeClassName="activeNavLink">
											New & Popular
                    </NavLink>
                  </li>
                  <li className="Navbar__navlinks--link">
                    <NavLink href="/mylist" activeClassName="activeNavLink">
											My list
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
        <div className="Navbar__secondarynav">
          <div className="Navbar__navitem">
            <Searchbar />
          </div>
          <div className="Navbar__navitem">
            <div
              className={`Navbar__navprofile ${profileNav ? 'active' : ''}`}
              onClick={() => setProfileNav(!profileNav)}
            >
              <img
                className="Navbar__navprofile--avatar Navbar__navprofile--toggler"
                src={PROFILE_PIC_URL}
                alt="Profile Picture"
              />
              <FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
              <div className={`Navbar__navprofile--content ${profileNav ? 'active' : ''}`}>
                {profileNav && (
                  <ul
                    className="Navbar__navprofile--content-wrp"
                    ref={profileNavRef}
                  >
                    {currentUser && (
                      <li
                        className="Navbar__navlinks--link"
                        onClick={() => dispatch(signOutStart())}
                      >
												Sign Out
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
