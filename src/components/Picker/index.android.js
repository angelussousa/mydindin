import React from 'react';
import { Picker as RNPickerSelect } from '@react-native-picker/picker';
import {PickerView} from './styles'

export default function Picker({onChange, tipo}) {
 return (
   <PickerView>
       <RNPickerSelect
       style={{
          width: '100%',
          
       }}
       selectedValue={tipo}
       onValueChange={(valor)=> onChange(valor)}
   
       >
       <RNPickerSelect.Item  label='RECEITA' value='receita' color='#049301'  />
       <RNPickerSelect.Item  label='DESPESA' value='despesa' color='#C62c36'   />
       </RNPickerSelect>
   </PickerView>
  );
}