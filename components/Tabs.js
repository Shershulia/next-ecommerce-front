import React from 'react';
import styled from "styled-components";
import {act} from "react-dom/test-utils";

const StyledTabs = styled.div`
  display: flex;
  gap:20px;
  margin-bottom: 20px;
  span{
    font-size: 1.5rem;
  }
`

const StyledTab = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  ${props => props.active === 1 ? `color:black; border-bottom:2px solid black;` : `color:#999;`}
`;
const Tabs = ({tabs,active, onChange}) => {
    return (
        <StyledTabs>
            {tabs.map((tab)=>(
                <StyledTab key={tab} active={tab ===active ? 1 : 0}
                onClick={()=>{onChange(tab)}}>{tab}</StyledTab>
            ))}
        </StyledTabs>
    );
};

export default Tabs;