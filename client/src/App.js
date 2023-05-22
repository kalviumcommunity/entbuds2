import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import HorrorList from './components/Lists/HorrorList';
import ActionList from './components/Lists/ActionList';
import ComedyList from './components/Lists/ComedyList';
import RomanceList from './components/Lists/RomanceList';
import DocumentaryList from './components/Lists/DocumentaryList'
import TopratedList from './components/Lists/TopratedList';
import SearchPage from './components/Navbar/SearchPage';
import FilmPage from './components/FilmPage/Main/FilmPage'
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import PrivacyPolicy from './components/Footer/Privacy Policy/PrivacyPolicy';
import Terms from './components/Footer/T&C/T&C';
import ListPage from './components/FilmPage/UserPage/ListPage';
import TVHome from './components/TVHome/TVHome';
import TVpage from './components/FilmPage/TVPage/TVpage';
import ScifiList from './components/Lists/ScifiList';
import Book from './components/Book';


function App() {

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    },4000);
  }, [])

  return (
    <div className="App">
      {
        loader ?
        <ScaleLoader 
        size={30}
        color='red'
        style={{
          marginTop: '7em'
        }}
        />
        :
      
      <Router>
      <Navbar />
      <Routes>
        <Route index element = {<Home />}></Route>
        <Route path='movie/:id' element = {<FilmPage />}></Route>
        <Route path='series/:id' element = {<TVpage />}></Route>
        <Route path='movies/search' element = {<SearchPage />}></Route>
        <Route path='movies/toprated' element = {<TopratedList />}></Route>
        <Route path='movies/horror' element = {<HorrorList />}></Route>
        <Route path='movies/action' element = {<ActionList />}></Route>
        <Route path='movies/comedy' element = {<ComedyList />}></Route>
        <Route path='movies/romance' element = {<RomanceList />}></Route>
        <Route path='movies/documentary' element = {<DocumentaryList />}></Route>
        <Route path='movies/scifi' element = {<ScifiList />}></Route>
        <Route path='userList' element = {<ListPage />}></Route>
        <Route path='tvhome' element = {<TVHome />}></Route>
        <Route path='privacy' element = {<PrivacyPolicy />}></Route>
        <Route path='T&C' element = {<Terms />}></Route>
        <Route path='booking' element = {<Book />}></Route>
      </Routes>
      {/* <Footer /> */}
      </Router>
}
    </div>
  );
}

export default App;
