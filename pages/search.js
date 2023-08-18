import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Center, Header, Input, ProductsGrid, Spinner} from "@/components";
import styled from "styled-components";
import axios from "axios";
import {debounce} from "lodash";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`
const InputWrapper = styled.div`
  position: sticky;
  top:70px;
  padding: 5px 0;
  margin: 25px 0 ;
  background-color: #eeeeeeaa;
`
const SearchPage = () => {
    const [phrase, setPhrase] = useState('');
    const [products, setProduct] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const debouncedSearch = useCallback(debounce((phrase)=>searchProducts(phrase),500),[]);
    function searchProducts(phrase){
            axios.get('/api/products?phrase='+encodeURIComponent(phrase))
                .then(response=>{
                    setProduct(response.data);
                    setIsLoading(false);
                })
    }
    useEffect(()=>{
        if(phrase){
            setIsLoading(true);
            debouncedSearch(phrase);
        }else{
            setProduct([])
        }
    },[phrase])
    return (
        <>
            <Header/>
            <Center>
                <InputWrapper>
                    <SearchInput
                        autoFocus
                        placeholder={'Search for products...'}
                        value={phrase}
                        onChange={(ev)=>{setPhrase(ev.target.value)}} />
                </InputWrapper>
                {!isLoading && products.length===0 && phrase!=='' &&(
                    <h2>No products found for query "{phrase}"</h2>
                )}
                {isLoading && <Spinner fullWidth={true}/>
                }
                {!isLoading && products.length>0 && (
                    <ProductsGrid products={products}></ProductsGrid>
                )}
            </Center>
        </>
    );
};

export default SearchPage;