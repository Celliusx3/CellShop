import React, { useContext, useEffect, useState } from 'react';
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack, AuthStack } from './src/presentations/navigators/routes';
import { Provider as AuthProvider, Context as AuthContext } from './src/presentations/context/AuthContext';
import { Provider as CartProvider } from './src/presentations/context/CartContext';
import { Provider as OrdersProvider } from './src/presentations/context/OrdersContext';

const compose = (providers) =>
  providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ));

const Provider = compose([
    AuthProvider,
    CartProvider,
    OrdersProvider
]);

const Router = () => {
  const [loading, setLoading] = useState(false)
  const { state: { user }, autoLogin } = useContext(AuthContext);

  useEffect(() => {
    const autoAuth = async () => {
      setLoading(true)
      await autoLogin()
      setLoading(false)
    }
    
    autoAuth()
  }, [])

  return (
    loading ? 
    <View/> : 
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
};

const App = () => {
  return (
    <Provider>
      <Router />
      {/* <AuthContext.Consumer>
        {({state: {token}}) => {
          return (
            <NavigationContainer>
              {token ? <AppStack /> : <AuthStack />}
            </NavigationContainer> 
          )
        }}
      </AuthContext.Consumer> */}

      {/* <NavigationContainer>
        <MainStack/>
      </NavigationContainer> */}
    </Provider>
  );
};

export default App;