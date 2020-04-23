import { Action } from "../types";
import { ActionTypes } from "./types";
import { DARK_THEME, THEME_LOCAL_STORAGE } from "../../constants";

export const setLoading = (isLoading: boolean): Action => {
    return {
        type: ActionTypes.SET_LOADING,
        payload: isLoading
    };
};

export const setTitle = (page: string): Action => {
    return { type: ActionTypes.SET_TITLE, payload: page };
};

export const getTheme = (): Action => {
    const theme = localStorage.getItem(THEME_LOCAL_STORAGE);

    if (theme) {
        return { type: ActionTypes.SET_THEME, payload: JSON.parse(theme) };
    }

    return { type: ActionTypes.SET_THEME, payload: DARK_THEME };
};

export const setTheme = (theme: number): Action => {
    localStorage.setItem(THEME_LOCAL_STORAGE, JSON.stringify(theme));
    return { type: ActionTypes.SET_THEME, payload: theme };
};
