import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { StoreContext } from "../../store";
import Card from "../Shared/Card";
import Loading from "../Shared/Loading";
import { setTitle } from "../../store/actions";

const MarginTop = styled.div`
    margin-top: 10px;
`;

const StyledFavorites = styled.div`
    display: grid;
    width: 100%;
    margin: 15px 0;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
    justify-content: center;
`;

const StyledNoFavorites = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: ${(props): string => props.theme.colors.text};
        text-decoration: none;
        font-weight: bold;
        margin-top: 20px;

        &:hover {
            color: ${(props): string => props.theme.colors.secondary};
        }
    }
`;

const Favorites: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useContext(StoreContext);

    useEffect(() => {
        dispatch(setTitle("Favorites"));
    }, [dispatch]);

    const renderGames = (): React.ReactNode => {
        return state.favorites.map(game => <Card key={`gameId-${game.id}`} game={game} animate={true} />);
    };

    return (
        <React.Fragment>
            <h1>Your Favorites</h1>
            {!state.loading && state.favorites.length < 1 ? (
                <StyledNoFavorites>
                    <MarginTop>You do not have any favorites yet.</MarginTop>
                    <Link className="noFavorites" to="/">
                        Go back to the home page
                    </Link>
                </StyledNoFavorites>
            ) : state.loading ? (
                <MarginTop>
                    <Loading />
                </MarginTop>
            ) : (
                <StyledFavorites>{renderGames()}</StyledFavorites>
            )}
        </React.Fragment>
    );
};

export default Favorites;
