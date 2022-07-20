import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/auth'
import {useNavigation} from '@react-navigation/native'
import {Container, Nome, NewLink, TextLink, Logout, TextLogout} from './styles'
import Header from '../../components/Header';

export default function Profile() {


    const navigation = useNavigation()
    const {user, signOut} = useContext(AuthContext)

 return (

   <Container>
            <Header/>

       <Nome>{user && user.nome}</Nome>
        <NewLink onPress={ ()=> navigation.navigate('Registrar')} >
            <TextLink>Registrar Gastos</TextLink>
        </NewLink >
        <Logout onPress={()=>signOut()}>
            <TextLogout>Sair</TextLogout>
        </Logout>
   </Container>
  );
}