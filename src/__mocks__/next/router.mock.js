import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { useState } from 'react';
import Router from 'next/router';

function RouterMock({ children }) {
  const [pathname, setPathname] = useState('/');

  const mockRouter = {
    pathname,
    prefetch: () => {},
    push: async (newPathname) => {
      setPathname(newPathname);
    },
  };

  Router.router = mockRouter;

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
       <NotificationContainer />
    </RouterContext.Provider>
  );
}

export default RouterMock;
