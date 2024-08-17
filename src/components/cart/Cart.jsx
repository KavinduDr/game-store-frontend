import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../redux/store/cartSlice';
// import { loadStripe } from '@stripe/stripe-js';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from '../../api/axios'; // Import axios or use fetch for API calls
import { apiURL } from '../../constants'; // Import your API URL

import './cart.scss';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('id'); // Replace with dynamic user ID if available
        const url = 'https://game-store-6m01.onrender.com/api/users';
        const response = await axios.get(`${url}/${userId}/cart`);
        setCartItems(response.data);
        dispatch(setCart(response.data)); // Update Redux store if needed
        
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [dispatch]);

  const handleRemoveItem = async (productName) => {
    try {
      // Remove item from local state
      const updatedCart = cartItems.filter(item => item.productName !== productName);
      setCartItems(updatedCart);
      dispatch(setCart(updatedCart)); // Update Redux store if needed

      // Send delete request to backend
      const userId = localStorage.getItem('id'); // Replace with dynamic user ID if available
      const url = 'https://game-store-6m01.onrender.com/api/users';
      await axios.delete(`${url}/${userId}/cart`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          productName
        }
      });

    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  // Handle payment
  // const makePayment = async () => {
  //   const stripe = await loadStripe('pk_test_51PiqoKH3TtyecToHIvopG0oLXyPot4UP5bkJ9si0Q9mL8S4H7aRbyudeW43PzOVY7qTHyYyCAoRGlwlE0jBi336G005MFd7xwm');

  //   const body = {
  //     products: cartItems
  //   };

  //   const headers = {
  //     'Content-Type': 'application/json'
  //   };

  //   try {
  //     const response = await fetch(`${apiURL}/create-checkout-session`, {
  //       method: 'POST',
  //       headers: headers,
  //       body: JSON.stringify(body)
  //     });

  //     const session = await response.json();

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: session.id
  //     });

  //     if (result.error) {
  //       console.log(result.error.message);
  //     }
  //   } catch (error) {
  //     console.error('Error during payment:', error);
  //   }
  // };

  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  return (
    <div className='cart'>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div className='cartItem' key={index}>
            <img src={item.background_image} alt="" />
            <p>{item.productName} - ${item.price}</p>
            <button onClick={() => handleRemoveItem(item.productName)}>Remove</button>
          </div>
        ))
      )}
      <div className="checkoutBar">
        <div className="totalAmount">
          <h2>Total: ${total}</h2>
        </div>
        <button type="button" className='toCheckout'>
          <h4>To Check Out</h4>
          <ArrowForwardIcon sx={{ color: 'white' }} />
        </button>
      </div>
    </div>
  );
};

export default CartPage;
