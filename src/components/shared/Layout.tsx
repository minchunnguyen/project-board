import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


type Props = {
  children?: React.ReactNode;
  title?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-end",
    },
    pageContainer: {
      display: 'flex',
      minHeight: 'calc(100vh - 42px)',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      position: 'relative',
      marginTop: '40px'
    },
  }),
);

const Layout = ({ children, title = 'Project Board' }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className={classes.pageContainer}>
        <Sidebar />
        <main className={classes.content}>
          {children}
        </main>
      </div>
      
      <Footer />
    </>
  );
};

export default Layout;
