import React from 'react';
import {Cart, Center, FlyingButtonBox, Header, ProductImages, ProductReviews, Title, WhiteBox} from "@/components";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
const ColWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
  gap:40px;
  margin: 40px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;

  }
`
const PriceRow = styled.div`
  display: flex;
    gap:20px;
  align-items: center;
`;
const Price = styled.span`
font-size: 1.4rem;
`
const SingeProductPage = ({product}) => {
    return (
        <>
            <Header></Header>
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images}/>
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.desc}</p>
                        <PriceRow>
                            <Price>${product.price}</Price>
                            <div>
                                <FlyingButtonBox primary={1} img={product.images[0]} _id={product._id}
                             > <Cart/> Add to Cart</FlyingButtonBox></div>

                        </PriceRow>
                    </div>
                </ColWrapper>
                <ProductReviews product={product}/>
            </Center>
        </>
    );
};
export default SingeProductPage;

export async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id)
    return {
        props:{
            product:JSON.parse(JSON.stringify(product))
        }
    }
}