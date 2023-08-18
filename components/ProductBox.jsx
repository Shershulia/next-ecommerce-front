import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {FlyingButtonBox, HeartOutlineIcon, HeartSolidIcon} from "@/components/index";
import Link from "next/link";
import axios from "axios";

const WhiteBox = styled(Link)`
    background-color: #FFF;
  position: relative;
    padding: 20px;
    height: 120px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  img{
    max-width: 100%;
    max-height: 150px;
    border-radius: 5px;
  }
`;
const WishListButton = styled.button`
  border: 0;
  width: 30px !important;
  height: 30px;
  padding: 10px;
  position: absolute;
  top:0;
  right: 0;
  background:transparent;
  cursor: pointer;
  ${props => props.wished===1 ? `
  color:red;
  ` : `color:black;`}
svg{
  width: 16px;
}`;

const ProductWrapper = styled.div`
  button{
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;

const Title = styled(Link)`
  display: block;

  font-weight: normal;
  font-size: .9rem;
  margin:0;
  text-decoration: none;
  color:inherit;
  @media screen and (max-width: 768px) {
    white-space: nowrap; /* Prevents the title from wrapping to multiple lines */
    width: 150px; /* Set a fixed width for the title */
    overflow: hidden; /* Hides any overflowing text */
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 400px) {
    width: 100px; /* Set a fixed width for the title */
  }
`;
const PriceRow = styled.div`
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;
const ProductInfoBox = styled.div`
  display: block;
    margin-top: 5px;
`;

const Price = styled.div`
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;

  }
    font-size: 1rem;
  font-weight: 700;
  text-align: right;
    
`



const ProductBox = ({_id,title,desc,price,images,index,wished=false,
                    onRemoveFromWishlist=()=>{}}) => {
    const uri = '/product/'+_id;
    const [isWished,setIsWished]= useState(wished);


    function addToWishList(ev){
        ev.preventDefault();
        ev.stopPropagation();
        const nextValue = !isWished;
        if(nextValue===false && onRemoveFromWishlist){
            onRemoveFromWishlist(_id);
        }
        axios.post('/api/wishlist',{
            product:_id,
        }).then(()=>{});
        setIsWished(nextValue);

    }

    return (
        <ProductWrapper>
            <WhiteBox href={uri}>
                <div>
                    <WishListButton wished={isWished ? 1 : 0} onClick={addToWishList}>
                        {isWished ? <HeartSolidIcon/> : <HeartOutlineIcon/>}
                    </WishListButton>
                    <img src={images[0]} alt={`Image of product ${title}`}/>
                </div>
            </WhiteBox>
            <ProductInfoBox>
               <Title href={uri} >
                   {title}
               </Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <FlyingButtonBox img={images[0]} block={1} primary={1} outline={1} _id={_id}>Add to Cart</FlyingButtonBox>

                </PriceRow>

            </ProductInfoBox>

        </ProductWrapper>


);
};

export default ProductBox;