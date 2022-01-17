import { createContext, FC, useState } from 'react';

interface APP {}

const AppContext = createContext<APP>({});

export const AppContextProvider: FC = ({ children }) => {
  const context = {};

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
