import React, {useContext} from "react";
import {createDrawerNavigator} from '@react-navigation/drawer'
import Contas from "../pages/Contas";
import Home from '../pages/Home'
import New from "../pages/New";
import RegContas from '../pages/RegContas'


import { AuthContext } from "../contexts/auth";
import CustomDrawer from "../components/CustomDrawer";
import Receber from "../pages/Receber";
import RegReceber from "../pages/RegReceber";

const AppDrawer = createDrawerNavigator();


function AppRoutes(){
    const {singOut} = useContext(AuthContext)
    return(

        <AppDrawer.Navigator
            drawerContent={(props)=> <CustomDrawer{...props}/>}
          
       screenOptions={{
           
           drawerActiveBackgroundColor:'#E57C00',
           drawerActiveTintColor:'#FFF',
           drawerInactiveBackgroundColor:'#D9D9D9',
           drawerInactiveTintColor:'#000',
           
       }}
        >


            <AppDrawer.Screen 
            options={{headerShown:false}}
            name="Home" component={Home}
            />

             <AppDrawer.Screen
            options={{headerShown:false}}
            name='A Receber' component={Receber}
            />
            
             <AppDrawer.Screen
            options={{headerShown:false}}
            name='Contas a Pagar' component={Contas}
            />
        
            <AppDrawer.Screen
            options={{headerShown:false, drawerLabel:'Registrar Movimentação' }}
            name='Registrar' component={New}
            />
            <AppDrawer.Screen
            options={{headerShown:false, drawerLabel:'Registrar Contas a Receber' }}
            name='RegReceber' component={RegReceber}
            />
            
            <AppDrawer.Screen 
            options={{headerShown:false, drawerLabel:'Registrar Contas a Pagar' }}
            name='RegContas' component={RegContas}
            />
           
          
           
        </AppDrawer.Navigator>

    )
}
export default AppRoutes;