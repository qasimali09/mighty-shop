import React from 'react';
import { FaShippingFast } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

const ShopDetail = () => {
  return (
    <div className='shop-detail'>
      <div className="container">
        <div className="shop-detail-wraapper">
          <div className="detail-box">
            <FaShippingFast className='icon' />
            <div className="info">
              <h6>Free Shipping</h6>
              <p>On all orders over $75.00</p>
            </div>
          </div>
          <div className="detail-box">
            <GiWorld className='icon' />
            <div className="info">
              <h6>Free Returns</h6>
              <p>Returns are free within 9 days</p>
            </div>
          </div>
          <div className="detail-box">
            <RiSecurePaymentFill className='icon' />
            <div className="info">
              <h6>100% Payment Secure</h6>
              <p>Your payment are safe with us.</p>
            </div>
          </div>
          <div className="detail-box">
            <BiSupport className='icon' />
            <div className="info">
              <h6>Support 24/7</h6>
              <p>Contact us 24 hours a day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopDetail