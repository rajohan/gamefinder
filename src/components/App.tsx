import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";

import { StoreContext } from "../store";
import { GlobalStyles, darkTheme, lightTheme } from "../themes";
import { getGames, getTheme, loadFavorites } from "../store/actions";
import Header from "./Shared/Header";
import Footer from "./Shared/Footer";
import Home from "./Home";
import Details from "./Details";
import Contact from "./Contact";
import Favorites from "./Favorites";
import { LIGHT_THEME } from "../constants";

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 20px;
    max-width: 1285px;
    width: 100%;
`;

const App: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useContext(StoreContext);

    useEffect(() => {
        dispatch(getTheme());
        dispatch(getGames());
        dispatch(loadFavorites());
    }, [dispatch]);

    return (
        <React.Fragment>
            <ThemeProvider theme={state.theme === LIGHT_THEME ? lightTheme : darkTheme}>
                <GlobalStyles />
                <Helmet>
                    <meta name="description" content="Discover new games with Game Finder" />
                    <title>{state.title}</title>
                </Helmet>
                <Header />
                <Container>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/favorites">
                            <Favorites />
                        </Route>
                        <Route path="/game/:id">
                            <Details />
                        </Route>
                    </Switch>
                </Container>
                <Footer />
            </ThemeProvider>
        </React.Fragment>
    );
};

export default App;
