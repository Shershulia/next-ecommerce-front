import React, {useEffect, useState} from 'react';
import {Center, Header, ProductsGrid, Spinner, Title} from "@/components";
import {Category} from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import axios from "axios";

const CategoryHeader = styled.div`
    display: flex;
  align-items: center;
  justify-content: space-between;
  h1{
    font-size: 1.5em;
  }
`
const FiltersWrapper = styled.div`
display: flex;
  gap: 15px;
`
const Filter = styled.div`
    background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444 ;
  align-items: center;
  
  span{
    margin-top: 1px;
  }
  
  select{
    background-color: transparent;
    border:0;
    font-size: inherit;
    color: #444 ;
    margin: 0;

  }
`;

const SingleCategoryPage = ({category,subCategories,products:originalProducts}) => {

    const [products,setProducts] = useState(originalProducts);
    const defaultSorting = '_id-desc';
    const defaultFilterValues = category.properties.map(p=>({name:p.name,value:'all'}));

    const [sort,setSort] = useState(defaultSorting);
    const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [filtersChanged, setFiltersChanged] = useState(false);
    function handleChange(filterName,filterValue){
        setFiltersValues(prevState => {
            return prevState.map(p=>({
                name:p.name,
                value:p.name===filterName? filterValue :p.value,
            }));
        })
        setFiltersChanged(true);
    }


    useEffect(()=>{
        if (!filtersChanged){
            return
        }
        setLoadingProducts(true);
        const categoriesIds = [category._id,...(subCategories?.map(c=>c._id) || [] )];
        const params = new URLSearchParams;
        params.set('categories', categoriesIds.join(','))
        params.set('sort',sort);
        filtersValues.forEach(f=>{
            if (f.value!=='all'){
                params.set(f.name,f.value);
            }
    });
        const url = `/api/products?`+params.toString();
        axios.get(url).then(res=>{
            setProducts(res.data);
            setLoadingProducts(false);
        })
    },[filtersValues,sort,filtersChanged]);

    return (
        <>
            <Header></Header>
            <Center>
                <CategoryHeader>
                    <h1>{category.name}</h1>
                    <FiltersWrapper>
                        {category.properties.map(prop=>(
                            <Filter key={prop.name}>
                                <span>{prop.name}:</span>

                                <select
                                    onChange={(event)=>(handleChange(prop.name,event.target.value))}
                                    value={filtersValues.find(f=>f.name===prop.name).value}>
                                    <option value={'all'}>All</option>
                                {
                                    prop.values.map(val=>(
                                        <option value={val} key={val}>{val}</option>
                                    ))
                                }
                                </select>
                            </Filter>
                        ))}
                        <Filter>
                            <span>Sorting: </span>
                            <select value={sort} onChange={(e)=>{
                                setSort(e.target.value);
                                setFiltersChanged(true);
                            }}>
                                <option value={'price-asc'}>price, lowest first</option>
                                <option value={'price-desc'}>price, highest first</option>
                                <option value={'_id-desc'}>Newest First</option>
                                <option value={'_id-asc'}>Oldest First</option>
                            </select>
                        </Filter>
                    </FiltersWrapper>
                </CategoryHeader>
                {!loadingProducts && (
                    <div>
                    {products.length>0 ? (
                        <ProductsGrid products={products}/>
                    ) : (
                        <div>Sorry, No products found</div>
                    )}

                    </div>)
                }
                {loadingProducts &&

                    (<Spinner $fullwidth={true}/>)}

            </Center>
        </>
    );
};
export default SingleCategoryPage;

export async function getServerSideProps(context){
    await mongooseConnect();
//    // console.log(router.pathname);
    const category = await Category.findById(context.query.id);
    const subCategories = await Category.find({parent:category._id});
    const categoriesIds = [category._id,...subCategories.map(c=>c._id)];
    const products = await Product.find({category:categoriesIds})

    return {
        props:{
            category:  JSON.parse(JSON.stringify(category)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            products: JSON.parse(JSON.stringify(products)),
        }
    }
}