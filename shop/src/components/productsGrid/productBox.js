import React from "react";
import { Link } from "react-router-dom";

const ProductBox = ({product}) => {
  return (
    <div className="product-box">
      <div className="thumbnail">
        <img src={product.thumbnail} alt="product" />
      </div>
      <div className="content">
        <h4>{product.name}</h4>
        <div className="bottom">
          <h3>{product.price}$</h3>
          <Link className="btn" to={`/${product.slug}`}>
            shop now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
