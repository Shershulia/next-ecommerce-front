import React from 'react';
import {HashLoader} from "react-spinners";
import styled from "styled-components";
const Wrapper = styled.div`
    ${props=>props.$fullwidth === 1 ? `
    display:flex;
    justify-content:center` 
            : 
            `` }
`;
const Spinner = ({fullwidth}) => {
    return (
        <Wrapper $fullwidth={fullwidth}>
            <HashLoader speedMultiplier={3} color={'#555'}/>
        </Wrapper>
    );
};

export default Spinner;