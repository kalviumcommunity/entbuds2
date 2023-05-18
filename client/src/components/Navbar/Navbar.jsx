import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import cinebuds from './entbuds.png';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const [nottransparent, letstransp] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const dropdownRef = useRef(null);

    

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

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [dropdownRef]);


  return (
    <div style={{height:"12vh", marginBottom:"2vh", position:"fixed", zIndex:"1010"}}>
        <nav className={`navbar ${nottransparent && "navbarblack"}`} style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center"}}>
            <div className='left' style={{display:"flex", flexDirection:"row", width:"90%" }}>
                <Link style={{width:"15%"}} to="/"><img src={cinebuds} style={{width:"100%"}} className='logo' alt='logo'></img></Link>
                <div className='spans' style={{width:"85%", display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
                    <Link to="movies/toprated" style={{textDecoration: "none", color:"white"}}><span id='top'>Top Rated</span></Link>
                    <span onClick={handleDropdown} style={{color:"white"}}>Categories</span>
                    {showDropdown && (
                        <div className="dropdown-content" ref={dropdownRef} style={{position:"absolute", top:"11.5vh", display:"flex", width:"60vw", justifyContent:"space-evenly"}}>
                            <Link to="movies/horror" style={{textDecoration: "none", color:"red"}}><span>Horror</span></Link>
                            <Link to="movies/action" style={{textDecoration: "none", color:"red"}}><span>Action</span></Link>
                            <Link to="movies/comedy" style={{textDecoration: "none", color:"red"}}><span>Comedy</span></Link>
                            <Link to="movies/romance" style={{textDecoration: "none", color:"red"}}><span>Romance</span></Link>
                            <Link to="movies/documentary" style={{textDecoration: "none", color:"red"}}><span>Documentaries</span></Link>
                            <Link to="movies/scifi" style={{textDecoration: "none", color:"red"}}><span>Sci-Fi</span></Link>
                        </div>
                    )}
                    <Link to="userList" style={{textDecoration: "none", color: "white"}}><span>My List</span></Link>
                    <Link to="tvhome" style={{textDecoration: "none", color: "white"}}><span>TV Shows</span></Link> 
                </div>
            </div>
            {isAuthenticated ? (
                <div className='right'>
                    <Button variant='contained' startIcon={<PersonIcon />} style={{background: "red"}}onClick={logout}>Logout</Button>
                </div>
            ) : (
            <div className='right'>
                <Button variant='contained' startIcon={<PersonIcon />} style={{background: "red"}} onClick={loginWithRedirect}>Login</Button>
            </div>   
            )}
        </nav>
      
    </div>
  )
}

export default Navbar
