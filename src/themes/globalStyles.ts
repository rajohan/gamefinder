import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: ${(props): string => props.theme.font.main};
        text-rendering: optimizeLegibility;
        
        ::selection {
            background-color: ${(props): string => props.theme.colors.secondary};
        }
    }

    body {
        background-color: ${(props): string => props.theme.colors.primary};
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        font-size: ${(props): string => props.theme.font.size};
        font-weight: ${(props): number => props.theme.font.weight};
        
        /*::-webkit-scrollbar {
            width: 14px;
            height: 14px;

            &-track {
                background: ${(props): string => props.theme.colors.secondary};
                border: solid 1px ${(props): string => props.theme.colors.primary};
            }

            &-thumb {
                background: ${(props): string => props.theme.colors.secondaryLight};

                &:hover {
                    background: ${(props): string => props.theme.colors.tertiary};
                }
                &:active {
                    background: ${(props): string => props.theme.colors.secondaryLight};
                }
                &:vertical {
                    border-top: solid 2px ${(props): string => props.theme.colors.primary};
                    border-bottom: solid 2px ${(props): string => props.theme.colors.primary};
                }
                &:horizontal {
                    border-top: solid 2px ${(props): string => props.theme.colors.primary};
                    border-bottom: solid 2px ${(props): string => props.theme.colors.primary};
                }
            }

            &-button {
                border-style: solid;
                height: 16px;
                width: 16px;

                &:vertical {
                    &:decrement {
                        border-width: 0 7px 14px 7px;
                        border-color: transparent transparent ${(props): string =>
                            props.theme.colors.secondaryLight} transparent;

                        &:hover {
                            border-color: transparent transparent ${(props): string =>
                                props.theme.colors.tertiary} transparent;
                        }
                    }

                    &:increment {
                        border-width: 14px 7px 0 7px;
                        border-color: ${(props): string =>
                            props.theme.colors.secondaryLight} transparent transparent transparent;

                        &:hover {
                            border-color: ${(props): string =>
                                props.theme.colors.tertiary} transparent transparent transparent;
                        }
                    }
                }

                &:horizontal {
                    &:decrement {
                        border-width: 7px 14px 7px 0;
                        border-color: transparent ${(props): string =>
                            props.theme.colors.secondaryLight} transparent transparent;

                        &:hover {
                            border-color: transparent ${(props): string =>
                                props.theme.colors.tertiary} transparent transparent;
                        }
                    }
                    &:increment {
                        border-width: 7px 0 7px 14px;
                        border-color: transparent transparent transparent ${(props): string =>
                            props.theme.colors.secondaryLight};

                        &:hover {
                            border-color: transparent transparent transparent ${(props): string =>
                                props.theme.colors.tertiary};
                        }
                    }
                }
            }
        }*/
    }

    #root {
        color: ${(props): string => props.theme.colors.text};
        max-width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    h1 {
        font-size: 20px;
        margin: 10px;
        font-weight: 700;
    }
    
    h2 {
        font-size: 18px;
        font-weight: 400;
        margin: 5px;
    }
    
    input::-ms-clear {
        display: none;
    } 
`;
