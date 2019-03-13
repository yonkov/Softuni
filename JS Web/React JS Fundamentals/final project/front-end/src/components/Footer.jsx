import React from 'react'
import FooterWidget from './FooterWidget';
import {NavLink} from 'react-router-dom'

const Footer =(props) =>{

    return(
        <footer className="site-footer">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-4">
              <h3>About Us</h3>
              <p className="mb-4">
                <img src="images/img_1.jpg" alt="placeholder" className="img-fluid" />
              </p>
              <p>Lorem ipsum dolor sit amet sa ksal sk sa, consectetur adipisicing elit. Ipsa harum inventore reiciendis.
              <NavLink to="/about">Read More</NavLink></p>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="row">
                <FooterWidget {...props} formatDate={props.formatDate} />
                <div className="col-md-1" />
                <div className="col-md-4">
                  <div className="mb-5">
                    <h3>Get Social</h3>
                    <ul className="list-unstyled footer-social">
                      <li><a href="/#"><span className="fa fa-twitter" /> Twitter</a></li>
                      <li><a href="/#"><span className="fa fa-facebook" /> Facebook</a></li>
                      <li><a href="/#"><span className="fa fa-instagram" /> Instagram</a></li>
                      <li><a href="/#"><span className="fa fa-vimeo" /> Vimeo</a></li>
                      <li><a href="/#"><span className="fa fa-youtube-play" /> Youtube</a></li>
                      <li><a href="/#"><span className="fa fa-snapchat" /> Snapshot</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="small">
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                © 2019 
                Atanas Yonkov | Template by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
};
export default Footer;