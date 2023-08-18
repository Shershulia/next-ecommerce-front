import React, {useContext} from 'react';
import {Center, ButtonLink, Cart, FlyingButtonBox} from "@/components/index";
import {RevealWrapper} from "next-reveal";
import styled from "styled-components";
import {CartContext} from "@/components/CartContext";
const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`
const Wrapper = styled.div`
  display:grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img.main{
    max-width: 100%;
  max-height: 200px;
  display: block;
  margin: 0 auto;
  }
  div:nth-child(1){
    margin-left: auto;
    margin-right: auto;
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
   
    & > div:nth-child(1) {
      order: 0;

    }
           img{max-width: 100%;}
  }
  
`
const Column = styled.div`
  display: flex;
  align-items: center;
`
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`
const CenterImg = styled.div`
display: flex;
align-items: center;
justify-content: center;
  width: 100%;
`
const ImgCol = styled(Column)`
  & > div{
    width: 100%;
  }
`;
const ContentWrapper = styled.div`
  `;
const Featured = ({product}) => {
    const {addProduct} = useContext(CartContext);
    const addFeaturedToCart = ()=>{
        addProduct(product._id);
    }
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                        <div>

                            <RevealWrapper origin={'left'} delay={0}>
                                <ContentWrapper>
                                    <Title>{product.title}</Title>
                                    <Desc>{product.desc}</Desc>
                                    <ButtonsWrapper>

                                        <ButtonLink href={'/product/' + product._id} outline={1} white={1}>Read More</ButtonLink>
                                        <FlyingButtonBox img={product.images[0]} _id={product._id} primary={1} white={1} onClick={addFeaturedToCart}>
                                            <Cart />

                                            Add to Cart</FlyingButtonBox>
                                    </ButtonsWrapper>
                                </ContentWrapper>

                            </RevealWrapper>

                        </div>
                    </Column>
                    <ImgCol>
                        <RevealWrapper delay={0}>
                            <CenterImg>
                                <img className={'main'} src={product.images[0]}/>

                            </CenterImg>
                        </RevealWrapper>
                    </ImgCol>


                </Wrapper>
            </Center>
        </Bg>
    );
};

export default Featured;