import Header from 'layout/header';
import Footer from 'layout/footer';
import { RegistEpisode } from 'components/registEpisode';

function RegistEpisodePage() {

	return (
		<>
			<Header/>
			<div className={"body-layout"}>
				<RegistEpisode/>
			</div>
			<Footer/>
		</>
	)
}

export default RegistEpisodePage;