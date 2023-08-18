import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}){
    const ls = typeof window!=='undefined' ? localStorage : null;
    const defaultProducts = ls ? JSON.parse(ls.getItem('cart')) : [];
    const [cartProducts, setCartProducts] = useState( []);
    useEffect(()=>{
        if(cartProducts.length>0){
            ls.setItem('cart',JSON.stringify(cartProducts))
        }
    },[cartProducts]);
    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    },[])
    function addProduct(productId){
        setCartProducts(prevState => [...prevState,productId]);
    }
    function removeProduct(productId){
        setCartProducts(prevState => {
            const pos = prevState.indexOf(productId);
            if (pos!==-1){
               return prevState.filter((value,index)=>index!==pos)
            }return prevState;
        });
    }
    function clearCart(){
        console.log('clear cart')
        setCartProducts([]);
        ls.setItem('cart',JSON.stringify(cartProducts))
    }
    return(
        <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart
        }}>
            {children}</CartContext.Provider>
    )
}