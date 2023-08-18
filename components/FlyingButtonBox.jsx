import React, {useContext, useEffect, useRef, useState} from 'react';
import {PrimaryBtn} from "@/components/index";
import styled from "styled-components";
import {CartContext} from "@/components/CartContext";
const ButtonWrapper = styled.div`
  @keyframes fly{
    100%{
      top:0;
      left: 70%;
      opacity: 0;
      display: none;
    }
  }
  img{
    max-width: 50px;
    max-height: 50px;
    opacity: 1;
    position: fixed;
    display: none;
    animation: fly 1s;
    z-index: 15;
  }
`;
const FlyingButtonBox = ({children,img,_id,...rest}) => {
    const{addProduct}=useContext(CartContext);
    const imgRef= useRef();
    function sendImageToCart(ev,img){
        imgRef.current.style.display='inline-block';
        imgRef.current.style.left=ev.clientX+'px';
        imgRef.current.style.top=ev.clientY+'px';
        setTimeout(()=>{
            if (imgRef.current) imgRef.current.style.display='none';
        },1000)
        addProduct(_id)
    }
    useEffect(()=>{
        const interval= setInterval(()=>{
            const reveal = imgRef.current?.closest('div[data-sr-id]');
            if (reveal!=null && reveal.style.opacity==='1'){
                reveal.style.transform='none';
            }
        },100)
    },[])

    return (
        <>
                <ButtonWrapper >
                    <img src={img} alt={'popup image'} ref={imgRef}/>
                    <PrimaryBtn {...rest} onClick={(ev)=>sendImageToCart(ev,img)}>{children}
                        </PrimaryBtn>
                </ButtonWrapper>


        </>
    );
};

export default FlyingButtonBox;