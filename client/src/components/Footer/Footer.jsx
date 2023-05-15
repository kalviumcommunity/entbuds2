import React from 'react';
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    

    return (
        <div className='footer'>
            <div className='contacts'>
                <h3 style={{
                    color: "white"
                }}>Connect with me</h3>
                <div className='icons'>
                    <div>
                        <a href='https://www.instagram.com/saarthaksrivastavaa/'>
                            <InstagramIcon style={{ color: "red" }} fontSize='medium' />
                        </a>
                    </div>
                    <div>
                        <a href='https://pin.it/6ukx4mU'>
                            <PinterestIcon style={{ color: "red" }} />
                        </a>
                    </div>
                    <div>
                        <a href='https://www.linkedin.com/in/sarthak-srivastava-6a82aa250/'>
                            <LinkedInIcon style={{ color: "red" }} />
                        </a>
                    </div>
                </div>
            </div>
      <div>
        <h3>
            Donate for this website
        </h3>
      </div>
        </div>
    )
}

export default Footer
