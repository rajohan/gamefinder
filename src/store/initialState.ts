import { AppState } from "./types";
import { DARK_THEME, GAME_API_URL, PAGE_SIZE } from "../constants";

export const initialState: AppState = {
    loading: true,
    title: "Game Finder",
    nextApiPage: `${GAME_API_URL}?${PAGE_SIZE}`,
    category: "all",
    orderBy: "-relevance",
    platform: 0,
    genre: 0,
    searchQuery: "",
    favorites: [],
    games: [],
    loadingMoreGames: false,
    theme: DARK_THEME
};
