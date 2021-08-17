import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import ThemeContextProvider from '../context/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import IntlProvider from '../context/IntlProvider';
import getLocale from '../utils/getLocale';
import getMessages from '../utils/getMessages';
import Router from 'next/router';
import Error from './_error';
// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

if (typeof window === 'undefined') {
  // dom parser for FormatedHTMLMessages
  global.DOMParser = new (require('jsdom').JSDOM)().window.DOMParser;
}

interface Props {
  Component: React.Component;
  store: any;
  locale: any;
  messages: any;
}

class MyApp extends App<Props> {
  static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: any;
    ctx: any;
  }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    const locale = await getLocale(ctx);
    const messages = await getMessages(locale);

    return { pageProps, locale, messages };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  handleFilterInaccessibleComponent(role: string, path: string) {
    if (path) {
      switch (role) {
        case 'member':
          return !(path.startsWith("/projects")) && !(path.startsWith("/users"));
        default:
          break;
      }
    }
    return true;
  }

  render() {
    const { Component, pageProps, store, locale, messages } = this.props;

    const role = store.getState().authentication.currentAccountRole;
    const pathRouter = Router.router ? Router.router.asPath : '';

    return (
      <IntlProvider locale={locale} messages={messages}>
        <ThemeContextProvider>
          <CssBaseline />
          <Provider store={store}>
            {this.handleFilterInaccessibleComponent(role, pathRouter) ?
              <Component {...pageProps} /> :
              <Error statusCode='LIMITED_PERMISSION' />
            }
            <NotificationContainer />
          </Provider>
        </ThemeContextProvider>
      </IntlProvider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
