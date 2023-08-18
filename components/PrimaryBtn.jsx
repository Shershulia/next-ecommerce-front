import React from 'react';
import styled, {css} from "styled-components";
import {primary} from "@/lib/colors";

export const buttonStyle = css`
    border:0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    
    display: flex;
    align-items: center;
  justify-content: center;
  
    svg{
      height: 16px;
      margin-right: 5px;
    }

  ${props => props.primary && !props.outline &&  css`
    background-color: ${primary};
    border: 2px solid #FFF;
    color:#FFF;
  `}
  ${props => props.primary && props.outline &&  css`
    background-color: transparent;
    border: 2px solid ${primary};
    color:${primary};
  `}
  ${props => props.black && !props.outline &&  css`
    background-color: #000;
    color:#FFF;
  `}
  ${props => props.black && props.outline &&  css`
    background-color: transparent;
    border: 2px solid #000;
    color:#000;
  `}
  
  
  

  ${props => props.white && !props.outline && css`
    background-color: #fff;
    padding: 6px 10px;
    border: 6px solid white;
    color:#000;
    flex: 1;
  `}

  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
  
  ${props => props.noBorder && css`
    border-width: 0px;
    font-weight: 600;
  `}

  ${props => props.white && props.outline && css`
    background-color: transparent;
    
    color:#fff;
    border: 2px solid white;
  `}
  
  
  ${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }`}`;

const Styled = styled.button`
      ${buttonStyle};
`
const PrimaryBtn = ({children,...rest}) => {
    return (
        <Styled {...rest}>
            {children}
        </Styled>
    );
};

export default PrimaryBtn;