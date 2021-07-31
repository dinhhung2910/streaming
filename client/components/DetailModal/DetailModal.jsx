/* eslint-disable max-len */
/* eslint-disable camelcase */
import {useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {staggerOne, modalOverlayVariants, modalVariants, modalFadeInUpVariants} from '../../utils/motionUtils';
import {hideModalDetail} from '../../lib/slices/detailModalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectModalContent, selectModalState} from '../../lib/slices/detailModalSlice';
import {VscChromeClose} from 'react-icons/vsc';
import {capitalizeFirstLetter} from '../../utils/common';
import {FaMinus, FaPlay, FaPlus} from 'react-icons/fa';
// import {addToFavourites, removeFromFavourites} from '../../redux/favourites/favourites.actions';
import useOutsideClick from '../../hooks/useOutsideClick';
import Link from 'next/link';
import {BASE_URL} from '../../utils/constants';

const DetailModal = () => {
  const dispatch = useDispatch();
  const modalClosed = useSelector(selectModalState);
  const modalContent = useSelector(selectModalContent);
  const handleModalClose = () => dispatch(hideModalDetail());
  const {description, fallbackTitle, images, year, point, originalLanguage, adult, tags, isFavourite, code} = modalContent;
  const joinedGenres = tags ? tags.map((en) => en.code).join(', ') : 'Not available';
  const maturityRating = adult === undefined ? 'Not available' : adult ? 'Suitable for adults only' : 'Suitable for all ages';
  const modalRef = useRef();

  const handleAdd = (event) => {
    event.stopPropagation();
    dispatch(addToFavourites({...modalContent, isFavourite}));
  };
  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch(removeFromFavourites({...modalContent, isFavourite}));
    if (!modalClosed) handleModalClose();
  };
  const handlePlayAnimation = (event) => {
    event.stopPropagation();
    handleModalClose();
  };
  useOutsideClick(modalRef, () => {
    if (!modalClosed) handleModalClose();
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {!modalClosed && (
        <>
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key="modalOverlay"
            className={`Modal__overlay ${modalClosed ? 'Modal__invisible': ''}`}
          >
            <motion.div
              key="modal"
              variants={modalVariants}
              ref={modalRef}
              className={`Modal__wrp ${modalClosed ? 'Modal__invisible': ''}`}
            >
              <motion.button
                className="Modal__closebtn"
                onClick={handleModalClose}
              >
                <VscChromeClose />
              </motion.button>
              <div className="Modal__image--wrp">
                <div className="Modal__image--shadow" />
                <img
                  className="Modal__image--img"
                  src={images.background || images.poster}
                  alt={fallbackTitle}
                />
                <div className="Modal__image--buttonswrp">
                  <Link href={BASE_URL + '/movies/' + code} >
                    <a className="Modal__image--button"
                      onClick={handlePlayAnimation}>
                      <FaPlay />
                      <span>Play</span>
                    </a>

                  </Link>
                  {!isFavourite ?
                    (
                      <button className='Modal__image--button-circular' onClick={handleAdd}>
                        <FaPlus />
                      </button>
                    ): (
                      <button className='Modal__image--button-circular' onClick={handleRemove}>
                        <FaMinus />
                      </button>
                    )}
                </div>
              </div>
              <motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit" className="Modal__info--wrp">
                <motion.h3 variants={modalFadeInUpVariants} className="Modal__info--title">{fallbackTitle}</motion.h3>
                <motion.p variants={modalFadeInUpVariants} className="Modal__info--description">{description}</motion.p>
                <motion.hr variants={modalFadeInUpVariants} className="Modal__info--line"/>
                <motion.h4 variants={modalFadeInUpVariants} className="Modal__info--otherTitle">Info on <b>{fallbackTitle}</b></motion.h4>
                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                  <span className='Modal__info--row-label'>Genres: </span>
                  <span className="Modal__info--row-description">{joinedGenres}</span>
                </motion.div>
                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                  <span className='Modal__info--row-label'>
                    {year ? 'Release date: ' : 'First air date: '}
                  </span>
                  <span className="Modal__info--row-description">{year}</span>
                </motion.div>
                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                  <span className='Modal__info--row-label'>Average vote: </span>
                  <span className="Modal__info--row-description">{point || 'Not available'}</span>
                </motion.div>

                {originalLanguage ? (
                  <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                    <span className='Modal__info--row-label'>Original language: </span>
                    <span className="Modal__info--row-description">{capitalizeFirstLetter(originalLanguage)}</span>
                  </motion.div>
                ) : null}

                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                  <span className='Modal__info--row-label'>Age classification: </span>
                  <span className="Modal__info--row-description">{maturityRating}</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;
