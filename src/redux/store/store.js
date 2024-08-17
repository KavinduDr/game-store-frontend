import { configureStore } from "@reduxjs/toolkit";
import genreReducer from "./genreSlice";
import gameReducer from "./gameSlice";
import sidebarReducer from "./sidebarSlice";
import storeReducer from "./storeSlice";
import creatorReducer from "./creatorSlice";
import cartReducer from './cartSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        genre: genreReducer,
        game: gameReducer,
        sidebar: sidebarReducer,
        store: storeReducer,
        creator: creatorReducer,
        cart: cartReducer,
        user: userReducer
    }
});

export default store;