import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import React from "react";

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
