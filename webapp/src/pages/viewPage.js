import { useState } from 'react';
import styled from "styled-components";
import { ViewHeader } from "components/viewHeader";
import { ViewBody } from 'components/viewBody';
import queryString from "query-string";

function ViewPage() {

	// const toonId = queryString.parse(location.search).toonId;
	const [toonId, setToonId] = useState(queryString.parse(window.location.search).toonId);
	const [name, setName] = useState(queryString.parse(window.location.search).name);
	const [headerUI, setHeaderUI] = useState(true)

	return (
		<>
			<ViewHeader toonId={toonId} name={name} viewHeaderUI={headerUI}/>
			<ViewBody 
				viewHeaderUI={headerUI} 
				setViewHeaderUI={setHeaderUI}
				toonId={toonId}
				name={name}
			/>
		</>
	)
}

export default ViewPage;