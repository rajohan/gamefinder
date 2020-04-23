import { ActionTypes } from "../actions/types";
import { Action, AppState, Game } from "../types";

export const gameReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionTypes.LOADING_MORE_GAMES:
            return { ...state, loadingMoreGames: action.payload };
        case ActionTypes.SET_NEXT_API_PAGE:
            return { ...state, nextApiPage: action.payload };
        case ActionTypes.SET_CATEGORY:
            return { ...state, category: action.payload };
        case ActionTypes.SET_ORDER_BY:
            return { ...state, orderBy: action.payload };
        case ActionTypes.SET_PLATFORM:
            return { ...state, platform: action.payload };
        case ActionTypes.SET_GENRE:
            return { ...state, genre: action.payload };
        case ActionTypes.GET_GAME:
            return { ...state, game: action.payload };
        case ActionTypes.GET_GAMES: {
            // Remove duplicate games
            const newGameState = action.payload.filter((game: Game, index: number, self: Game[]) => {
                return self.findIndex((result: Game) => result.id === game.id) === index;
            });

            return { ...state, games: newGameState };
        }
        case ActionTypes.GET_MORE_GAMES: {
            // Remove duplicate games
            let newGameState = [...state.games, ...action.payload];
            newGameState = newGameState.filter((game: Game, index: number, self: Game[]) => {
                return self.findIndex((result: Game) => result.id === game.id) === index;
            });

            return { ...state, games: [...newGameState] };
        }
        case ActionTypes.SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload };
        case ActionTypes.SEARCH_GAMES:
            return { ...state, games: action.payload };
        default:
            return state;
    }
};
