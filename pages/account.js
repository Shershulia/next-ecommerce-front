import React, {useEffect, useState} from 'react';
import {Center, Header, Order, PrimaryBtn, ProductBox, Spinner, Tabs, Title, WhiteBox} from "@/components";
import {signIn, signOut, useSession} from "next-auth/react";
import styled from "styled-components";
import {RevealWrapper} from "next-reveal";
import Input from "../components/Input";
import axios from "axios";

const ColsWrapper = styled.div`
display: grid;
grid-template-columns: 1.2fr 0.8fr;
gap:40px;
  margin: 40px 0;
  p{
    margin: 5px;
  }
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`
const OrdersDiv = styled.div`
`
const AccountPage = () => {
    const {data:session} = useSession();

    const [name ,setName] = useState('');
    const [email ,setEmail] = useState('');
    const [city ,setCity] = useState('');
    const [postalCode ,setPostalCode] = useState('');
    const [streetAddress ,setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [loaded,setLoaded] = useState(true);
    const [wishedLoaded,setWishedLoaded] = useState(true);
    const [ordersLoaded, setOrdersLoaded] = useState(true);
    const [wishedProducts, setWishedProducts] = useState([]);
    const [activeTab,setActiveTab] = useState('Orders');
    const [orders, setOrders] = useState([]);
    async function logout(){
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
            }
        );
    }
    async function login(){
        await signIn('google',{
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        })
    }
    async function save(){
        const data = {name,email,city,streetAddress,postalCode,country}
        await axios.put('/api/address',data)
    }
    useEffect(()=>{
        if (!session){
            return;
        }
        setLoaded(false);
        setWishedLoaded(false);
        setOrdersLoaded(false);

        axios.get('/api/address').then(r=>{
                setName(r.data.name);
                setEmail(r.data.email);
                setCity(r.data.city);
                setPostalCode(r.data.postalCode);
                setStreetAddress(r.data.streetAddress);
                setCountry(r.data.country);
                setLoaded(true);
            });
        axios.get('/api/wishlist').then(r=>{
                setWishedProducts(r.data.map(wp=>wp.product));
                setWishedLoaded(true);
            })

        axios.get('/api/orders').then(r=>{
            setOrders(r.data);
            setOrdersLoaded(true);
        })

        }, [session]);

    function productRemovedFromWishlist(_id){
        setWishedProducts(prevState => {
            return [...prevState.filter(p=> p._id.toString()!==_id)]
        })
    }
    return (
        <>
         <Header/>
             <Center>
                 <ColsWrapper>
                     <div>
                         <RevealWrapper delay={0}>
                             <WhiteBox>
                                 <Tabs tabs={['Orders','Wishlist']}
                                       active={activeTab}
                                       onChange={setActiveTab}/>

                                 {activeTab ==='Orders' && (
                                     <>
                                         {!ordersLoaded && (
                                             <Spinner $fullwidth={true}></Spinner>
                                         )}


                                         {ordersLoaded && (
                                             <OrdersDiv>
                                                 {orders.length===0 && (
                                                     <div>
                                                         {session && (<p>You have no previous orders</p>)}
                                                         {!session && (<p>Login to see your orders</p>)}
                                                     </div>
                                                 )}
                                                 {orders.length>0 && orders.map(order=>(
                                                         <Order {...order}
                                                                key={order._id}

                                                         ></Order>
                                                     ))}
                                             </OrdersDiv>

                                         )}
                                     </>
                                 )}
                                 {activeTab === 'Wishlist' && (
                                     <>
                                         {!wishedLoaded && <Spinner $fullwidth={true}/>}

                                         {wishedLoaded && (
                                             <>

                                                 {wishedProducts.length===0 && (
                                                     <>
                                                         {session && (<p>Your wishlist is empty</p>)}
                                                         {!session && (<p>Login to add products to your wishlist</p>)}

                                                     </>
                                                 )}

                                                 <WishedProductsGrid>
                                                     {wishedProducts.length>0 && wishedProducts.map(wp=>(
                                                         <ProductBox {...wp}
                                                                     key={wp._id}
                                                                     wished={true}
                                                                     onRemoveFromWishlist={(_id)=>{productRemovedFromWishlist(_id)}}/>
                                                     ))}

                                                 </WishedProductsGrid>

                                             </>

                                         )}
                                     </>

                                 )}
                             </WhiteBox>
                         </RevealWrapper>
                     </div>
                     <div>
                         <RevealWrapper delay={100}>
                             <WhiteBox>
                                 {session ? (<h2>Account details</h2>) : (<h2>Login</h2>)}
                                 {!loaded && <Spinner $fullwidth={true}/>}
                                 {loaded && session && (
                                     <>
                                     <Input type={'text'} placeholder={'Name'} value={name} onChange={ev=>setName(ev.target.value)} name={'name'}/>
                                     <Input type={'text'} placeholder={'Email'} value={email} onChange={ev=>setEmail(ev.target.value)} name={'email'}/>
                                     <CityHolder>
                                     <Input type={'text'} placeholder={'City'} value={city} onChange={ev=>setCity(ev.target.value)} name={'city'}/>
                                     <Input type={'text'} placeholder={'Postal Code'} value={postalCode} onChange={ev=>setPostalCode(ev.target.value)} name={'postalCode'}/>
                                     </CityHolder>
                                     <Input type={'text'} placeholder={'Street Address'} value={streetAddress} onChange={ev=>setStreetAddress(ev.target.value)} name={'streetAddress'}/>
                                     <Input type={'text'} placeholder={'Country'} value={country} onChange={ev=>setCountry(ev.target.value)} name={'country'}/>

                                     <PrimaryBtn block={1} black={1} onClick={save}>Save</PrimaryBtn>
                                         <hr/>

                                     </>
                                 )}
                                 {session &&(
                                     <PrimaryBtn primary={1} onClick={logout}>Logout</PrimaryBtn>)
                                 }
                                 {!session &&(
                                     <PrimaryBtn primary={1} onClick={login}>Login with Google</PrimaryBtn>)
                                 }
                             </WhiteBox>
                         </RevealWrapper>
                     </div>
                 </ColsWrapper>

             </Center>

        </>
    );
};

export default AccountPage;