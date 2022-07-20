import React, {useEffect} from 'react';
import {TouchableOpacity, Text} from 'react-native'
import {ViewIcons, DataText, ViewRef,View, RefText, Container, Tipo, IconView, TipoText, ValorText} from './styles'
import Icon from 'react-native-vector-icons/Feather'
import  Swipeable  from 'react-native-gesture-handler/Swipeable';

export default function HistoricoList({data, deleteItem, filtraR, filtraD}) {




 return (
  
     <Container >
   
    <Tipo>
        <ViewIcons>
               <IconView tipo={data.tipo}>
                   <Icon 
            name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
            color="#FFF"
            size={20}
            />
       
                   <TipoText>{data.tipo}</TipoText>
            
                   </IconView>
           <TouchableOpacity onPress={() => deleteItem(data)}>      
          <Icon 
            name={'trash-2'}
            color="#000"
            size={20}
            />
           </TouchableOpacity>
        </ViewIcons>
    </Tipo>

    <View>
        
            
      <ValorText>{data.tipo  === 'receita' ? `R$ ${data.valor.toFixed(2).replace('.',',')}` : `R$ -${data.valor.toFixed(2).replace('.',',')}`} </ValorText>
            <DataText>{data.dataApp}</DataText> 
<ViewRef>
    <RefText>{data.referencia}</RefText>

</ViewRef>
    </View>
    
</Container>




  );


}