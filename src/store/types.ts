import { ActionTypes } from "./actions/types";

export type Action = {
    type: ActionTypes;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
};

export type StoreApi = {
    state: AppState;
    dispatch: (action: Action | Function) => void;
};

export type Game = {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    genres: [{ name: string }];
    platforms: [{ platform: { name: string } }];
    description: string;
    website: string;
};

export type AppState = {
    title: string;
    game?: Game;
    games: Game[];
    nextApiPage: string;
    category: string;
    orderBy: string;
    platform: number;
    genre: number;
    searchQuery: string;
    favorites: Game[];
    loading: boolean;
    loadingMoreGames: boolean;
    theme: number;
};

export type Dispatch = (action: Function | Action) => void;
