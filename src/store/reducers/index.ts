import { combineReducers } from "../combineReducers";
import { favoritesReducer } from "./favoritesReducer";
import { gameReducer } from "./gameReducer";
import { pageReducer } from "./pageReducer";

export const globalReducer = combineReducers([favoritesReducer, gameReducer, pageReducer]);
