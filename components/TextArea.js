import React from 'react';
import styled from "styled-components";


const Styled = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border:1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
`;
const TextArea = (props) => {
    return (
        <Styled {...props}>

        </Styled>
    );
};

export default TextArea;