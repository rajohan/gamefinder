import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledImageNotAvailable = styled.div<{ height: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props): string => props.theme.colors.secondary};
    width: 100%;
    height: ${(props): number => props.height}px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
`;

type Props = {
    height?: number;
};

const ImageNotAvailable: React.FC<Props> = ({ height = 200 }: PropsWithChildren<Props>): React.ReactElement => {
    return <StyledImageNotAvailable height={height}>Image not available</StyledImageNotAvailable>;
};

export default ImageNotAvailable;
