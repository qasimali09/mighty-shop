import React from 'react';
import paymentMethods from '../../images/payment.webp';
import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="container">
        <div className="top">
          <div className="payment-methods">
            <h4>Payment:</h4>
            <img src={paymentMethods} alt="payment methods" />
          </div>
          <div className="social">
            <h4>Follow Us:</h4>
            <ul className="social-links">
              <li><a className='fb' href="/" target='_blank'><GrFacebookOption /></a></li>
              <li><a className='insta' href="/" target='_blank'><GrInstagram /></a></li>
              <li><a className='twitter' href="/" target='_blank'><GrTwitter /></a></li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <p>Copyright © <Link to="/">Mighty Shop</Link>. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer