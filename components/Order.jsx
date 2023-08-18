import React from 'react';
import styled from "styled-components";

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;
  time{
    font-size: 1.2em;
    color: #555;
  }
`;
const ProductRow = styled.div`
span{
  color: #aaa;
}`
const Address = styled.div`
  font-size: .8rem;
  line-height: .8rem;
  margin-top: 5px;
  color:#888;
`
const Order = ({line_items,createdAt,...rest}) => {
    return (
        <StyledOrder>
            <div>
                <time>{(new Date(createdAt)).toLocaleString('sv-SE')}</time>
                <Address>

                    {rest.name}<br/>
                    {rest.email}<br/>
                    {rest.streetAddress}<br/>
                    {rest.postalCode} {rest.city} ,
                    {rest.country}



                </Address>
            </div>
            <div>
                {line_items.map((item)=>(
                        <ProductRow key={item.price_data.product_data.name}>
                            <span> {item.quantity} x </span>{item.price_data.product_data.name}
                        </ProductRow>
                    )
                )}
            </div>
        </StyledOrder>
    );
};

export default Order;