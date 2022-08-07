import React, {useContext, useState, useEffect} from 'react';

import {Container, 
        Background, 
        Lista, 
        FaixaCinza, 
        NomeUsuarioContas, 
        TextSaldo, 
        Saldo, TituloContas, Titulo, ViewLista, FaixaEntradaGastos, EntradasGastos
         } from './styles'
import {format, isPast} from 'date-fns'
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import {Text, Alert, ImageBackground, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import ListaReceber from '../../components/ListaReceber'
import IconUser from 'react-native-vector-icons/FontAwesome'
import IconEye from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'






export default function Contas() {
    const {user:usuario} = useContext(AuthContext)
  const [mostraSaldo, setMostraSaldo] = useState(null)

  const navigation = useNavigation()
  const {user} = useContext(AuthContext)
  const uid = user && user.uid;
  const [listaReceber, setListaReceber] = useState([])
  const [saldo, setSaldo] = useState(0)
  const [referencia, setReferencia] = useState('')
  const [cliente, setCliente] = useState('')
  const [tipo, setTipo]  = useState('') 
  const [valorReceber, setValorReceber] = useState('')



useEffect(()=>{

 
  
    async function loadLista(){

      //CARREGAR SALDO NA CONTAS A PAGAR
      firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
        setSaldo(snapshot.val().saldo)
         }
       )


        //EXIBIR LISTA DA MOVIMENTAÇÃO
      
          
        firebase.database().ref('receber')
        .child(uid)
       
        .limitToLast(100).on('value', (snapshot)=>{
         setListaReceber([]);
  
            snapshot.forEach((childItem)=>{
              let list = {
                key: childItem.key,
                valorReceber: childItem.val().valorReceber,
                descricao: childItem.val().descricao,
                cliente: childItem.val().cliente
              }
              setListaReceber(oldArray => [...oldArray, list].reverse())
               
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
        `Valor já Recebido? ${data.cliente}. \nR$ ${data.valorReceber}?`,
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
    await firebase.database().ref('receber').child(uid).child(data.key).remove()
    .then(async()=>{
        let saldoAtual = saldo;
        let uid = usuario.uid
        let tipo = 'receita'
        let valorReceber = data.valorReceber
        let referencia = data.cliente
    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo:tipo,
      valor: parseFloat(valorReceber),
      referencia: referencia,
      date: format(new Date(), 'dd/MM/yyyy')
    })
         saldoAtual += parseFloat(data.valorReceber) 
      
        await firebase.database().ref('users').child(uid)
        .child('saldo').set(saldoAtual)
       
      })
      .catch((error)=>{
        console.log(error)
      })
    
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
            <EntradasGastos>VALORES A RECEBER</EntradasGastos>
            </FaixaEntradaGastos>

                    {/* ICONE PLUS */}

              <View style={{flexDirection:'row', alignItems:'baseline', alignContent:'space-between'}}>
            
                          <TouchableOpacity   
                          style={{marginTop:5}}
                          onPress={()=>navigation.navigate('RegReceber')}>
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
        data={listaReceber}
        keyExtractor={item => item.key}
        renderItem={({item})=> (<ListaReceber data={item} deleteItem={deletar}  />)}
        />

          
</Background>
 
</ImageBackground>

  );
}