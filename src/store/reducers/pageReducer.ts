import { ActionTypes } from "../actions/types";
import { Action, AppState } from "../types";

export const pageReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        case ActionTypes.SET_TITLE:
            return { ...state, title: `Game Finder - ${action.payload}` };
        case ActionTypes.SET_THEME:
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};
