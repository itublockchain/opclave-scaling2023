import React, {Context} from 'react';

type AppContextProps = {
  displayData: {
    username: string;
    balance: string;
  };
  setDisplayData: React.Dispatch<
    React.SetStateAction<{
      username: string;
      balance: string;
    }>
  >;
};

export const AppContext = React.createContext({} as AppContextProps);

export function AppContextProvider(props: any) {
  const [displayData, setDisplayData] = React.useState({
    username: 'zetsub0ii.eth',
    balance: '0.00',
  });

  const context: AppContextProps = {displayData, setDisplayData};

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}
