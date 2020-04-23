import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledBreadcrumb = styled.div<{ width: number }>`
    font-size: 12px;
    margin: 0 0 20px 10px;
    max-width: ${(props): number => props.width}px;
    width: 100%;
    text-transform: uppercase;

    span {
        margin: 0 8px;
    }

    a {
        color: ${(props): string => props.theme.colors.text};
        text-decoration: none;

        &:hover {
            color: ${(props): string => props.theme.colors.secondary};
        }
    }
`;

type Props = {
    append?: string;
    width: number;
    paths: { to: string; text: string }[];
};

const Breadcrumb: React.FC<Props> = ({ paths, append, width }: PropsWithChildren<Props>): React.ReactElement => {
    const renderBreadcrumb = (): React.ReactNode => {
        return paths.map((path, index) => {
            return index === 0 ? (
                <Link to={path.to} key={`path-${index}`}>
                    {path.text}
                </Link>
            ) : (
                <React.Fragment>
                    <span>&#x27A4;</span>
                    <Link to={path.to} key={`path-${index}`}>
                        {path.text}
                    </Link>
                </React.Fragment>
            );
        });
    };

    return (
        <StyledBreadcrumb width={width}>
            <div>
                {renderBreadcrumb()}
                {append && (
                    <React.Fragment>
                        <span>&#x27A4;</span>
                        {append}
                    </React.Fragment>
                )}
            </div>
        </StyledBreadcrumb>
    );
};

export default Breadcrumb;
