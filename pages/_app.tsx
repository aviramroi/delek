import "../styles/global.css";
import "nprogress/nprogress.css"; // styles of nprogress

import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress"; // nprogress module
import { useState } from "react";

import { Container } from "../components/container";
import { Header } from "../components/header";
import { AuthContext, EUserType, MainContext } from "../context";
import client from "../lib/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState("");
  const [selectedTribe, setSelectedTribe] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [organizationId, setOrganizationId] = useState(100);
  const [userType] = useState(EUserType.ADMIN);
  // stam

  const handleSelect = (v: number) => {
    setSelectedTribe(v);
  };

  const handleGrade = (v: number) => {
    setSelectedGrade(v);
  };

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, setUser: (v) => setUser(v) }}>
        <MainContext.Provider
          value={{
            selectedTribe,
            setSelectedTribe: handleSelect,
            selectedGrade,
            setSelectedGrade: handleGrade,
            organizationId,
            setOrganizationId,
            userType,
          }}
        >
          <Container>
            <Header />
            <Component {...pageProps} />
            <ToastContainer rtl />
          </Container>
        </MainContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default MyApp;
