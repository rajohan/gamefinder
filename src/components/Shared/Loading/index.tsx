import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: 1 / -1;
    justify-self: center;
`;

const LoadingCircle = styled.div`
    width: 30px;
    height: 30px;
    border: 6px solid ${(props): string => props.theme.colors.secondaryLight};
    border-top: 6px solid ${(props): string => props.theme.colors.secondary};
    border-radius: 100px;
    margin: 10px;
    animation: load 1s linear infinite;

    @keyframes load {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoadingDots = styled.div`
    span {
        span {
            animation: dot-1 1s infinite steps(1);

            & + span {
                animation-name: dot-2;

                & + span {
                    animation-name: dot-3;
                }
            }
        }
    }

    @keyframes dot-1 {
        from {
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
    }
    @keyframes dot-2 {
        from {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    @keyframes dot-3 {
        from {
            opacity: 0;
        }
        75% {
            opacity: 1;
        }
    }
`;

type Props = {
    text?: string;
};

const Loading: React.FC<Props> = ({ text }: PropsWithChildren<Props>): React.ReactElement => {
    return (
        <StyledLoading>
            <LoadingCircle />
            <LoadingDots>
                <span>
                    {text || "Loading"}
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </LoadingDots>
        </StyledLoading>
    );
};

export default Loading;
