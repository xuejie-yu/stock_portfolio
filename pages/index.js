import React from "react";
import Head from 'next/head';
import Dashboard from "../web/components/dashboard/dashboard.jsx";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: "quicksand"
  }
});

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Stock Porfolio</title>
      </Head>

      <main>
        <ThemeProvider theme={theme}>
          <Dashboard></Dashboard>
        </ThemeProvider>
      </main>
    </div>
  )
}