import React, {useEffect, useState} from 'react';
import GallerySlider from '../components/sliders/gallerySlider';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { SET_CART } from '../store/constants';

const Single = () => {
  const { products } = useSelector((state) => state.DataReducer);
  const navigate = useNavigate();
  const [product, setproduct] = useState({});
  const { id } = useParams();
  const [count, setcount] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    const product = products.find((product) => product.slug === id || product._id === id);
    if(!product) {
      navigate('/');
    }
    setproduct(product);
  }, [id, products, navigate]);

  const increment = () => {
    setcount(count + 1);
  }

  const decrement = () => {
    if(count > 0) {
      setcount(count - 1);
    }
  }

  const addToCart = () => {

    if(product.quantity < count && product.quantity !== null) {
      toast.error(`Sorry, we don't have enough quantity for ${product.name}`);
      return;
    }

    if(count === 0) {
      toast.error(`Please select quantity`);
      return;
    }

    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

    if(!cartProducts) {
      cartProducts = [];
    }

    //check if product already in cart
    const productInCart = cartProducts.find((p) => p._id === product._id);
    let newCartproduct;

    //update quantity
    if(productInCart) {
      productInCart.count = count + productInCart.count;
    } else {
      newCartproduct = {
        _id: product._id,
        name: product.name,
        price: product.price,
        count: count,
        thumbnail: product.thumbnail
      }
      cartProducts.push(newCartproduct);
    }

    dispatch({type: SET_CART, payload: cartProducts});
    setcount(0);
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    toast.success('Product added to cart successfully');
  }
  return (
    <div className='single-product'>
      <div className='container'>
        <div className="single-wrapper">
          <div className="gallery-side">
            <GallerySlider gallery={product?.gallery || []} />
          </div>
          <div className="detail-side">
            <p className="sku">SKU: <span>{product?.sku || 'null'}</span></p>
            <p className="category">Category: <Link to={`/category/${product?.category?.value}`}>{product?.category?.label}</Link></p>
            <h2 className='name'>{product?.name}</h2>
            <h2 className='price'>$ {product?.price}</h2>
            <hr />
            <p className='desc'>{product?.shortDesc}</p>
            <p className="stock">available stock: <span>{product?.quantity || 'unlimeted'}</span></p>
            <div className="product-counter">
              <span onClick={decrement} className='remove'><IoIosRemove /></span>
              <span className="value">{count}</span>
              <span onClick={increment} className='add'><IoIosAdd /></span>
            </div>
            <button onClick={addToCart} className='btn'>add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single