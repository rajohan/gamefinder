import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import {
    WindowScroller,
    AutoSizer,
    Grid,
    GridCellProps,
    AutoSizerProps,
    Size,
    WindowScrollerProps,
    WindowScrollerChildProps
} from "react-virtualized";

import { StoreContext } from "../../store";
import { category, sortBy, platform, genres } from "./dropdownOptions";
import Card from "../Shared/Card";
import Search from "../Search";
import Loading from "../Shared/Loading";
import { LoadMoreGames, setCategory, setGenre, setOrderBy, setPlatform, setTitle } from "../../store/actions";
import Dropdown from "../Shared/Form/Dropdown";

const StyledHome = styled.div`
    display: block;
    width: 100%;
    min-width: 330px;

    .cardPadding {
        padding: 7.5px;
    }

    .alignAutoSizer {
        display: flex;
        width: calc(100% + 15px) !important; // +15px to account for the 7.5px padding on each card side
        margin-left: -7.5px; // Readjust to account for card padding
        justify-content: center;
    }

    .grid {
        display: flex;
        justify-content: center;
        outline: none;
    }
`;

const DropdownWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

const Home: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useContext(StoreContext);

    useEffect(() => {
        dispatch(setTitle("Home"));
    }, [dispatch]);

    const renderGames = ({ columnIndex, rowIndex, style }: GridCellProps, columnCount: number): React.ReactNode => {
        const index = columnIndex + rowIndex * columnCount;

        if (state.games[index]) {
            return (
                <div key={`gameId-${state.games[index].id}`} className="cardPadding" style={style}>
                    <Card game={state.games[index]} />
                </div>
            );
        }

        return <div key={`${columnIndex}-${rowIndex}`} className="cardPadding" style={style} />;
    };

    const onOptionChange = (option: string | number, type: "category" | "orderBy" | "platform" | "genre"): void => {
        if (type === "category" && typeof option === "string") {
            dispatch(setCategory(option));
        } else if (type === "orderBy" && typeof option === "string") {
            dispatch(setOrderBy(option));
        } else if (type === "platform" && typeof option === "number") {
            dispatch(setPlatform(option));
        } else if (type === "genre" && typeof option === "number") {
            dispatch(setGenre(option));
        }
    };

    return (
        <React.Fragment>
            <h1>Discover New Games</h1>
            <Search />
            <DropdownWrapper>
                <Dropdown
                    onChange={(option): void => onOptionChange(option, "category")}
                    label="Category"
                    options={category}
                    active={state.category}
                    disabled={state.searchQuery.length > 0 && 'Category is always "All games" while searching.'}
                />
                <Dropdown
                    onChange={(option): void => onOptionChange(option, "orderBy")}
                    label="Order by"
                    options={sortBy}
                    active={state.orderBy}
                />
                <Dropdown
                    onChange={(option): void => onOptionChange(option, "platform")}
                    label="Platforms"
                    options={platform}
                    active={state.platform}
                />
                <Dropdown
                    onChange={(option): void => onOptionChange(option, "genre")}
                    label="Genre"
                    options={genres}
                    active={state.genre}
                    disabled={
                        state.category !== "all" &&
                        state.searchQuery.length < 1 &&
                        'Filtering by genre is only available on category "All games".'
                    }
                />
            </DropdownWrapper>
            {!state.loading && state.games.length < 1 ? (
                "Sorry, we could not find any games matching your search terms."
            ) : state.loading ? (
                <Loading />
            ) : (
                <StyledHome>
                    <WindowScroller>
                        {({
                            height,
                            isScrolling,
                            onChildScroll,
                            scrollTop
                        }: WindowScrollerChildProps): React.ReactElement<WindowScrollerProps> => (
                            <InfiniteScroll
                                loadMore={(): void | boolean => scrollTop > 0 && dispatch(LoadMoreGames())}
                                hasMore={!!state.nextApiPage}
                                loader={<Loading key="loading" text="Loading more games" />}
                            >
                                <AutoSizer disableHeight className="alignAutoSizer">
                                    {({ width }: Size): React.ReactElement<AutoSizerProps> => {
                                        const cardPadding = 15; // 7.5px on each side of the card
                                        const cardWidth = 300 + cardPadding;
                                        const cardHeight = 458;
                                        const columnCount = Math.floor((width + cardPadding) / cardWidth);
                                        const rowCount = Math.ceil(state.games.length / columnCount);
                                        const totalWidth = width && width + cardPadding;

                                        return (
                                            <Grid
                                                autoHeight
                                                height={height}
                                                rowCount={rowCount}
                                                rowHeight={cardHeight}
                                                width={totalWidth}
                                                columnCount={columnCount}
                                                columnWidth={cardWidth}
                                                cellRenderer={(props: GridCellProps): React.ReactNode =>
                                                    renderGames(props, columnCount)
                                                }
                                                isScrolling={isScrolling}
                                                onScroll={onChildScroll}
                                                scrollTop={scrollTop}
                                                className="grid"
                                                overscanRowCount={4}
                                            />
                                        );
                                    }}
                                </AutoSizer>
                            </InfiniteScroll>
                        )}
                    </WindowScroller>
                </StyledHome>
            )}
        </React.Fragment>
    );
};

export default Home;
