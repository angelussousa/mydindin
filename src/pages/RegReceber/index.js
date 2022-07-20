import React, {useState, useContext} from 'react';
import { Alert,ImageBackground , Image, View, Text, Modal, SafeAreaView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Header from '../../components/Header'
import { AreaBtnModal, TextBtnModal, BtnImage, AreaBtnImage, Background, Input, SubmitButton, SubmitText} from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'
import firebase from '../../services/firebaseConnection'
import Firebase from 'firebase'


import {launchImageLibrary, ImagePicker } from 'react-native-image-picker'


export default function RegContas() {
 
    const [valorReceber, setValorReceber] = useState('')
    const [descricao, setDescricao] = useState('')
    const [cliente, setCliente] = useState('')


    const navigation = useNavigation()
    const {user} = useContext(AuthContext)

    const uid = user.uid

   


function handleSubmit(){
  Keyboard.dismiss()

  if(isNaN(parseFloat(valorReceber)) || descricao === '' ){
    Alert.alert('Atenção!','Preencha todos os campos corretamente.');
    return;
  }
  Alert.alert(
    "Confirmando dados.",
    `Cliente: ${cliente} \nDescrição: ${descricao} \nValor: ${parseFloat(valorReceber)}`,
    [
      {text: 'Cancelar',
      style:'cancel'
    },
    {
      text:'Continuar',
      onPress: () => handleAddConta()
    }

    ]
  )
}

// * ADICIONANDO UMA ENTRADA

  async function handleAddConta(){

    let uid = await firebase.auth().currentUser.uid
    let key = await firebase.database().ref('receber').child(uid).push().key;
    await firebase.database().ref('receber').child(uid).child(key).set({
      descricao:descricao,
      valorReceber: parseFloat(valorReceber),
      cliente: cliente
    })
    
  Keyboard.dismiss()
  setValorReceber('')
  setDescricao('')
  setCliente('')
  navigation.navigate('A Receber')
}



 return (

<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

<ImageBackground 
  style={{flex:1}}
  source={require('../../img/bg.png')}> 

<Background>
  <Header/>
  <SafeAreaView style={{alignItems:'center'}}>

    <Input
    returnKeyType='next'
    onSubmitEditing={()=> Keyboard.dismiss()}
    value={cliente}
    onChangeText={(text)=> setCliente(text)}
    placeholder='DIGITE O NOME DO CLIENTE'
    />

    <Input
    returnKeyType='next'
    onSubmitEditing={()=> Keyboard.dismiss()}
    value={descricao}
    onChangeText={(text)=> setDescricao(text)}
    placeholder='DIGITE UMA DESCRIÇÃO'
    />
    
    <Input
    keyboardType='numeric'
    returnKeyType='next'
    onSubmitEditing={()=> Keyboard.dismiss()}
    value={valorReceber}
    onChangeText={(text)=> setValorReceber(text)}
    placeholder='DIGITE O VALOR'
    />




      

    <SubmitButton onPress={handleSubmit}>
      <SubmitText>REGISTRAR</SubmitText>
    </SubmitButton>
  </SafeAreaView>
</Background>
</ImageBackground>
</TouchableWithoutFeedback>
  );
}