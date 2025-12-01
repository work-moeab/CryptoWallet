/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import { APIServiceProvider } from "@src/context/APIServiceContext";
import Root from "@src/navigation";
import { persistor, store } from "@src/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { WalletProvider } from '@tetherto/wdk-react-native-provider';
import { CHAINS_CONFIG } from './src/config/chains';

enableScreens(false);

function App() {

  return (
    <GestureHandlerRootView>
          <WalletProvider
      config={{
        indexer: {
          apiKey: 'YOUR_WDK_INDEXER_API_KEY',
          url: 'https://indexer.wallet.tether.io',
        },
        chains: CHAINS_CONFIG,
        enableCaching: true,
      }}
    >

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <APIServiceProvider>
              <Root />
            </APIServiceProvider>
          </NavigationContainer>
      </PersistGate>
    </Provider>
    </WalletProvider>
  </GestureHandlerRootView>
  );
}

export default App;
