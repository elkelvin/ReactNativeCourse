import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        ids: []
    },
    reducers: {
        addFavorites: (state, action) => {
            state.ids.push(action.payload.id);
        },
        removeFavorites: (state, action) => {
            state.ids.splice(states.ids.indexOf(action.payload.id));
        }
    }
});
export const removeFavorite = favoriteSlice.actions.removeFavorites;
export const addFavorite = favoriteSlice.actions.addFavorites
export default favoriteSlice.reducer;