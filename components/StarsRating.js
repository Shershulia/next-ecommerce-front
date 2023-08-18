import React, {useState} from 'react';
import {StarOutlineIcon, StarSolidIcon} from "@/components/index";
import styled from "styled-components";
import {primary} from "@/lib/colors";

const StarWrapper = styled.button`

  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color:${primary};
  ${props => props.size === 'md' && `
    height: 1.4rem;
    width: 1.4rem;
  `}

  ${props => props.size === 'sm' && `
       height: 1rem;
       width: 1rem;
  `}
  ${props => !props.disabled && `
         cursor: pointer;

  `}
  

`
const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  height: 1.4rem;
  align-items: center;
`
const StarsRating = ({defaultHowMany=0,
                         onChange=()=>{},
                         disabled=false,
                         size='md'}) => {
    const [howMany, setHowMany] = useState(defaultHowMany);
    const five = [1,2,3,4,5];
    function handleStarClick(n){
        if(disabled){
            return;
        }
        setHowMany(n)
        onChange(n);
    }
    return (
        <StarsWrapper>
            {five.map(n=>(
                <div key={n}>
                    <StarWrapper disabled={disabled} size={size} onClick={()=>handleStarClick(n)}> {howMany >= n ? <StarSolidIcon/> : <StarOutlineIcon/> } </StarWrapper>
                </div>
            ))}

        </StarsWrapper>
    );
};

export default StarsRating;