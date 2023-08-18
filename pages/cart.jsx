import React, {useContext, useEffect, useState} from 'react';
import {Center, Header, PrimaryBtn, Table} from "@/components";
import styled from "styled-components";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Input from "@/components/Input";
import {RevealWrapper} from "next-reveal";
import {useSession} from "next-auth/react";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap:40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2){
    text-align: right;
  }
  
  table tr.subtotal td{
    padding: 15px 0;
  }
  table tr.subtotal td:nth-child(2){
    font-size: 1.4rem;
  }
  tr.total td{
    font-weight: bold;
  }
  @media screen and (min-width: 768px){
    grid-template-columns: 1.3fr .7fr;

  }
`

const Box = styled.div`
background-color: #FFF;
border-radius: 10px;
  padding:30px;
`
const ProductInfoCell = styled.td`
    padding: 10px 0;
  
`;
const ProductImageBox= styled.div`
  width: 50px;
  height: 50px;
  padding: 2px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 40px;
    max-height: 40px;
    border-radius: 3px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
      border-radius: 5px;
    }
  }
`
const QuantityLabel= styled.span`
  padding: 0 3px;
  margin-left: .7rem;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
  }
`;

const QuantityCell=styled.td`
  
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`


const CartPage = () => {
    const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
    const [products ,setProducts] = useState([]);
    const [isSuccess,setIsSuccess] = useState(false);
    const {data:session} = useSession();
    const [name ,setName] = useState('');
    const [email ,setEmail] = useState('');
    const [city ,setCity] = useState('');
    const [postalCode ,setPostalCode] = useState('');
    const [streetAddress ,setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [shippingFee,setShippingFee]=useState(0);

    const moreOfThisProduct = (id) =>{
        addProduct(id);
    }
    const lessOfThisProduct= (id)=>{
        removeProduct(id);
    }
    const goToPayment = async ()=>{
        const response = await axios.post('/api/checkout',{
            name,email,city,postalCode,streetAddress,country,
            cartProducts,
        })
        if ( response.data.url){
            window.location=response.data.url;
        }
    }
    let total = 0;
    for (const productId of cartProducts){
        const price =  products.find(p=> p._id===productId)?.price;
        total+=price;
    }
    useEffect(()=>{
        if(cartProducts.length>0){
            axios.post('/api/cart', {ids: cartProducts}).then(r  => setProducts(r.data));
        }else {
            setProducts([]);
        }
    },[cartProducts])

    useEffect(()=>{
        if (typeof window === 'undefined'){
            return
        }
        if (window.location.href.includes('success')) {
            clearCart();
            setIsSuccess(true);
        }
        axios.get('/api/settings?name=shippingFee').then(res=>{
            setShippingFee(res.data.value);
        })

        },[]);

    useEffect(()=>{
        if(!session){
            return;
        }
        axios.get('/api/address').then(r=>{
            setName(r.data.name);
            setEmail(r.data.email);
            setCity(r.data.city);
            setPostalCode(r.data.postalCode);
            setStreetAddress(r.data.streetAddress);
            setCountry(r.data.country);
        });
    },[session])

    if (isSuccess){
        return (
            <>
                <Header/>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>We will email you when your order will be sent.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }
    return (
        <>
            <Header/>
            <Center>
                <ColumnsWrapper>
                    <RevealWrapper>
                    <Box>
                        <h2>Cart</h2>
                    {!cartProducts.length && (
                        <div>
                            Your cart is empty
                        </div>)
                    }

                    {products.length>0 && (

                        <Table>
                        <thead>
                            <tr>
                                <th>
                                    Product
                                </th>
                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product=>(
                            <tr key={product._id}>
                                <ProductInfoCell>
                                    <ProductImageBox> <img src={product.images[0]}/></ProductImageBox>
                                    {product.title} </ProductInfoCell>
                                <QuantityCell>
                                    <PrimaryBtn onClick={()=>lessOfThisProduct(product._id)}>-</PrimaryBtn>
                                    <QuantityLabel>{cartProducts.filter(id=> id===product._id).length} </QuantityLabel>
                                    <PrimaryBtn onClick={()=>moreOfThisProduct(product._id)}>+</PrimaryBtn>
                                </QuantityCell>
                                <td> ${cartProducts.filter(id=> id===product._id).length * product.price}</td>
                            </tr>
                            ))}
                        <tr className={'subtotal'}>
                            <td colSpan={2}>Products</td>
                            <td>${total}</td>
                        </tr>
                        <tr className={'subtotal'}>
                            <td colSpan={2}>Shipping</td>
                            <td>${shippingFee}</td>
                        </tr>
                        <tr className={"subtotal total"}>
                            <td colSpan={2}>Total</td>
                            <td>${parseInt(total)+parseInt(shippingFee)}</td>
                        </tr>
                        </tbody>
                    </Table>
                            )
                        }

                    </Box>
                    </RevealWrapper>
                    {!!cartProducts.length &&
                        <RevealWrapper>

                        <Box>
                            <h2>Order information</h2>
                                <Input type={'text'} placeholder={'Name'} value={name} onChange={ev=>setName(ev.target.value)} name={'name'}/>
                                <Input type={'text'} placeholder={'Email'} value={email} onChange={ev=>setEmail(ev.target.value)} name={'email'}/>
                                <CityHolder>
                                    <Input type={'text'} placeholder={'City'} value={city} onChange={ev=>setCity(ev.target.value)} name={'city'}/>
                                    <Input type={'text'} placeholder={'Postal Code'} value={postalCode} onChange={ev=>setPostalCode(ev.target.value)} name={'postalCode'}/>
                                </CityHolder>
                                <Input type={'text'} placeholder={'Street Address'} value={streetAddress} onChange={ev=>setStreetAddress(ev.target.value)} name={'streetAddress'}/>
                                <Input type={'text'} placeholder={'Country'} value={country} onChange={ev=>setCountry(ev.target.value)} name={'country'}/>

                                <PrimaryBtn block={1} black={1} onClick={goToPayment}>Continue to payment</PrimaryBtn>
                        </Box>
                        </RevealWrapper>

                    }
                </ColumnsWrapper>
            </Center>
        </>
    );
};

export default CartPage;

