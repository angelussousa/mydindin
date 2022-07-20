import React, {useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native'
import {ViewDesc, TextDesc, ViewLixo, ViewContas, DataText, View, RefText, Container, Tipo, IconView, TipoText, ValorText} from './styles'
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';





export default function ListaContas({data, deleteItem, }) {



 return (
  <TouchableOpacity 
  activeOpacity={0.8}
  onLongPress={() => deleteItem(data)}>
     <Container >
    
    <ViewDesc>
        <TextDesc>Descrição</TextDesc>
        <TextDesc style={{marginLeft:-5}}>Data de Venc.</TextDesc>
        <TextDesc style={{marginRight:10}}>Valor</TextDesc>
    </ViewDesc>

    <View>
        
        
          <ViewContas>  
      <ValorText>{data.descricao} </ValorText>
      
      </ViewContas> 
    
          
            <DataText>{data.dataVenc}</DataText> 

    <RefText>R$ {data.valorConta.toFixed(2).replace('.',',')}</RefText>

   
    </View>
    
</Container>
</TouchableOpacity>



  );


}