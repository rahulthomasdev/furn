'use client'
import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isGuest: true,
        profile: null,
        cart: [],
        wishlist: [],
        addresses: [],
    },
    reducers: {
        setGuest: (state, action) => {
            state.isGuest = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        clearProfile: (state) => {
            state.profile = null;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = null;
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        clearWishlist: (state) => {
            state.wishlist = null;
        },
        setAddresses: (state, action) => {
            state.addresses = action.payload;
        }
    },
})

export const { clearWishlist, setGuest, setProfile, clearProfile, setCart, clearCart, setWishlist, setAddresses } = accountSlice.actions

export default accountSlice.reducer