import React, { PropsWithChildren } from "react";
import styled from "styled-components";

type Props = {
    htmlFor: string;
};

const StyledLabel = styled.label`
    font-size: 16px;
    margin-left: 3px;
`;

const Label: React.FC<Props> = ({ htmlFor, children }: PropsWithChildren<Props>): React.ReactElement => {
    return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
