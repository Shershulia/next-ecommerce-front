import React from 'react';
import Link from "next/link";
import styled from "styled-components";
import {buttonStyle} from "@/components/PrimaryBtn";
const StyledLink = styled(Link)`
${buttonStyle};
  text-decoration: none;
  
`
const ButtonLink = (props) => {
    return (
        <StyledLink {...props}>
            
        </StyledLink>
    );
};

export default ButtonLink;