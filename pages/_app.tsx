import { wrapper } from "@/store";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useActions, useAppSelector } from "@/hooks/redux";

function MyApp({ Component, pageProps }: AppProps) {
  const {checkAuth} = useActions()
  const { user, isChackAuthLoading } = useAppSelector(state => state.auth)
  useEffect(() =>{
    const token = localStorage.getItem('token')
    if (token) {
      checkAuth()
    }
  },[])
  if(isChackAuthLoading) {
    return <MainLayout>
      <h2>loading....</h2>
    </MainLayout>
  }
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);