import { useState } from 'react';
import queryString from 'query-string'

import Header from '../layout/header';
import Footer from '../layout/footer';
import {EpisodeHeader} from '../components/episodeHeader';
import {EpisodeList} from '../components/episodeList';

function EpisodePage() {

	const [toonId, setToonId] = useState(queryString.parse(window.location.search).toonId || "");
  const [episodeName, setEpisodeName] = useState(queryString.parse(window.location.search).name || "");

	return (
		<>
			<Header/>
			<div className={"body-layout"}>
				<EpisodeHeader toonId={toonId} episodeName={episodeName}/>
				<EpisodeList toonId={toonId} episodeName={episodeName}/>
			</div>
			<Footer/>
		</>
	)
}

export default EpisodePage;