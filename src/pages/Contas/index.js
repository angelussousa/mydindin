import React, {useContext, useState, useEffect} from 'react';

import {Container, 
        Background, 
        Lista, 
        FaixaCinza, 
        NomeUsuarioContas, 
        TextSaldo, 
        Saldo, TituloContas, Titulo, ViewLista, FaixaEntradaGastos, EntradasGastos
         } from './styles'

import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import {Text, Alert, ImageBackground, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import ListaContas from '../../components/ListaContas'
import IconUser from 'react-native-vector-icons/FontAwesome'
import IconEye from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'






export default function Contas() {

  const [mostraSaldo, setMostraSaldo] = useState(null)

  const navigation = useNavigation()
  const {user} = useContext(AuthContext)
  const uid = user && user.uid;
  const [listaPagar, setListaPagar] = useState([])
  const [saldo, setSaldo] = useState(0)




useEffect(()=>{

 
  
    async function loadLista(){

      //CARREGAR SALDO NA CONTAS A PAGAR
      firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
        setSaldo(snapshot.val().saldo)
         }
       )


        //EXIBIR LISTA DA MOVIMENTAÇÃO
      
          
        firebase.database().ref('contas')
        .child(uid)
       
        .limitToLast(100).on('value', (snapshot)=>{
         setListaPagar([]);
  
            snapshot.forEach((childItem)=>{
              let list = {
                key: childItem.key,
                valorConta: childItem.val().valorConta,
                descricao: childItem.val().descricao,
                dataVenc: childItem.val().dataVenc
              }
              setListaPagar(oldArray => [...oldArray, list].reverse())
               
            })
        })
    }
   
    loadLista()
    
  },[])


  function mostrarSaldo() {
    if(mostraSaldo === true){
      setMostraSaldo(false)
    }
    else{
      setMostraSaldo(true)
        } 
    };
    



    function deletar(data){
    
     
      Alert.alert(
        'Atenção',
        `Você deseja excluir ${data.descricao}. - R$ ${data.valorConta}?`,
        [
          {
            text: 'Cancelar',
            style:'cancel'
          },
          {
            text: 'Deletar',
            onPress: ()=> handleDelete(data)
          }
        ]
      )
  }
  
  
  async function handleDelete(data){
    await firebase.database().ref('contas').child(uid).child(data.key).remove()
    
  }






 return (
  <ImageBackground 
  style={{flex:1}}
  source={require('../../img/bg.png')}>

  <Background>

        <Header/>

        <Container>

        <FaixaCinza>
            {/* //ÁREA ICONE DO USUARIO */}
            <View style={{flexDirection:'row', marginLeft:20, marginTop:10}}>

              <View style={{backgroundColor:'#B5BAC1', alignItems:'center', justifyContent:'center',
               width:50, height:50, padding:4, borderRadius:100/2}}>

                  <IconUser
                    name='user'
                    size={35}
                    color='#FFF' />

              </View>

                   <NomeUsuarioContas><Text style={{color:'#FFF', fontFamily:'inter-bold'}}>Olá,</Text> {user && user.nome}</NomeUsuarioContas>

            </View>

           <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>

            <TextSaldo>SALDO EM CONTA</TextSaldo>
            <TouchableWithoutFeedback onPress={(value)=> mostrarSaldo(value)} >
             {mostraSaldo === true ? <Saldo>R$ {saldo.toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} </Saldo> : <Saldo> R$ <IconEye name='eye-off' size={25} color='#FFF' /> </Saldo> }
            </TouchableWithoutFeedback>
             
          
          
          </View>
          </FaixaCinza>

          
      </Container>
      <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'space-between'}}>
        
        
          <ViewLista>

            <FaixaEntradaGastos>
            <EntradasGastos>CONTAS A PAGAR</EntradasGastos>
            </FaixaEntradaGastos>

                    {/* ICONE PLUS */}

              <View style={{flexDirection:'row', alignItems:'baseline', alignContent:'space-between'}}>
            
                          <TouchableOpacity   
                          style={{marginTop:5}}
                          onPress={()=>navigation.navigate('RegContas')}>
                          <Icon name='plus-circle'
                                size={30}
                                color='#E57C00'
                                />
                          </TouchableOpacity>
                        

                     
             </View>

            
            </ViewLista>
          </View>
       <Lista
        showsVerticalScrollIndicator={false}
        data={listaPagar}
        keyExtractor={item => item.key}
        renderItem={({item})=> (<ListaContas data={item} deleteItem={deletar}  />)}
        />

          
</Background>
 
</ImageBackground>

  );
}