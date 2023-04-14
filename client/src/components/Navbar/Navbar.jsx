import React, { useEffect, useState } from 'react';
import './Navbar.css';
import cinebuds from './entbuds.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [nottransparent, letstransp] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const transparentTransition = () => {
        if(window.scrollY > 140){
            letstransp(true);
        } else{
            letstransp(false) 
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transparentTransition);
        return () => window.removeEventListener("scroll", transparentTransition)
    }, [])

    const handleDropdown = () => {
        setShowDropdown(!showDropdown); // toggle dropdown visibility
    }

  return (
    <div>
        <nav className={`navbar ${nottransparent && "navbarblack"}`}>
            <div className='container'>
                <div className='left'>
            <Link to="/"><img src={cinebuds} className='logo' alt='logo'></img></Link>
            <div className='spans'>
            <span id='pop'>Popular</span>
            <Link to="movies/toprated"><span id='top'>Top Rated</span></Link>
            <span onClick={handleDropdown}>Categories</span>
            {showDropdown && (
                                <div className="dropdown-content">
                                    {/* Add dropdown content here */}
                                    <Link to="movies/horror"><span>Horror</span></Link>
                                    <Link to="movies/action"><span>Action</span></Link>
                                    <Link to="movies/comedy"><span>Comedy</span></Link>
                                    <Link to="movies/romance"><span>Romance</span></Link>
                                    <Link to="movies/documentary"><span>Documentaries</span></Link>
                                </div>
                            )}
            <Link to="movies/search"><span>Search</span></Link>
            </div>
            </div>
            </div>
        </nav>
      
    </div>
  )
}

export default Navbar
