import axios from "axios";

import { Action, AppState } from "../types";
import { FAVORITES_LOCAL_STORAGE, GAME_API_URL } from "../../constants";
import { ActionTypes } from "./types";

export const loadFavorites = (): Action => {
    const favorites = localStorage.getItem(FAVORITES_LOCAL_STORAGE);

    if (favorites) {
        return { type: ActionTypes.LOAD_FAVORITES, payload: JSON.parse(favorites) };
    }

    return { type: ActionTypes.LOAD_FAVORITES, payload: [] };
};

export const updateFavorites = (gameId: number): ((dispatch: Function, getState: () => AppState) => Promise<void>) => {
    return async (dispatch: Function, getState: () => AppState): Promise<void> => {
        const state = getState();

        if (state.favorites.filter(game => gameId === game.id).length > 0) {
            localStorage.setItem(
                FAVORITES_LOCAL_STORAGE,
                JSON.stringify(state.favorites.filter(game => game.id !== gameId))
            );

            dispatch({ type: ActionTypes.DISLIKE_GAME, payload: gameId });
        } else {
            let game = state.games.filter(game => game.id === gameId)[0];

            if (!game) {
                const { data } = await axios.get(`${GAME_API_URL}/${gameId}`);
                game = data;
            }

            localStorage.setItem(FAVORITES_LOCAL_STORAGE, JSON.stringify([...state.favorites, game]));

            dispatch({ type: ActionTypes.LIKE_GAME, payload: game });
        }
    };
};
