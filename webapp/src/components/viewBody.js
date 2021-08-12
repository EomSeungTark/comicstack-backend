import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { 
	getEpisodeImage, 
	useStateEpisodeImage, 
	useDispatchEpisodeImage
} from 'contextAPI/episodeImg';

const Body= styled.div`
	width: 100%;
	height: 100%;
	padding-top: ${props => props.viewHeaderUI ? "4.375rem" : "0"};
	/* background-color: brown; */
`;

const BodyWrapper= styled.div`
	width: 100%;
	height: 100%;
	/* background-color: brown; */
	@media(min-width: 720px){
		width: 45rem;
		margin: 0 auto;
	}
	>img {
		width: 100%;
	}
`;

export const ViewBody = (props) => {

	const { viewHeaderUI, setViewHeaderUI, toonId, name } = props;
	const episodeImageState = useStateEpisodeImage();
	const episodeImageDispatch = useDispatchEpisodeImage();

	const [scrollY, setScrollY] = useState(0);

	function logit() {
		setScrollY(window.pageYOffset);
		if(window.pageYOffset === 0){
			setViewHeaderUI(true)
		} else {
			setViewHeaderUI(false);
		}
	}

	useEffect(() => {
		function watchScroll() {
			window.addEventListener("scroll", logit);
		}
		watchScroll();
		return () => {
			window.removeEventListener("scroll", logit);
		};
	});

	useEffect(() => {
		getEpisodeImage(episodeImageDispatch, toonId, name);
	},[toonId, name])

	return (
			<Body 
				onClick={() => setViewHeaderUI(!viewHeaderUI)}
				viewHeaderUI={viewHeaderUI}
			>
				<BodyWrapper>
				{
					episodeImageState.entity.toon_context &&
					episodeImageState.entity.toon_context.map((item) => (
						<img src={item} alt={""} key={item}/>
					))
				}
				</BodyWrapper>
			</Body>
	)
}
