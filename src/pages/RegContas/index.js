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
 
    const [valorConta, setValorConta] = useState('')
    const [descricao, setDescricao] = useState('')
    const [dataVenc, setDataVenc] = useState('')
    const navigation = useNavigation()
    const {user} = useContext(AuthContext)

    const [boleto, setBoleto] = useState()
    const [modal, setModal] = useState(false)

    const uid = user.uid

    //  const storage = Firebase.storage.getReference(`img/boleto - ${uid}`).child(uid)
    //  const storageRef = storage.getReference()




function handleSubmit(){
  Keyboard.dismiss()

  if(isNaN(parseFloat(valorConta)) || descricao === '' ){
    Alert.alert('Atenção!','Preencha todos os campos corretamente.');
    return;
  }
  Alert.alert(
    "Confirmando dados.",
    `Descrição: ${descricao} \nData Venc: ${dataVenc}  \nValor: ${parseFloat(valorConta)}`,
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
    let key = await firebase.database().ref('contas').child(uid).push().key;
    await firebase.database().ref('contas').child(uid).child(key).set({
      descricao:descricao,
      valorConta: parseFloat(valorConta),
      dataVenc:dataVenc
    })
    
  Keyboard.dismiss()
  setValorConta('')
  setDescricao('')
  setDataVenc('')
  navigation.navigate('Contas a Pagar')
}


// UPAR BOLETO IMG



function openAlbum(){
  
  const options = {
    title:'Selecione uma imagem',
    chooseFromLibraryButtonTitle:'Procurar imagem...',
    noData: false,
    mediaType:'photo'
  }
  
  launchImageLibrary(options, (response)=> {

    const boleto1 = response.assets[0].uri
     
    if(response.didCancel){
      console.log('CANCEL')
      return;
    
    } else if(response.error){
      console.log('Ops...Algo errado por aqui!')
    
    } else{
      setModal(true)
      setBoleto(response.assets[0].uri)
    }
    
  })
  
}


async function uploadImg(){
 
 const storageRef = Firebase.storage().ref(`img/boleto - ${uid}`)


 
   await Firebase.storage().ref(`img/boleto - ${uid}`).child(uid).put(boleto)
  


console.log(boleto)

navigation.navigate('RegContas')

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
    value={descricao}
    onChangeText={(text)=> setDescricao(text)}
    placeholder='DIGITE UMA DESCRIÇÃO'
    />
    
    <Input
  
    keyboardType='numeric'
    returnKeyType='next'
    onSubmitEditing={()=> Keyboard.dismiss()}
    value={dataVenc}
    onChangeText={(text)=> setDataVenc(text)}
    placeholder='DIGITE A DATA DE VENCIMENTO'
    />

    <Input
    keyboardType='numeric'
    returnKeyType='next'
    onSubmitEditing={()=> Keyboard.dismiss()}
    value={valorConta}
    onChangeText={(text)=> setValorConta(text)}
    placeholder='DIGITE O VALOR'
    />

    {/* BOTÃO INSERIR IMAGEM */}

    <AreaBtnImage 
    activeOpacity={0.8}
    onPress={ openAlbum }
    >
        <BtnImage>Insira uma Imagem</BtnImage>
    </AreaBtnImage>


{/* ÁREA MODAL */}

    {boleto && 

      <Modal 
      style={{alignItems:'center', justifyContent:'center', alignContent:'center'}}
      animationType='slide' transparent={false} visible={modal}>
      
      <View style={{flex:1, flexDirection:'row', 
      justifyContent:'space-around', alignItems:'center', }}>

            <AreaBtnModal
            
            onPress={()=> setModal(false)}>

            <TextBtnModal >Fechar</TextBtnModal>

            </AreaBtnModal>
            <AreaBtnModal
            
            onPress={ uploadImg } data={boleto}>

            <TextBtnModal >Enviar Imagem</TextBtnModal>

            </AreaBtnModal>

            

      </View>
      <Image 
            style={{width:'80%', height:450, borderRadius:15,  marginHorizontal:40, marginBottom:20 }}
            source={{uri: boleto}}
            />
      </Modal>
    }
    
    

    <SubmitButton onPress={handleSubmit}>
      <SubmitText>REGISTRAR</SubmitText>
    </SubmitButton>
  </SafeAreaView>
</Background>
</ImageBackground>
</TouchableWithoutFeedback>
  );
}