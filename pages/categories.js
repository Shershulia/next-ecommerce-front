import React from 'react';
import {Center, Header, ProductBox, Title} from "@/components";
import {Category} from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import Link from "next/link";
import {RevealWrapper} from "next-reveal";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {WishedProduct} from "@/models/WishedProduct";
import {all} from "axios";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;

  }
`;
const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
margin-top: 10px;
  h2{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a{
    color: #555;
    display: inline-block;
  }
`;
const CategoryWrapper = styled.div`
margin-bottom: 40px;
`;

const ShowAllSquare= styled(Link)`
    background-color: #ddd;  
  height: 160px;
  border-radius: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: #555;
`;
const CategoriesPage = ({mainCategories,categoriesProducts,wishedProduct}) => {
    return (
        <>
         <Header/>
            <Center>
                {mainCategories.map((category)=>(
                    <CategoryWrapper key={category._id}>
                        <CategoryTitle>
                            <h2>{category.name}</h2>
                        <div>
                            <Link href={'/category/' + category._id}>Show all {category.name}</Link>
                        </div>
                        </CategoryTitle>
                        <CategoryGrid>
                            {categoriesProducts[category._id]?.map((p,index)=>(
                                <RevealWrapper delay={index*50} origin={'left'} key={index}>
                                    <ProductBox {...p} wished={wishedProduct.includes(p._id)}/>
                                </RevealWrapper>
                            ))}
                            <RevealWrapper delay={categoriesProducts[category._id].length*50} origin={'left'}>
                                <ShowAllSquare href={'/category/' + category._id}>
                                    Show all &rarr;
                                </ShowAllSquare>
                            </RevealWrapper>
                        </CategoryGrid>
                    </CategoryWrapper>))}
            </Center>
        </>
    );
};

export default CategoriesPage;

export async function getServerSideProps(ctx){
    await mongooseConnect()
    const categories = await Category.find();
    const mainCategories = categories.filter(c=>c.parent==null);
    const categoriesProducts = {}
    const allFetchedProducts = [];
    for (const mainCategory of mainCategories){
        const mainCatId = mainCategory._id.toString();
        const childCatIds = categories
            .filter(c=>c?.parent?.toString() ===mainCatId)
            .map(c=>c._id.toString());
        const categoriesIds= [mainCatId,...childCatIds]
        const products = await Product.find({category:categoriesIds},null,{limit : 3, sort:{'_id':-1}});
        allFetchedProducts.push(...products.map(p=>p._id.toString()))
        categoriesProducts[mainCategory._id] = products;

    }
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const wishedNewProducts = session?.user ?
        await WishedProduct.find({
        userEmail:session?.user.email,
        product:allFetchedProducts,
    }) : [];
    return {
        props:{
            mainCategories : JSON.parse(JSON.stringify(mainCategories)),
            allCategories :JSON.parse(JSON.stringify(categories)),
            categoriesProducts:  JSON.parse(JSON.stringify(categoriesProducts)),
            wishedProduct: wishedNewProducts.map(i=>i.product.toString()),
        }
    }
}