import React, { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-bootstrap';
import { store } from 'src/store';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint='xxs'
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
