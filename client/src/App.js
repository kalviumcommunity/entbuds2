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


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route index element = {<Home />}></Route>
        <Route path='movies/toprated' element = {<TopratedList />}></Route>
        <Route path='movies/horror' element = {<HorrorList />}></Route>
        <Route path='movies/action' element = {<ActionList />}></Route>
        <Route path='movies/comedy' element = {<ComedyList />}></Route>
        <Route path='movies/romance' element = {<RomanceList />}></Route>
        <Route path='movies/documentary' element = {<DocumentaryList />}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
