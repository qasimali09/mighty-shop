/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_CART } from "../store/constants";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";
import ShopingDetail from '../components/shopDetail';

const Checkout = () => {
  const dispatch = useDispatch();
  const naviagete = useNavigate();
  const { isAuth } = useSelector((e) => e.AuthReducer);
  useEffect(() => {
    if (!isAuth) {
      toast.error("Please login to place order");
      naviagete('/login');
    }
  }, [isAuth, naviagete]);
  const [loading, setLoading] = useState(false);
  const [shiping, setShiping] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "",
  });
  const [cartProducts, setcartProducts] = useState([]);
  const { cart } = useSelector((e) => e.DataReducer);

  useEffect(() => {
    setcartProducts(cart);
  }, [cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (cart.length < 1) {
      toast.error("Your cart is empty");
      return;
    }

    const order = {
      products: cartProducts,
      address: {
        fname: shiping.fname,
        lname: shiping.lname,
        email: shiping.email,
        phone: shiping.phone,
        address: shiping.address,
        city: shiping.city,
        state: shiping.state,
        zip: shiping.zip,
      },
      paymentMethod: shiping.paymentMethod,
      amount: cartProducts.reduce(
        (total, product) => total + product.price * product.count,
        0
      ),
    };
    try {
      const response = await axios.post("/api/orders", order);
      toast.success("Order Placed Successfully");
      dispatch({ type: SET_CART, payload: [] });
      localStorage.setItem("cartProducts", JSON.stringify([]));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if(error.response) {
        toast.error(error.response?.data.message);
        console.log(error.response?.data);
        return;
      }
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="checkout">
      <Helmet>
        <title>Checkout - Mighty Shop</title>
      </Helmet>
      <div className="container">
        <form onSubmit={handleSubmit} className="shipping-address-form">
          <div className="left-side">
            <h2>Billing Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  value={shiping.fname}
                  onChange={(e) =>
                    setShiping({ ...shiping, fname: e.target.value })
                  }
                  type="text"
                  id="firstName"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  value={shiping.lname}
                  onChange={(e) =>
                    setShiping({ ...shiping, lname: e.target.value })
                  }
                  type="text"
                  id="lastName"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={shiping.email}
                onChange={(e) =>
                  setShiping({ ...shiping, email: e.target.value })
                }
                type="email"
                id="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={shiping.phone}
                onChange={(e) =>
                  setShiping({ ...shiping, phone: e.target.value })
                }
                type="number"
                id="phone"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                value={shiping.address}
                onChange={(e) =>
                  setShiping({ ...shiping, address: e.target.value })
                }
                type="text"
                id="address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                value={shiping.city}
                onChange={(e) =>
                  setShiping({ ...shiping, city: e.target.value })
                }
                type="text"
                id="city"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                value={shiping.state}
                onChange={(e) =>
                  setShiping({ ...shiping, state: e.target.value })
                }
                type="text"
                id="state"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip</label>
              <input
                value={shiping.zip}
                onChange={(e) =>
                  setShiping({ ...shiping, zip: e.target.value })
                }
                type="number"
                id="zip"
                required
              />
            </div>
          </div>
          <div className="right-side">
            <h2>Your Order</h2>
            <table className="products-table">
              <tbody>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
                {cartProducts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>{item.price * item.count}$</td>
                  </tr>
                ))}
                <tr>
                  <th>Order Total</th>
                  <th>
                    {cartProducts.reduce(
                      (total, product) => total + product.count,
                      0
                    )}
                  </th>
                  <th>
                    {cartProducts.reduce(
                      (total, product) => total + product.count * product.price,
                      0
                    )}
                    $
                  </th>
                </tr>
              </tbody>
            </table>
            <div className="payment-methods">
              <div className="form-radio">
                <input
                  type="radio"
                  id="payment-method-1"
                  name="payment-method"
                  value="cod"
                  required
                  onChange={(e) =>
                    setShiping({ ...shiping, paymentMethod: e.target.value })
                  }
                />
                <label htmlFor="payment-method-1">cash on delivery</label>
              </div>
              <p>Pay with cash upon delivery.</p>
            </div>
            {loading ? (
              <button disabled className="btn order-place-btn">
                <Loader />
              </button>
            ) : (
              <button className="btn order-place-btn">PLACE ORDER</button>
            )}
          </div>
        </form>
        <ShopingDetail />
      </div>
    </div>
  );
};

export default Checkout;
