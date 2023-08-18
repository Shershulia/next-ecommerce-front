import React from 'react';
import styled from "styled-components";
import {ProductBox} from "@/components/index";
import {RevealWrapper} from "next-reveal";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap:40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
const ProductsGrid = ({products,wishedProducts=[]}) => {
    return (
        <StyledProductsGrid>
            {products.length>0 && products.map((product,index)=>(
                <RevealWrapper delay={index*50} key={index}>
                    <ProductBox {...product}
                                wished={wishedProducts.includes(product._id)}
                                index={index} />
                </RevealWrapper>

            ))}
        </StyledProductsGrid>
    );
};

export default ProductsGrid;