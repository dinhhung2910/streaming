import React from "react";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../utils/motionUtils";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { randomize, truncate } from "../../utils/common";
import SkeletonBanner from "./SkeletonBanner";
import { useDispatch } from "react-redux";
import { showModalDetail } from "../../lib/slices/detailModalSlice";
import Link from "next/link";
import { BASE_URL } from "../../utils/constants";
import MutedLink from "../mutedLink";
import { togglePlayer } from "../../lib/slices/moviePlayerSlice";

const Banner = ({ results, movie, shouldRedirect, style, ...props }) => {
	
	const loading = false;
	const error = null;

	const finalData = movie;
	const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name;
	const description = truncate(finalData?.description, 150);
	const dispatch = useDispatch();

	const handlePlayAnimation = event => {
		event.stopPropagation();
		dispatch(togglePlayer(true));
	};

	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	}

	return (
		<>
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{loading && <SkeletonBanner />}
				{error && <div className="errored">Oops, an error occurred.</div>}
			</motion.section>

			{!loading && finalData && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					style={{
						...style,
						backgroundImage: `url('${finalData.images.background}')`
					}}
				>
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{fallbackTitle}</motion.h1>
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							{
								shouldRedirect ? (
								<Link href={BASE_URL + '/movies/' + finalData.code + '?autoplay=true'} >
								<a className="Banner__button">
									<FaPlay />
									<span>Play</span>
								</a>
							</Link>
								) : (
									<MutedLink href="#" className="Banner__button" onClick={handlePlayAnimation}>
										<FaPlay />
										<span>Play</span>
									</MutedLink>
								)
							}
							
							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">{description}</motion.p>
					</motion.div>
					<div className="Banner__panel" />
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

export default React.memo(Banner);