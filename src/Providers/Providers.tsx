import React, { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from 'react-bootstrap';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint='xxs'
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;
