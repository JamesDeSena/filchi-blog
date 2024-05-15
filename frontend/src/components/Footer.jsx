import React from "react";
import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import FooterLogo from '../assets/footer_logo.png';
import PDMNLogo from '../assets/pdmn_logo_white.png';
import BossJob from '../assets/bossjob_logo.png'

import { Favicon } from 'react-favicon'

const Footer = () => {
  return (
    <div className="footer wow fadeIn" data-wow-delay="0.1s" style={{ fontFamily: 'Poppins, sans-serif', backgroundImage: 'linear-gradient(to bottom,#012b5d, #0a1729)' }}>
      <br />
      <br />
      <div className="row" style={{ marginRight: '10px' }}>
        <div className="col-lg-5 col-md-6" style={{ marginTop: '20px' }}>
          <span><a className="botlogo  d-flex align-items-center text-center" href="index.html"><img src={FooterLogo} alt="Footer Logo" /></a></span>
        </div>
        <div className="col-lg-3 col-md-6" style={{ color: '#ffffff', marginLeft: '2%', marginTop: '20px' }}>
            <h5 className="mb-4" style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight: "bold" }}>Quick Links</h5>
            <a className="btn btn-link" style={{ color: '#ffffff' }} href="https://www.filchi-jobfair.com/index.html">Home</a>
            <a className="btn btn-link" style={{ color: '#ffffff' }} href="https://www.filchi-jobfair.com/exhibit.html">Exhibit Now</a>
            <a className="btn btn-link" style={{ color: '#ffffff' }} href="https://www.filchi-jobfair.com/visit.html">Visit Us</a>
            <a className="btn btn-link" style={{ color: '#ffffff' }} href="https://www.filchi-jobfair.com/gallery.html">Gallery</a>
            <a className="btn btn-link" style={{ color: '#ffffff' }} href="https://www.filchi-jobfair.com/contact.html">Contact Us</a>
            <a className="btn btn-link" style={{ color: '#ffffff' }} target="_blank" href="https://filchi-jobfair.netlify.app/">Blog</a>
        </div>
        <div className="col-lg-3 col-md-6" style={{ marginLeft: '2%', marginTop: '20px' }}>
          <h5 className="mb-4" style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight:"bold" }}>Contact us!</h5>
          <a href="https://goo.gl/maps/VHg1t4Kerzx7NYrx9" className="footer-link" style={{ textDecoration: "none" }}>
            <p className="mb-2" style={{ color: 'whitesmoke' }}>
              <i className="fa fa-map-marker-alt me-3" style={{ color: 'whitesmoke' }}></i>
              5/F, Salustiana D. Ty Tower,<br />
              &nbsp; &nbsp; &nbsp; &nbsp;104 Paseo De Roxas Avenue,<br />
              &nbsp; &nbsp; &nbsp; &nbsp;Makati City 1229, Philippines
            </p>
          </a>
          <a href="tel:+639666376696" style={{ textDecoration: "none" }}>
            <p className="mb-2" style={{ color: '#ffffff' }}><i className="fa fa-phone me-3" style={{ color: '#ffffff' }}></i>+63 966 637 6696</p>
          </a>
          <a href="mailto:filchijobfair@flw.ph" style={{ textDecoration: "none" }}>
            <p className="mb-2" style={{ color: '#ffffff'}}><i className="fa fa-envelope me-3" style={{ color: '#ffffff' }}></i>filchijobfair@flw.ph</p>
          </a>
          <div className="d-flex pt-2">
            <a className="btn btn-outline-light btn-social" style={{ color: '#ffffff' }} href="https://www.facebook.com/filchijobfair?mibextid=ZbWKwL"><i className="fab fa-facebook-f"></i></a>
            <a className="btn btn-outline-light btn-social" style={{ color: '#ffffff' }} href="https://www.youtube.com/playlist?list=PLIKNmEeC3y6So3zvSMO5aRM_AZunmYuP_"><i className="fab fa-youtube-play"></i></a>
            <a className="btn btn-outline-light btn-social" style={{ color: '#ffffff' }} href="https://www.linkedin.com/company/filchijobfair/"><i className="fab fa-linkedin-in"></i></a>
            <a className="btn btn-outline-light btn-social" style={{ color: '#ffffff' }} href="https://www.instagram.com/filchijobfair/"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div>
        <div className="copyright" style={{ marginRight: '12px' }}>
          <div className="row" style={{ color: '#ffff' }}>
            <div className="col-lg-5 col-md-6 mb-3 mb-md-0" style={{ textAlign: 'start', margin: '2% 0' }}>
              <a style={{ color: '#ffffff' }}>All Rights Reserved &#169; 2023 <br className="d-md-none" /> Philippine Dragon Media Network Corp.</a>
            </div>
            <br className="d-md-none" />
            <br className="d-md-none" />
            <div className="col-lg-2 col-md-6  text-md-start mb-3 mb-md-0" style={{ marginLeft: '-10px' }}>
              <a href="https://www.flw.ph/"><img className="img-fluid flex-shrink-0 rounded" src={PDMNLogo} alt="PDMN Logo" style={{ width: '180px', height: '60px' }} /></a>
            </div>
            <div className="col-lg-2 col-md-6 text-md-start mt-2 mb-3 mb-md-0">
              <a href="https://bossjob.ph/"><img className="mx-auto flex-shrink-0 rounded" src={BossJob} alt="Bossjob Logo" style={{ width: '180px', height: 'auto' }} /></a>
            </div>
            <div className="col-lg-2 col-md-6 ">
              <br /><a style={{ color: '#ffffff', textDecoration: "none" }} href="privacy.html">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
      <link href="img/favicon.ico" rel="icon" />
    </div>
  );
};

export default Footer;
