import React, { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import Rate from "rc-rate";
import Img from "react-image";
import styled from "styled-components";

import "../../../assets/rc-rate/rc-rate.css";
import { Game } from "../../../store/types";
import Button from "../Form/Button";
import Like from "../Like";
import Loading from "../Loading";
import ImageNotAvailable from "../ImageNotAvailable";

const StyledCard = styled.div<{ show: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props): string => props.theme.colors.tertiary};
    padding-bottom: 10px;
    border-radius: 3px;
    transition: opacity 700ms 0s;
    opacity: ${(props): number => (props.show ? 1 : 0)};

    h1 {
        font-size: 16px;
        padding: 20px 10px 20px 0;
        margin: 0 3px;
        width: 90%;

        a {
            color: ${(props): string => props.theme.colors.link};
            text-decoration: none;
            display: inline-block;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:hover {
                color: ${(props): string => props.theme.colors.secondary};
            }
        }
    }

    .cardImage {
        color: ${(props): string => props.theme.colors.link};
        text-decoration: none;
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            opacity: 0.7;
            transition: opacity 0.5s;
        }

        img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            object-position: top;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }
    }

    .cardHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        max-width: 90%;
        border-bottom: 1px solid ${(props): string => props.theme.colors.primary};
    }

    .cardDetails {
        display: flex;
        flex-direction: column;
        width: 90%;
        font-size: 13px;
        flex: 1;
        padding: 0 0 10px 0;
        margin-bottom: 10px;

        &__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid ${(props): string => props.theme.colors.primary};
            padding: 10px 2px;
        }
    }
`;

const StyledRate = styled(Rate)`
    &.rc-rate {
        font-size: 20px;
    }

    li {
        margin-right: 2px;
        color: #000;
        cursor: default;
    }

    li div {
        outline: none;
    }
`;

type Props = {
    game: Game;
    animate?: boolean;
};

const Card: React.FC<Props> = ({ game, animate }: PropsWithChildren<Props>): React.ReactElement => {
    const [render, setRender] = useState(true);

    const rating = parseInt((game.rating * 2).toFixed()) / 2;

    const date = new Date(game.released).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
        day: "numeric"
    });

    const handleLikeClick = (): void => {
        if (animate) {
            setRender(false);
        }
    };

    return (
        <StyledCard show={render}>
            <Link to={`game/${game.id}`} className="cardImage">
                <Img
                    src={game.background_image}
                    loader={<Loading text="Loading image" />}
                    unloader={<ImageNotAvailable />}
                    decode={false}
                />
            </Link>
            <div className="cardHeader">
                <h1>
                    <Link title={game.name} to={`game/${game.id}`}>
                        {game.name}
                    </Link>
                </h1>
                <Like animate={animate} animationDuration={700} onClick={handleLikeClick} gameId={game.id} />
            </div>
            <div className="cardDetails">
                <div className="cardDetails__item">
                    <div>Release Date:</div>
                    <div>{date}</div>
                </div>
                <div className="cardDetails__item">
                    <div>Rating:</div>
                    <StyledRate defaultValue={rating} value={rating} allowHalf={true} disabled={true} />
                </div>
            </div>
            <Button link={`game/${game.id}`}>See More</Button>
        </StyledCard>
    );
};

export default Card;
