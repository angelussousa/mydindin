import 'react-native-gesture-handler'

import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { View, StatusBar, } from 'react-native';
import Routes from './src/routes/index.js'
import AuthProvider from './src/contexts/auth'

console.disableYellowBox=true

export default function App() {
 return (
   <NavigationContainer>
     <AuthProvider>

        <StatusBar backgroundColor={'#0A2E40'} barStyle='light-content'/>
        <Routes/>
        
     </AuthProvider>
     
   </NavigationContainer>
  );
}

