import React, { useContext, useEffect, useState } from "react";

import Input from "../Shared/Form/Input";
import styled from "styled-components";
import { StoreContext } from "../../store";
import { getGames, searchGames } from "../../store/actions";

const StyledSearch = styled.div<{ showClearButton: boolean }>`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 20px 0;

    span {
        display: ${(props): string => (props.showClearButton ? "inline" : "none")};
        position: absolute;
        right: 8px;
        top: 12px;
        color: ${(props): string => props.theme.colors.text};
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        user-select: none;
        transition: color 0.2s;
    }

    span:hover {
        color: ${(props): string => props.theme.colors.secondary};
    }

    input:focus {
        padding-bottom: 10px;
        margin-bottom: -3px;
    }
`;

const Search: React.FC = (): React.ReactElement => {
    const { dispatch } = useContext(StoreContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTouched, setSearchTouched] = useState(false);

    // Perform search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length > 0) {
                dispatch(searchGames(searchQuery));
            }
        }, 800);

        if (searchTouched && searchQuery.length < 1) {
            dispatch(getGames());
            setSearchTouched(false);
        }

        return (): void => {
            clearTimeout(timer);
        };
    }, [dispatch, searchTouched, searchQuery]);

    // Reset games state when leaving component if a search has been performed
    useEffect(() => {
        return (): void => {
            searchTouched && dispatch(getGames());
        };
    }, [searchTouched, dispatch]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        setSearchQuery(event.target.value);
        setSearchTouched(true);
    };

    return (
        <StyledSearch showClearButton={searchQuery.length > 0}>
            <Input id="search" placeholder="Search..." value={searchQuery} onChange={handleChange} />
            <span onClick={(): void => setSearchQuery("")}>&times;</span>
        </StyledSearch>
    );
};

export default Search;
