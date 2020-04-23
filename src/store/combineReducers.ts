import { Action, AppState } from "./types";
import { Reducer } from "react";

const combineReducers = (reducers: Reducer<AppState, Action>[]): ((state: AppState, action: Action) => AppState) => {
    return (state: AppState, action: Action): AppState => {
        reducers.forEach((reducer: Reducer<AppState, Action>) => {
            const newState: AppState = reducer(state, action);
            state = state === newState ? state : { ...newState };
        });

        return state;
    };
};

export { combineReducers };
