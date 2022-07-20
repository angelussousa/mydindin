import React, {useContext, useState, useEffect, useDebugValue} from 'react';
import {format, isPast} from 'date-fns'
import {Container,  
  ViewLista, FaixaEntradaGastos, EntradasGastos, 
  Background, NomeUsuario, Saldo,  Titulo,  Lista, FaixaCinza, TextSaldo, ViewIconeEnt} from './styles'
import firebase from '../../services/firebaseConnection';
import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import {Text, Platform, Switch, Alert, TouchableWithoutFeedback, View, TouchableOpacity, Button, RefreshControl } from 'react-native';
import { ImageBackground,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconCalendario from 'react-native-vector-icons/FontAwesome'
import IconUser from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'
import DatePicker from '../../components/DatePicker';
import IconEye from 'react-native-vector-icons/Feather'





export default function Home() {
    
  const navigation = useNavigation()
  const[showPicker, setShowPicker] = useState(false)

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0)
  const {user} = useContext(AuthContext)
  const [mostraSaldo, setMostraSaldo] = useState(null)
  const uid = user && user.uid;
  const [newDate, setNewDate] = useState(new Date())
 
 
  const [filtraTudo, setFiltraTudo] = useState(true)


 
 // RENDERIZAÇÃO CONDICIONAL DA LISTA ENTRADA E GASTOS

 {filtraTudo === true 



? useEffect(()=>{



  //CARREGAR SALDO NA HOME

  async function loadList(){
       firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
        setSaldo(snapshot.val().saldo)
        
      });

      //EXIBIR LISTA DA MOVIMENTAÇÃO
      
      firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(100).on('value', (snapshot)=>{
       setHistorico([]);

          snapshot.forEach((childItem)=>{
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              referencia: childItem.val().referencia,
              dataApp: childItem.val().date
            }
             setHistorico(oldArray => [...oldArray, list].reverse())
             
          })
      })
  }
 
  loadList()
  
},[newDate, filtraTudo])



: useEffect(()=>{



  //CARREGAR SALDO NA HOME

  async function loadList(){
       firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
        setSaldo(snapshot.val().saldo)
        
      });

      //EXIBIR LISTA DA MOVIMENTAÇÃO
      
      firebase.database().ref('historico')
      .child(uid)
      
      .limitToLast(100).on('value', (snapshot)=>{
       setHistorico([]);

          snapshot.forEach((childItem)=>{
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              referencia: childItem.val().referencia,
              dataApp: childItem.val().date
            }
             setHistorico(oldArray => [...oldArray, list].reverse())
             
          })
      })
  }
 
  loadList()
  
},[newDate, filtraTudo])
  
} 
//FIM DA RENDERIZAÇÃO CONDICIONAL DA LISTA ENTRADAS E GASTOS



function deletar(data){
    if( isPast(new Date(data.date)) ){
      Alert.alert('Atenção!', 'Você não pode mais excluir essa entrada.')
      return;
    }

    Alert.alert(
      'Atenção',
      `Você deseja excluir ${data.referencia}. - \n R$ ${data.valor}?`,
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
  await firebase.database().ref('historico').child(uid).child(data.key).remove()
  .then(async()=>{
    let saldoAtual = saldo;
    data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor)
  
    await firebase.database().ref('users').child(uid)
    .child('saldo').set(saldoAtual)
    
  })
  .catch((error)=>{
    console.log(error)
  })

}

//MOSTRAR OU OCULTAR SALDO NA HOME

function mostrarSaldo() {
if(mostraSaldo === true){
  setMostraSaldo(false)
}
else{
  setMostraSaldo(true)
    } 
};

function handleShowPicker(){

  setShowPicker(true)

}

function handleClose(){
  setShowPicker(false)
}


const onChange = (date) =>{
    setShowPicker(Platform.OS === 'ios');
    setNewDate(date)
    
    
}





function filtrarTudo(){
  if( filtraTudo === true){
    setFiltraTudo(false)
    
    
  }else{
    setFiltraTudo(true)
    

  }
  console.log(filtraTudo)

}


 return (

  <ImageBackground 
  style={{flex:1}}
  source={require('../../img/bg.png')}>
<Background >
        <Header/>

        <Container >

          <FaixaCinza>
            {/* //ÁREA ICONE DO USUARIO */}
            <View style={{flexDirection:'row', marginLeft:20, marginTop:10,  
            }}>
              <View style={{backgroundColor:'#B5BAC1', alignItems:'center', justifyContent:'center',
               width:50, height:50, padding:4, borderRadius:100/2}}>
            <IconUser
            name='user'
            size={35}
            color='#FFF'
                       />
            </View>
            <NomeUsuario><Text style={{color:'#FFF', fontFamily:'inter-bold'}}>Olá,</Text> {user && user.nome} </NomeUsuario>
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
            <EntradasGastos>ENTRADAS E GASTOS</EntradasGastos>
            </FaixaEntradaGastos>

                    {/* ICONE PLUS */}

              <View style={{flexDirection:'row', alignItems:'baseline', alignContent:'space-between', justifyContent:'space-between'}}>
              <TouchableOpacity onPress={ filtrarTudo}>
              <Text style={{fontSize:10,  position:'relative', marginLeft:-125, paddingRight:50, color:'#E57C00' } }>{filtraTudo === false ? 'Registros do dia' : 'Mostrar Tudo'}</Text> 
              </TouchableOpacity>        
                          <TouchableOpacity   
                          style={{marginTop:5}}
                          onPress={()=>navigation.navigate('Registrar')}>
                          <Icon name='plus-circle'
                                size={30}
                                color='#E57C00'
                                />
                          </TouchableOpacity>

                          
                               {/* ICONE CALENDARIO  */}

                               <TouchableOpacity 
                               style={{position:'absolute', right:-120, marginTop:5}}
                               onPress={handleShowPicker}>
                        <IconCalendario
                              name='calendar'
                              size={25}
                              color='#FFF'
                             
                              
                              />
                          </TouchableOpacity>


                     
             </View>

             
          </ViewLista>
          

      </View>
      
        <Lista
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item})=> (<HistoricoList data={item} deleteItem={deletar}  />)}
        
        />
        
{
  showPicker &&
   (
    <DatePicker
    onClose={handleClose}
    date={newDate}
    onChange={onChange}
    />
  )
}
          
</Background>
</ImageBackground>

  );
}