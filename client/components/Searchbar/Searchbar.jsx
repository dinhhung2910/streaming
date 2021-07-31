/* eslint-disable max-len */
import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FiSearch} from 'react-icons/fi';
import {RiCloseFill} from 'react-icons/ri';
import useOutsideClick from '../../hooks/useOutsideClick';
import {useRouter} from 'next/dist/client/router';

const Searchbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchInputToggle, setSearchInputToggle] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchbarRef = useRef();
  const searchInputRef = useRef();

  useOutsideClick(searchbarRef, () => {
    if (searchInputToggle) {
      setSearchInput('');
      setSearchInputToggle(false);
    }
  });

  const handleSearchInputToggle = () => {
    searchInputRef.current.focus();
    setSearchInputToggle(!searchInputToggle);
  };

  const clearSearchInputToggle = () => {
    setSearchInput('');
    // router.push('/browse');
  };

  const handleSearchInput = (event) => {
    // do nothing
    // not implemented yet
    return;

    const {value} = event.target;
    setSearchInput(value);
    dispatch(changeSearchInputValue(value));

    if (value.length > 0) {
      history.push(`/search?q=${value}`);
      dispatch(fetchSearchResultsAsync(value));
    } else router.push('/browse');
  };

  return (
    <div className="Searchbar" ref={searchbarRef}>
      <input
        type="text"
        placeholder="Search titles, people"
        value={searchInput}
        onChange={handleSearchInput}
        ref={searchInputRef}
        className={`Searchbar--search ${searchInputToggle ? 'Searchbar--active' : ''}`}
      />
      <div
        className="Searchbar--toggler"
        onClick={handleSearchInputToggle}
      >
        <FiSearch size="1.5em" />
      </div>
      <div
        className={`Searchbar--clear ${searchInputToggle && searchInput.length ? 'typing' : ''}`}
        onClick={clearSearchInputToggle}
      >
        <RiCloseFill />
      </div>
    </div>
  );
};

export default Searchbar;
