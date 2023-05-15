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
import FilmPage from './components/FilmPage/FilmPage';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";


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
        <Route path='movies/search' element = {<SearchPage />}></Route>
        <Route path='movies/toprated' element = {<TopratedList />}></Route>
        <Route path='movies/horror' element = {<HorrorList />}></Route>
        <Route path='movies/action' element = {<ActionList />}></Route>
        <Route path='movies/comedy' element = {<ComedyList />}></Route>
        <Route path='movies/romance' element = {<RomanceList />}></Route>
        <Route path='movies/documentary' element = {<DocumentaryList />}></Route>
      </Routes>
      <Footer />
      </Router>
}
    </div>
  );
}

export default App;
