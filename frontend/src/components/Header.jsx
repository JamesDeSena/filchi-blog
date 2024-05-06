import React from "react";

const Header = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <header className="page-header container-fluid py-1">
        <div className="header_page_parent">
          <div className="margin_header">
            <h1 className="exhibit-text display-1 animated slideInDown text-uppercase" style={{ fontWeight: 800 }}>Blog</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb headertext text-uppercase animated slideInDown">
                <li style={{ paddingLeft: '5px', paddingRight: '5px' }}><a className="btnHeader1" style={{ textDecoration: 'none' }} href="https://www.filchi-jobfair.com/index.html">Home</a></li>
                <li style={{ paddingLeft: '5px', paddingRight: '5px' }}><a className="btnHeader1" style={{ textDecoration: 'none' }} href="https://www.filchi-jobfair.com/exhibit.html">Exhibit Now</a></li>
                <li style={{ paddingLeft: '5px', paddingRight: '5px' }}><a className="btnHeader1" style={{ textDecoration: 'none' }} href="https://www.filchi-jobfair.com/visit.html">Visit Us</a></li>
                <li style={{ paddingLeft: '5px', paddingRight: '5px' }}><a className="btnHeader1" style={{ textDecoration: 'none' }} href="https://www.filchi-jobfair.com/gallery.html">Gallery</a></li>
                <li style={{ paddingLeft: '5px', paddingRight: '5px' }}><a className="btnHeader1" style={{ textDecoration: 'none' }} href="https://www.filchi-jobfair.com/contact.html">Contact</a></li>
                <li style={{ paddingLeft: '5px', paddingRight: '5px', cursor: 'default' }}><a className="btnHeader1 active" style={{ textDecoration: 'none' }} aria-current="page">Blog</a></li>
              </ol>
            </nav>
          </div>
          <div className="dateSizeHeader me-5">
            <img className="dateSizemain img-fluid animated slideInDown" src="https://i.imgur.com/3rDmqI3.png" alt="" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
