import React, { useEffect, useState } from 'react';
import './Navbar.css';
import cinebuds from './entbuds.png';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const [nottransparent, letstransp] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

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
            
            <Link to="movies/toprated" style={{textDecoration: "none"}}><span id='top'>Top Rated</span></Link>
            <span onClick={handleDropdown}>Categories</span>
            {showDropdown && (
                                <div className="dropdown-content">
                                    {/* Add dropdown content here */}
                                    <Link to="movies/horror" style={{textDecoration: "none"}}><span>Horror</span></Link>
                                    <Link to="movies/action" style={{textDecoration: "none"}}><span>Action</span></Link>
                                    <Link to="movies/comedy" style={{textDecoration: "none"}}><span>Comedy</span></Link>
                                    <Link to="movies/romance" style={{textDecoration: "none"}}><span>Romance</span></Link>
                                    <Link to="movies/documentary" style={{textDecoration: "none"}}><span>Documentaries</span></Link>
                                </div>
                            )}
            <Link to="movies/search" style={{textDecoration: "none", color: "white"}}><span>Search</span></Link>
            </div>
            </div>
            {isAuthenticated ? (
                <div className='right'>
                    <Button
                    variant='contained'
                    startIcon={<PersonIcon />}
                    style={{
                        background: "red",
                        marginTop: "0.5em",
                    }}
                    onClick={logout}>
                        Logout
                    </Button>
                </div>
            ) : (
             <div className='right'>
                <Button
                variant='contained'
                startIcon={<PersonIcon />}
                style={{
                    background: "red",
                    marginTop: "0.5em",
                }}
                onClick={loginWithRedirect}>
                    Login
                </Button>
             </div>   
            )}
            </div>
        </nav>
      
    </div>
  )
}

export default Navbar
