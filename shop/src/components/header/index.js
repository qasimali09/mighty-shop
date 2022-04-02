/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../../images/logo.png";
import { CgMenuGridO, CgSearch } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CART, LOGOUT } from "../../store/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showCart = () => {
    dispatch({ type: TOGGLE_CART, payload: true });
  };
  const { isAuth } = useSelector((e) => e.AuthReducer);
  const { categories, cart } = useSelector((e) => e.DataReducer);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    if (search.length > 0) {
      e.target.search.value = "";
      navigate(`/search/${search}`);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="left-side">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="cateories-dropdown">
            <button>
              <CgMenuGridO className="icon" />
              categories
            </button>
            <ul className="dropdown-menu">
              {
                categories.map((category) => (
                  <li key={category._id}>
                    <Link to={`/category/${category.slug}`}>{category.name}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search..."
          />
          <button>
            <CgSearch className="icon" />
          </button>
        </form>
        <div className="right-side">
          <button onClick={showCart} className="cart-btn">
            <BsCart3 className="icon" /> <span>{cart.length || 0}</span>
          </button>
          {isAuth ? (
            <button className="user-dropdown">
              <FaUserCircle className="icon" />
              <ul className="menu">
                <li>
                  <Link to="/profile">profile</Link>
                </li>
                <li>
                  <Link onClick={logout} to="#">
                    logout
                  </Link>
                </li>
              </ul>
            </button>
          ) : (
            <Link className="btn" to="/login">
              login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
