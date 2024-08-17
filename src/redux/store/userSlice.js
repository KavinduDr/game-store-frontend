// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '', // Ensure this is populated correctly when the user logs in
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.name = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUserName = (state) => state.user.name;
export default userSlice.reducer;
