import React, { useState, KeyboardEvent, createRef, useEffect, useRef, RefObject, PropsWithChildren } from "react";
import styled from "styled-components";

const StyledDropdown = styled.div<{ expanded: boolean; disabled: boolean | string }>`
    display: inline-block;
    position: relative;
    margin: 5px;
    opacity: ${(props): number => (!props.disabled ? 1 : 0.5)};

    button {
        display: flex;
        align-items: center;
        background-color: ${(props): string => props.theme.colors.secondary};
        color: ${(props): string => props.theme.colors.text};
        user-select: none;
        padding: 12px 15px;
        border-radius: 3px;
        border: 1px solid ${(props): string => props.theme.colors.secondary};
        cursor: pointer;
        outline: none;
        font-size: 14px;
        pointer-events: ${(props): string => (!props.disabled ? "auto" : "none")};

        &:hover {
            background-color: ${(props): string => props.theme.colors.secondaryLight};
            transition: background-color 0.3s;
        }

        &:focus {
            background-color: ${(props): string =>
                !props.expanded ? props.theme.colors.secondaryLight : props.theme.colors.secondary};
        }

        #listboxLabel {
            display: flex;
            align-items: center;

            span {
                margin-left: 5px;
                font-weight: 700;
            }

            .danger svg {
                display: block;
                fill: #fff;
                width: 15px;
                height: 15px;
                margin-left: 10px;
            }
        }

        .listboxArrow {
            svg {
                margin-left: 15px;
                display: block;
                fill: ${(props): string => (!props.disabled ? props.theme.colors.text : "#ffc107")};
                height: ${(props): string => (!props.disabled ? "10" : "15")}px;
                width: ${(props): string => (!props.disabled ? "10" : "15")}px;
                transform: ${(props): string => (!props.disabled ? "rotate(180deg)" : "")};
            }
        }
    }

    ul {
        position: absolute;
        width: 100%;
        top: 41px;
        z-index: 100;
        margin: 0;
        padding: 0;
        list-style: none;
        outline: none;
        user-select: none;
        background-color: ${(props): string => props.theme.colors.secondaryLight};
        display: ${(props): string => (props.expanded ? "block" : "none")};
        border: 1px solid ${(props): string => props.theme.colors.secondary};
        border-top: none;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;

        li {
            padding: 10px;
            cursor: pointer;
            font-size: 13px;
            outline: none;
            display: flex;
            align-items: center;
            white-space: nowrap;

            &:hover,
            &:focus {
                background-color: ${(props): string => props.theme.colors.tertiary};
            }

            span {
                display: block;
                width: 100%;
                color: ${(props): string => props.theme.colors.success};
                text-align: right;
                font-size: 18px;
                opacity: 0.7;
            }
        }
    }
`;

type Props = {
    options: { value: number | string; text: string }[];
    label: string;
    onChange: (option: number | string) => void;
    active: string | number;
    disabled?: boolean | string;
};

const Dropdown: React.FC<Props> = ({
    options,
    label,
    onChange,
    active,
    disabled = false
}: PropsWithChildren<Props>): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(options.filter(option => option.value === active)[0]);
    const dropdownWrapperRef = useRef<HTMLDivElement>(null);
    const refs = useRef<RefObject<HTMLLIElement>[]>([]);

    // Create refs
    useEffect(() => {
        for (let i = 0; i < options.length; i++) {
            refs.current = [...refs.current, createRef()];
        }
    }, [options.length]);

    const handleMouseDownOutsideComponent = (event: MouseEvent): void => {
        if (dropdownWrapperRef.current) {
            !dropdownWrapperRef.current.contains(event.target as Node) && setExpanded(false);
        }
    };

    // Close dropdown on mouse click outside the component
    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDownOutsideComponent);

        return (): void => {
            document.removeEventListener("mousedown", handleMouseDownOutsideComponent);
        };
    }, []);

    const findElm = (value: string, direction: "up" | "down"): HTMLLIElement | null | false => {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                if (direction === "down" && refs.current[i + 1]) {
                    return refs.current[i + 1].current;
                } else if (direction === "up" && refs.current[i - 1]) {
                    return refs.current[i - 1].current;
                }
            }
        }

        return false;
    };

    const onOptionClick = (option: { value: string | number; text: string }): void => {
        onChange(option.value);
        setSelected(option);
        setExpanded(false);
    };

    const handleKeyDownOptions = (event: KeyboardEvent<HTMLLIElement>): void => {
        const { key } = event;
        const value = event.currentTarget.getAttribute("value");

        switch (key) {
            case "Enter":
                onOptionClick(options.filter(option => option.value === value)[0]);
                break;
            case "Escape":
                setExpanded(false);
                break;
            case "ArrowDown":
            case "Tab": {
                event.preventDefault();
                const elm = value && findElm(value, "down");
                elm && elm.focus();
                break;
            }
            case "ArrowUp": {
                event.preventDefault();
                const elm = value && findElm(value, "up");
                elm && elm.focus();
                break;
            }
            default:
                break;
        }
    };

    const handleKeyDownLabel = (event: KeyboardEvent<HTMLButtonElement>): void => {
        const { key } = event;

        switch (key) {
            case "Escape": {
                setExpanded(false);
                break;
            }
            case "ArrowDown": {
                event.preventDefault();
                if (!expanded) {
                    setExpanded(true);
                } else {
                    const elm = refs.current[0].current;
                    elm && elm.focus();
                }
                break;
            }
            default:
                break;
        }
    };

    const renderOptions = (): React.ReactNode => {
        return options.map((option, index) => (
            <li
                key={`option-${option.value}`}
                role="option"
                aria-selected={option.value === selected.value}
                value={option.value}
                tabIndex={0}
                ref={refs.current[index]}
                onClick={(): void => onOptionClick(option)}
                onKeyDown={handleKeyDownOptions}
            >
                {option.text}
                {option.value === selected.value && <span>&#9679;</span>}
            </li>
        ));
    };

    return (
        <StyledDropdown
            expanded={expanded}
            disabled={disabled}
            ref={dropdownWrapperRef}
            title={typeof disabled === "string" ? disabled : ""}
        >
            <button
                aria-haspopup="listbox"
                tabIndex={0}
                onKeyDown={handleKeyDownLabel}
                onClick={(): void => setExpanded(!expanded)}
            >
                <span id="listboxLabel">
                    {label}: <span>{selected.text}</span>
                </span>
                <span className="listboxArrow">
                    {!disabled ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z" />
                        </svg>
                    )}
                </span>
            </button>
            <ul role="listbox" aria-labelledby="listboxLabel">
                {renderOptions()}
            </ul>
        </StyledDropdown>
    );
};

export default Dropdown;
