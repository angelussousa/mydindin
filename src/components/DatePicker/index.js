import React, {useState} from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import  DateTimePicker  from '@react-native-community/datetimepicker';

import { Container, Header } from './styles';
import { Button } from 'react-native';



export default function DatePicker({date, onClose, onChange }) {
    
    
    const[dataHoje, setDataHoje] = useState(new Date(date))

 return (
<Container>
    {Platform.OS === 'ios' && (
        <Header>
            <TouchableOpacity onPress={onClose}>
                <Text>Fechar</Text>
            </TouchableOpacity>

        </Header>
    )}
    
    <DateTimePicker
    value={dataHoje}
    mode="date"
    display="default"
    onChange={(e, d) => {
        const currentDate = d || dataHoje;
        setDataHoje(currentDate);
        onChange(currentDate)
    }}
    
    />
</Container>
  );
}