import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledNavigation = styled.nav<{ expanded: boolean }>`
    user-select: none;

    .navOpenClose {
        cursor: pointer;
        display: none;
        align-items: center;
        margin: 0 20px 0 10px;
        width: 30px;
        height: 30px;
        outline: none;

        &:hover {
            span::before {
                top: ${(props): string => (!props.expanded ? "-9px;" : "0")};
            }

            span::after {
                top: ${(props): string => (!props.expanded ? "9px;" : "0")};
            }
        }

        @media only screen and (max-width: 600px) {
            display: flex;
        }

        span,
        span::before,
        span::after {
            display: inline-block;
            width: 30px;
            height: 2px;
        }

        span {
            position: relative;
            background-color: ${(props): string => (props.expanded ? "transparent" : props.theme.colors.text)};

            &::before,
            &::after {
                content: "";
                position: absolute;
                transition: transform 0.3s linear;
                background-color: ${(props): string => props.theme.colors.text};
            }

            &::before {
                transform: rotate(${(props): number => (props.expanded ? 135 : 0)}deg);
                top: ${(props): number => (props.expanded ? 0 : -8)}px;
            }

            &::after {
                transform: rotate(${(props): number => (props.expanded ? -135 : 0)}deg);
                top: ${(props): number => (props.expanded ? 0 : 8)}px;
            }
        }
    }
    ul {
        display: flex;
        margin: 0 0 0 10px;
        padding: 0;
        list-style: none;
        background-color: ${(props): string => props.theme.colors.secondary};

        @media only screen and (max-width: 600px) {
            visibility: ${(props): string => (props.expanded ? "visible" : "hidden")};
            transition: visibility 0.3s linear;
            flex-direction: column;
            position: absolute;
            width: 100%;
            top: 100%;
            right: 0;
            background-color: ${(props): string => props.theme.colors.secondaryLight};
            border: 3px solid ${(props): string => props.theme.colors.secondary};
            border-top: 0;
        }

        a {
            display: block;
            padding: 15px 20px;
            color: ${(props): string => props.theme.colors.link};
            transition: background-color 0.3s;
            text-decoration: none;

            @media only screen and (max-width: 600px) {
                padding: ${(props): string => (props.expanded ? "15px 20px" : "0 20px")};
                line-height: ${(props): string | number => (props.expanded ? "" : 0)};
                color: ${(props): string => (props.expanded ? props.theme.colors.link : "transparent")};
                transition: padding 0.3s, line-height 0.3s, color 0.2s, background-color 0.3s;
                transition-timing-function: linear;
            }

            &:hover,
            &.active {
                background-color: ${(props): string => props.theme.colors.tertiary};
            }
        }
    }

    li {
        padding: 0 2px;

        &:last-of-type {
            padding-right: 0;
        }

        @media only screen and (max-width: 600px) {
            padding: ${(props): string => (props.expanded ? "2px 0" : "0")};
            transition: padding 0.3s linear;

            &:first-of-type {
                padding-top: 0;
            }
            &:last-of-type {
                padding-bottom: 0;
            }
        }
    }
`;

const Navigation: React.FC = (): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const handleMouseDownOutsideComponent = (event: MouseEvent): void => {
        if (navRef.current) {
            !navRef.current.contains(event.target as Node) && setExpanded(false);
        }
    };

    // Close navigation menu on mouse click outside the component
    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDownOutsideComponent);

        return (): void => {
            document.removeEventListener("mousedown", handleMouseDownOutsideComponent);
        };
    }, []);

    return (
        <StyledNavigation expanded={expanded} ref={navRef}>
            <div
                className="navOpenClose"
                onClick={(): void => setExpanded(!expanded)}
                role="button"
                aria-label="Main menu"
                aria-expanded={expanded}
                tabIndex={0}
            >
                <span />
            </div>
            <ul onClick={(): void => setExpanded(false)}>
                <li>
                    <NavLink to="/" exact activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorites" activeClassName="active">
                        Favorites
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeClassName="active">
                        Contact
                    </NavLink>
                </li>
            </ul>
        </StyledNavigation>
    );
};

export default Navigation;
