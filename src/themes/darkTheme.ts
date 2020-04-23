import { DefaultTheme } from "styled-components";
import { defaults } from "./defaults";

export const darkTheme: DefaultTheme = {
    ...defaults,
    colors: {
        ...defaults.colors,
        primary: "#262626",
        secondary: "#000000",
        secondaryLight: "#141414",
        tertiary: "#555555",
        text: "#ffffff",
        link: "#ffffff",
        linkHover: "#555555"
    }
};
