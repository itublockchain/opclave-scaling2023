import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppContextProvider} from './context/AppContext';
import NavConfig from './navigation/NavMain';
import {Colors} from './screens/style';

function App(): JSX.Element {
  return (
    <AppContextProvider>
      <SafeAreaView style={{backgroundColor: Colors.dark.background}}>
        <NavConfig />
      </SafeAreaView>
    </AppContextProvider>
  );
}

export default App;
