import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        font: {
            main: string;
            size: string;
            weight: number;
        };
        colors: {
            primary: string;
            secondary: string;
            secondaryLight: string;
            tertiary: string;
            error: string;
            success: string;
            text: string;
            link: string;
            linkHover: string;
            like: string;
            white: string;
            black: string;
        };
    }
}