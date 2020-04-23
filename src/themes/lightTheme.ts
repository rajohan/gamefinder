import { DefaultTheme } from "styled-components";
import { defaults } from "./defaults";

export const lightTheme: DefaultTheme = {
    ...defaults,
    colors: {
        ...defaults.colors,
        primary: "#a6a6a6",
        secondary: "#7f7f7f",
        secondaryLight: "#bbbbbb",
        tertiary: "#f2f2f2",
        text: "#0f0f0f",
        link: "#0f0f0f",
        linkHover: "#555555"
    }
};
