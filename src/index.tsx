import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { StoreProvider } from "./store";
import App from "./components/App";

const Root: React.FC = (): React.ReactElement => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById("root"));
