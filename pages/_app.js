import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components";
import {SessionProvider} from "next-auth/react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;;
  }
  hr{
    display: block;
    border:0;
    border-top: 1px solid #CCC;
  }
`;

export default function App({ Component, pageProps : {session,...pageProps} }) {
  return (
      <>
          <HelmetProvider>
              <Helmet>
                  <link
                      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap"
                      rel="stylesheet"
                  />
              </Helmet>
          </HelmetProvider>
        <GlobalStyles></GlobalStyles>
          <SessionProvider session={session}>
              <CartContextProvider>
                  <Component {...pageProps} />
              </CartContextProvider>
          </SessionProvider>
          </>
     )
}
