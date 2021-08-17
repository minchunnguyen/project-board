import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import ThemeContextProvider from '../context/ThemeProvider';
import IntlProvider from '../context/IntlProvider';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer, {
  initialState as reducerInitialState,
} from '../redux/rootReducer';

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {},
) {
  function AllTheProviders({ children }) {
    return (
      <IntlProvider locale="en">
        <ThemeContextProvider>
          <Provider store={store}>{children}</Provider>
        </ThemeContextProvider>
      </IntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: AllTheProviders, ...renderOptions });
}

// Mocks useRouter
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
function mockNextUseRouter(props) {
  useRouter.mockImplementationOnce(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }));
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render, mockNextUseRouter };
