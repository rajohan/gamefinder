import React, { createContext, PropsWithChildren } from "react";

import { useImprovedReducer } from "./improvedReducer";
import { StoreApi } from "./types";
import { globalReducer } from "./reducers";
import { initialState } from "./initialState";

const StoreContext = createContext({} as StoreApi);

const StoreProvider: React.FC = (props: PropsWithChildren<{}>): React.ReactElement => {
    const [state, dispatch] = useImprovedReducer(globalReducer, initialState);

    return <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>;
};

export { StoreContext, StoreProvider };
