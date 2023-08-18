import React, {useContext, useState} from 'react';
import Link from "next/link";
import styled from "styled-components";
import {Bars, Center, SearchIcon} from "@/components/index";
import {CartContext} from "@/components/CartContext";

const StyledHeader = styled.header`
    background-color: #222;
  z-index: 10;
    
`
const Logo = styled(Link)`
  color:#fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

const NavigationLink=styled(Link)`
  display: block;
    color:#aaa;
  text-decoration: none;
  margin: 0;
  padding: 10px 0;
  svg{
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`

const StyledNav = styled.nav`
  ${props=>props.$navigActive===1 ? 
          `display:block;` : 
          `display: none;`}
  gap: 15px;
  position: fixed;
  top:0px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  z-index: 2;
  @media screen and (min-width: 768px){
    display: flex;
    position: static;
    padding: 0;
  }
`
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }`;
const SideIcons= styled.div`
  display: flex;
  align-items: center;
  a{
    display: inline-block;
    min-width: 20px;
    color: white;
    svg{
      width: 16px;
      height: 16px;
    }
  }
`;

const Header = () => {
    const {cartProducts} = useContext(CartContext);
    const [navActive,setNavActive] = useState(false);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                <Logo href={'/'}>Ecommerce</Logo>
                <StyledNav $navigactive={navActive ? 1 : 0}>
                    <NavigationLink href={'/'}>Home</NavigationLink>
                    <NavigationLink href={'/products'}>All products</NavigationLink>
                    <NavigationLink href={'/categories'}>Categories</NavigationLink>
                    <NavigationLink href={'/account'}>Account</NavigationLink>
                    <NavigationLink href={'/cart'}>Cart ({cartProducts.length})</NavigationLink>
                </StyledNav>
                    <SideIcons>
                        <Link href={'/search'}><SearchIcon/></Link>
                        <NavButton onClick={()=>setNavActive(prevState => !prevState)}>
                            <Bars></Bars>
                        </NavButton>
                    </SideIcons>

                </Wrapper>
            </Center>
        </StyledHeader>
    );
};

export default Header;