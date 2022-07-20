import React, {useContext} from 'react';
import { Text, View, Image } from 'react-native';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import {AuthContext} from '../../contexts/auth';


export default function CustomDrawer(props) {
    
 const {user, signOut} = useContext(AuthContext)
  return (
   <DrawerContentScrollView {...props} style={{backgroundColor:'#1E3F52'}}>
       <View style={{ alignItems:'center', justifyContent:'center', marginTop:5 }}>
           <Image source={require('../../img/logo2.png')} 
           style={{width:100, height:100, marginTop:10, marginLeft:10 }}
           resizeMode='contain'
           />
           <Text style={{color:'#FFF', fontSize: 18, marginTop:0}}>
               Bem-vindo,</Text>

           <Text style={{color:'#FFF', fontSize: 18, fontWeight:'bold', marginBottom:15}}>
              {user && user.nome}</Text>
       </View>
        <DrawerItemList
        {...props}
        />
        <DrawerItem 
        
        {...props}
        label='Sair'
        onPress={()=> signOut()}
        
       
        inactiveBackgroundColor={'#9E1414'}
        inactiveTintColor={'#FFF'}
        />
   </DrawerContentScrollView>
  );
}