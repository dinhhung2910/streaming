/* eslint-disable max-len */
/* eslint-disable camelcase */
// import {BASE_IMG_URL, FALLBACK_IMG_URL} from '../../requests';
import {useDispatch} from 'react-redux';
import {FaPlus, FaMinus, FaPlay, FaChevronDown} from 'react-icons/fa';
import useGenreConversion from '../../hooks/useGenreConversion';
import {showModalDetail} from '../../lib/slices/detailModalSlice';
import Link from 'next/link';
import {BASE_URL} from '../../utils/constants';


const RowPoster = (result) => {
  const {item, item: {title, original_name, original_title, name, tags, images, code}, isLarge, isFavourite} = result;
  const fallbackTitle = title || original_title || name || original_name;
  const genresConverted = useGenreConversion(tags);
  const dispatch = useDispatch();

  const poster_path = images.poster;
  const backdrop_path = images.background;

  const handleAdd = (event) => {
    event.stopPropagation();
    dispatch(addToFavourites({...item, isFavourite}));
  };
  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch(removeFromFavourites({...item, isFavourite}));
  };
  const handleModalOpening = () => {
    dispatch(showModalDetail({...item, fallbackTitle, genresConverted, isFavourite}));
  };
  const handlePlayAction = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`Row__poster ${isLarge ? 'Row__poster--big' : ''}`}
      onClick={handleModalOpening}
    >
      {isLarge ? (
        poster_path ? (
          <img src={poster_path} alt={fallbackTitle} />
        ) : ''
      ) : backdrop_path ? (
        <img src={backdrop_path} alt={fallbackTitle} />
      ) : (
        <>
          <img src={backdrop_path} alt={fallbackTitle} />
          <div className="Row__poster__fallback">
            <span>{fallbackTitle}</span>
          </div>
        </>
      )}
      <div className="Row__poster-info">
        <div className="Row__poster-info--iconswrp">
          <Link href={BASE_URL + '/movies/' + code}>
            <a className="Row__poster-info--icon icon--play"
              onClick={handlePlayAction}>
              <FaPlay />
            </a>
          </Link>
          {!isFavourite ?
            (
              <button className='Row__poster-info--icon icon--favourite' onClick={handleAdd}>
                <FaPlus />
              </button>
            ): (
              <button className='Row__poster-info--icon icon--favourite' onClick={handleRemove}>
                <FaMinus />
              </button>
            )}
          <button className='Row__poster-info--icon icon--toggleModal'>
            <FaChevronDown onClick={handleModalOpening}/>
          </button>
        </div>
        <div className="Row__poster-info--title">
          <h3>{fallbackTitle}</h3>
        </div>
        <div className="Row__poster-info--genres">
          {genresConverted && genresConverted.map((genre) => (
            <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RowPoster;
