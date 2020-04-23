import { ActionTypes } from "../actions/types";
import { Action, AppState } from "../types";

export const favoritesReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionTypes.LOAD_FAVORITES:
            return { ...state, favorites: action.payload };
        case ActionTypes.LIKE_GAME:
            return { ...state, favorites: [...state.favorites, action.payload] };
        case ActionTypes.DISLIKE_GAME:
            return { ...state, favorites: state.favorites.filter(game => game.id !== action.payload) };
        default:
            return state;
    }
};
