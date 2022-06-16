import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import { useStoreContext } from '../utils/GlobalState';

import Cart from '../components/Cart';

import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const [currentProduct, setCurrentProduct] = useState({});
  const { products, cart } = state;
  // const products = data?.products || [];

  const addToCart = () => {
    // dispatch({
    //   type: ADD_TO_CART,
    //   product: { ...currentProduct, purchaseQuantity: 1 },
    // });
    const itemInCart = cart.find(cartItem => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });
  };

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [products, data, dispatch, id]);

  // To answer the first question, the useEffect() Hook here has to check for a couple of things. It first checks to see if there's data in our global state's products array. If there is, we use it to figure out which product is the current one that we want to display. It does this finding the one with the matching _id value that we grabbed from the useParams() Hook. But what happens if we don't have any products in our global state object? What happens if someone just sent you this product's URL and this is the first time you've loaded this application?

  // If that's the case, then you wouldn't have any products saved in global state just yet. The useEffect() Hook is set up so that if we don't, we'll use the product data that we returned from the useQuery() Hook to set the product data to the global state object. When that's complete, we run through this all over again. But this time, there is data in the products array, and then we run setCurrentProduct() to display a single product's data.

  // This is why there are so many items in the second argument of the useEffect() Hook. The Hook's functionality is dependent on them to work and only runs when it detects that they've changed in value! This is known as the dependency array.
  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
