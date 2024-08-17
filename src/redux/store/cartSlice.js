import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
