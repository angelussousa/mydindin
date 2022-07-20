import React, {useState, useContext} from 'react';
import { Alert, ImageBackground, SafeAreaView, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header'
import {  Background, Input, SubmitButton, SubmitText} from './styles'
import Picker from '../../components/Picker'
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'

export default function New() {
 
    const [valor, setValor] = useState('')
    const [tipo, setTipo] = useState('receita')
    const [referencia, setReferencia] = useState('')
    const [dataApp, setDataApp] = useState('')
    const navigation = useNavigation()
    const {user:usuario} = useContext(AuthContext)


function handleSubmit(){
  Keyboard.dismiss()
  if(isNaN(parseFloat(valor)) || tipo === null){
    Alert.alert('Atenção!','Preencha todos os campos corretamente.');
    return;
  }
  Alert.alert(
    "Confirmando dados.",
    `Descrição: ${referencia} \nTipo: ${tipo === 'receita' ? 'Receita' : 'Despesa'}  \nValor: ${parseFloat(valor)}`,
    [
      {text: 'Cancelar',
       style:'cancel'
    },
    {
      text:'Continuar',
      onPress: () => handleAdd()
    }

    ]
  )
}

// * ADICIONANDO UMA ENTRADA

  async function handleAdd(){
    let uid = usuario.uid
    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo:tipo,
      valor: parseFloat(valor),
      referencia: referencia,
      date: format(new Date(), 'dd/MM/yyyy')
    })
  
        // *Atualizar o SALDO

  let user = firebase.database().ref('users').child(uid);
  await user.once('value').then((snapshot) =>{
        let saldo = parseFloat(snapshot.val().saldo)
        
      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);
  })
  Keyboard.dismiss()
  setValor('')
  setReferencia('')
  navigation.navigate('Home')
}



 return (
<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
<ImageBackground 
  style={{flex:1}}
  source={require('../../img/bg.png')}>

   <Background >
     <Header/>
     <SafeAreaView style={{alignItems:'center'}}>
       <Input
              returnKeyType='next'
       onSubmitEditing={()=> Keyboard.dismiss()}
       value={referencia}
       onChangeText={(text)=> setReferencia(text)}
       placeholder='DIGITE UMA DESCRIÇÃO'
       />
       
       <Input
       keyboardType='numeric'
       returnKeyType='next'
       onSubmitEditing={()=> Keyboard.dismiss()}
       value={valor}
       onChangeText={(text)=> setValor(text)}
       placeholder='DIGITE O VALOR'
       />

       <Picker onChange={setTipo} tipo={tipo}/>

       <SubmitButton onPress={handleSubmit}>
        
         <SubmitText>REGISTRAR</SubmitText>

       </SubmitButton>
     </SafeAreaView>
   </Background>
   </ImageBackground>
</TouchableWithoutFeedback>
  );
}