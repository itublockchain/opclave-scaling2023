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

  dummyData: {
    ethBalance: number;
    opBalance: number;
  };
  setDummyData: React.Dispatch<
    React.SetStateAction<{
      ethBalance: number;
      opBalance: number;
    }>
  >;
};

export const AppContext = React.createContext({} as AppContextProps);

export function AppContextProvider(props: any) {
  const [displayData, setDisplayData] = React.useState({
    username: 'zetsub0ii.eth',
    balance: '0.00',
  });

  const [dummyData, setDummyData] = React.useState({
    ethBalance: 5.328,
    opBalance: 57.4,
  });

  const context: AppContextProps = {
    displayData,
    setDisplayData,
    dummyData,
    setDummyData,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}
