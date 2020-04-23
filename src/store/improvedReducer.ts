import { Reducer, useCallback, useReducer, useRef } from "react";

import { Action, AppState, Dispatch } from "./types";

const useImprovedReducer = (reducer: Reducer<AppState, Action>, initialState: AppState): [AppState, Dispatch] => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const prevState = useRef({});

    const improvedDispatch: Dispatch = useCallback((action: Action | Function) => {
        if (typeof action === "function") {
            return action(improvedDispatch, () => prevState.current);
        }

        dispatch(action);
    }, []);

    prevState.current = state;

    return [state, improvedDispatch];
};

export { useImprovedReducer };
