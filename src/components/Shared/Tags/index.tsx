import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import Tag from "./Tag";

const StyledTags = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
`;

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags: any[];
    tagKeys: string[];
};

const Tags: React.FC<Props> = ({ tags, tagKeys }: PropsWithChildren<Props>): React.ReactElement => {
    const renderTags = (): React.ReactNode => {
        return tags.map(tag => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let key: any = "";

            // Loop through tagKeys in the tags array to extract the tag
            for (let i = 0; i < tagKeys.length; i++) {
                key = i === 0 ? tag[tagKeys[i]] : key[tagKeys[i]];
            }

            return <Tag key={`tag-${key}`} tag={key} />;
        });
    };

    return <StyledTags>{renderTags()}</StyledTags>;
};

export default Tags;
