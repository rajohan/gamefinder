import axios from "axios";

import { GAME_API_URL, PAGE_SIZE } from "../../constants";
import { ActionTypes } from "./types";
import { AppState } from "../types";
import { setLoading } from "./index";

export const getGame = (gameId: number): ((dispatch: Function) => Promise<void>) => {
    return async (dispatch: Function): Promise<void> => {
        dispatch(setLoading(true));

        try {
            const { data } = await axios.get(`${GAME_API_URL}/${gameId}`);
            dispatch({ type: ActionTypes.GET_GAME, payload: data });
        } catch (e) {
            if (e.response.data.detail === "Not found.") {
                return;
            }

            return console.error(e);
        }

        dispatch(setLoading(false));
    };
};

export const getGames = (): ((dispatch: Function, getState: () => AppState) => Promise<void>) => {
    return async (dispatch: Function, getState: () => AppState): Promise<void> => {
        dispatch(setLoading(true));
        dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: "" });

        const state = getState();
        const category = state.category === "all" ? "" : `/lists/${state.category}`;
        const orderBy = `&ordering=${state.orderBy}`;
        const platform = state.platform !== 0 ? `&parent_platforms=${state.platform}` : "";
        const genre = state.genre !== 0 ? `&genres=${state.genre}` : "";

        const { data } = await axios.get(`${GAME_API_URL}${category}?${PAGE_SIZE}${orderBy}${platform}${genre}`);

        dispatch({ type: ActionTypes.SET_NEXT_API_PAGE, payload: data.next });
        dispatch({ type: ActionTypes.GET_GAMES, payload: data.results });

        dispatch(setLoading(false));
    };
};

export const LoadMoreGames = (): ((dispatch: Function, getState: () => AppState) => Promise<void>) => {
    return async (dispatch: Function, getState: () => AppState): Promise<void> => {
        const state = getState();
        if (!state.loadingMoreGames && state.nextApiPage) {
            dispatch({ type: ActionTypes.LOADING_MORE_GAMES, payload: true });
            const { data } = await axios.get(state.nextApiPage);
            dispatch({ type: ActionTypes.SET_NEXT_API_PAGE, payload: data.next });
            dispatch({ type: ActionTypes.GET_MORE_GAMES, payload: data.results });
            dispatch({ type: ActionTypes.LOADING_MORE_GAMES, payload: false });
        }
    };
};

export const searchGames = (query: string): ((dispatch: Function, getState: () => AppState) => Promise<void>) => {
    return async (dispatch: Function, getState: () => AppState): Promise<void> => {
        dispatch(setLoading(true));
        dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: query });

        const state = getState();
        const orderBy = `&ordering=${state.orderBy}`;
        const platform = state.platform !== 0 ? `&parent_platforms=${state.platform}` : "";
        const genre = state.genre !== 0 ? `&genres=${state.genre}` : "";

        const { data } = await axios.get(`${GAME_API_URL}?search=${query}&${PAGE_SIZE}${orderBy}${platform}${genre}`);
        dispatch({ type: ActionTypes.SET_NEXT_API_PAGE, payload: data.next });
        dispatch({ type: ActionTypes.SEARCH_GAMES, payload: data.results });

        dispatch(setLoading(false));
    };
};

export const setCategory = (category: string): ((dispatch: Function, getState: () => AppState) => Promise<void>) => {
    return async (dispatch: Function, getState: () => AppState): Promise<void> => {
        const state = getState();

        if (state.category === category) {
            return;
        }

        await dispatch({ type: ActionTypes.SET_CATEGORY, payload: category });

        state.searchQuery.length < 1 ? dispatch(getGames()) : dispatch(searchGames(state.searchQuery));
    };
};

export const setOrderBy = (orderBy: string): ((dispatch: Function, getState: () => AppState) => Promise<void>) => {
    return async (dispatch: Function, getState: () => AppState): Promise<void> => {
        const state = getState();

        if (state.orderBy === orderBy) {
            return;
        }

        await dispatch({ type: ActionTypes.SET_ORDER_BY, payload: orderBy });

        state.searchQuery.length < 1 ? dispatch(getGames()) : dispatch(searchGames(state.searchQuery));
    };
};

export const setPlatform = (platform: number): ((dispatch: Function, getState: () => AppState) => Promise<void>) => {
    return async (dispatch: Function, getState: () => AppState): Promise<void> => {
        const state = getState();

        if (state.platform === platform) {
            return;
        }

        await dispatch({ type: ActionTypes.SET_PLATFORM, payload: platform });

        state.searchQuery.length < 1 ? dispatch(getGames()) : dispatch(searchGames(state.searchQuery));
    };
};

export const setGenre = (genre: number): ((dispatch: Function, getState: () => AppState) => Promise<void>) => {
    return async (dispatch: Function, getState: () => AppState): Promise<void> => {
        const state = getState();

        if (state.genre === genre) {
            return;
        }

        await dispatch({ type: ActionTypes.SET_GENRE, payload: genre });

        state.searchQuery.length < 1 ? dispatch(getGames()) : dispatch(searchGames(state.searchQuery));
    };
};
