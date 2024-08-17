// GameItem.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsStar } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { StarRating } from '../common';
import { apiURL } from '../../constants';
import { API_KEY } from '../../api/api_key';
import axios from '../../api/axios';
import { addToCart } from '../../redux/store/cartSlice';

const GameItem = ({ gameItem }) => {
  const [gameItemWithPrice, setGameItemWithPrice] = useState(null);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchGameItem = async (gameId) => {
      try {
        const response = await axios.get(`${apiURL.gamesURL}/${gameId}?${API_KEY}`);

        // Manually add the price property
        const gameItemWithPrice = {
          ...response.data,
          price: (Math.random() * 150 % 100).toFixed(2) // Or dynamically determine the price if you have a logic
        };

        setGameItemWithPrice(gameItemWithPrice);
      } catch (error) {
        console.error('Error fetching game item:', error);
      }
    };

    if (gameItem?.id) {
      fetchGameItem(gameItem.id);
    }
  }, [gameItem]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const url = 'https://game-store-6m01.onrender.com/api/users';
        const userId = localStorage.getItem('id'); // Replace with the logged-in user's ID
        const response = await axios.get(`${url}/${userId}/cart`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  //using the add cartItem
  const handleAddToCart = async () => {
    if (gameItemWithPrice) {
      try {
        const url = 'https://game-store-6m01.onrender.com/api/users';
        const userId = localStorage.getItem('id'); // Replace with the logged-in user's ID
        const response = await axios.put(
          `${url}/${userId}/cart`,
          {
            cartItems: [{ productName: gameItemWithPrice.name, price: gameItemWithPrice.price }]
          }
        );

        // Update the local state and Redux store
        setCartItems(response.data);
        dispatch(addToCart(response.data));
      } catch (error) {
        console.error('Error adding game item to cart:', error);
      }
    }
  };

    // const handleAddToCart = () => {
    //   if (gameItemWithPrice) {
    //     dispatch(addToCart(gameItemWithPrice));
    //   }
    // };

    const isInCart = cartItems.some(item => item.productName === gameItemWithPrice?.name);
    console.log(...cartItems);
    // const isInCart = false;

    return (
      <GameItemWrapper className='card'>
        <div className='card-top img-fit-cover'>
          <img src={gameItem?.background_image} alt={gameItem?.name} />
          <StarRating rating={gameItem?.rating} />
          <div className='ratings-count'>
            {gameItem?.ratings_count} <BsStar className='ms-1' size={12} />
          </div>
        </div>
        <div className='card-bottom'>
          <div className="titleAndPrice">
            <h4 className='text-white text-uppercase card-title'>
              {gameItem?.name}
            </h4>
            <div className="price"><p>$ {gameItemWithPrice?.price}</p></div>
          </div>

          <div className='block-wrap d-flex align-items-end justify-content-between'>
            <div className='details-group'>
              <div className='details-item d-flex align-items-center'>
                <p className='details-item-name fw-6'>Release Date: &nbsp;</p>
                <p className='details-item-value'>{gameItem?.released} </p>
              </div>
              <div className='details-item d-flex align-items-center'>
                <p className='details-item-name fw-6'>Updated: &nbsp;</p>
                <p className='details-item-value'>{gameItem?.updated} </p>
              </div>
            </div>
            <div className="additionalBtns">
              <Link to={`/games/${gameItemWithPrice?.id}`} className='card-button text-uppercase'>see more</Link>
              <button className='AddtoCart' onClick={handleAddToCart}>
                {isInCart ? 'IN CART' : 'ADD TO CART'}
              </button>
            </div>
          </div>
        </div>
      </GameItemWrapper>
    );
  }

  export default GameItem;

  GameItem.propTypes = {
    gameItem: PropTypes.object.isRequired
  };

  const GameItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .price {
    color: white;
  }

  .card-top {
    height: 280px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.27) 92.08%);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }

    .ratings-count {
      position: absolute;
      left: 18px;
      bottom: 10px;
      font-weight: 700;
      font-size: 14px;
      padding: 0px 12px;
      border-radius: 16px;
      background-color: var(--clr-white);
      z-index: 1;
    }
  }

  .card-bottom {
    flex: 1;
    background-color: var(--clr-violet-light);
    padding: 20px 18px;

    .card-title {
      font-size: 18px;
      font-weight: 800px;
      font-family: var(--font-family-poppins)!important;
      letter-spacing: 0.06em;
      margin-bottom: 10px;
    }

    .card-button {
      height: 34px;
      text-align: center;
      border: 1px solid var(--clr-green-normal);
      padding: 0px 16px;
      min-width: 108px;
      color: var(--clr-white);
      font-weight: 600;
      letter-spacing: 0.03em;
      display: flex;
      align-items: center;
      transition: var(--transition-default);

      &:hover {
        background-color: var(--clr-green-normal);
      }
    }
  }

  .details-group {
    padding-top: 12px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
  }

  .AddtoCart {
    margin-top: 10px;
    background-color: white;
    color: var(--clr-green-normal);
    width: 100%;
    height: 26px;
    font-weight: 600;
    border: none;
    border-radius: 5px;

    &:hover {
      background-color: var(--clr-green-normal);
      color: white;
    }
  }
`;
