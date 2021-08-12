import { Route, Switch } from 'react-router-dom'
import MainPage from './pages/mainPage';
import SeriesPage from './pages/seriesPage';
import RegisterPage from './pages/registerPage';
import './App.scss';
import EpisodePage from './pages/episodePage';
import ViewPage from 'pages/viewPage';
import UploadPage from 'pages/uploadPage';
import LectureListPage from 'pages/lectureListPage';
import RegistEpisode from 'pages/registEpisodePage';


function App() {
  return (
    <div className={"App"}>
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/series" exact component={SeriesPage}/>
        <Route path="/series/episode" exact component={EpisodePage}/>
        <Route path="/series/episode/upload" exact component={RegistEpisode}/>
        <Route path="/series/episode/view" exact component={ViewPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/upload" component={UploadPage}/>
        <Route path="/lecture" component={LectureListPage}/>
      </Switch>
    </div>
  );
}

export default App;
