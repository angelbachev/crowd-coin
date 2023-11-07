import React from "react";
import Header from "./Header";
import {Container} from "semantic-ui-react";
import Head from "next/head";

const Layout = ({children}) => {
    return (
        <Container>
            <Head>
                <title>CrowdCoin</title>
            </Head>
            <Header/>
            {children}
        </Container>
    );

};

export default Layout;