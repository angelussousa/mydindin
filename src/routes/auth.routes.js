import React from "react";
import {createStackNavigator} from '@react-navigation/stack'

import SignIn from "../pages/SignIn";
import SignUp from '../pages/SignUp'


const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator >
            <AuthStack.Screen 
            options={{headerShown:false}}
            name="SignIn" component={SignIn}
            />
            <AuthStack.Screen 
            options={{
                headerStyle:{
                    backgroundColor:'#00000099',
                                   
                    elevation:10
                },
                headerTintColor:'#FFF',
                headerBackTitleVisible:false,
                headerTitle:'Voltar'
            }}
            name="SignUp" component={SignUp}
            />
        </AuthStack.Navigator>
    )
}
export default AuthRoutes;