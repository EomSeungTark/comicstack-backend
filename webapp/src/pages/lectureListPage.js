import Header from 'layout/header';
import Footer from 'layout/footer';
import { LectureList } from 'components/lectureList';

function LectureListPage() {

	return (
		<>
			<Header/>
			<div className={"body-layout"}>
				<LectureList/>
			</div>
			<Footer/>
		</>
	)
}

export default LectureListPage;