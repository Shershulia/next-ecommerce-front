import React from 'react';
import {Center, Header, ProductsGrid, Title} from "@/components";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {WishedProduct} from "@/models/WishedProduct";

const ProductsPage = ({products,wishedNewProducts}) => {
    return (
        <>
            <Header/>
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products} wishedProducts={wishedNewProducts}/>
            </Center>
        </>
    );
};

export default ProductsPage;

export async function getServerSideProps(ctx){
    await mongooseConnect();
    const products = await Product.find({},null,{sort:{'_id':-1}});
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const wishedNewProducts = session?.user ? await WishedProduct.find({
        userEmail:session.user.email,
        product:products.map(p=>p._id.toString()),
    }) : [];
    return {props : {
            products : JSON.parse(JSON.stringify(products)),
            wishedNewProducts:wishedNewProducts.map(i=>i.product.toString()),

        }}
};