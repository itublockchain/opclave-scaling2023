import React from 'react';
import {AppContextProvider} from './context/AppContext';
import NavConfig from './navigation/NavMain';

function App(): JSX.Element {
  return (
    <AppContextProvider>
      <NavConfig />
    </AppContextProvider>
  );
}

export default App;
