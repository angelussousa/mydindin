import styled from "styled-components/native";

 

export const Background = styled.View`
flex:1;


`

export const Container = styled.View`

justify-content: center;
margin-bottom: 50px;
margin-top: -20px;

`

export const TituloContas = styled.Text`
font-size: 20px;
color:#EA7B15;
font-weight: bold;
justify-content: center;
align-items: center;

`
export const Saldo = styled.Text`
font-size: 22px;
color:#E57C00;
font-weight: bold;
margin-top: -40px;
margin-right: 20;
margin-bottom: 5;

`

export const Lista = styled.FlatList`
padding-top:22px;
height: 100%;
background-color: #F1f1f1;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
margin-left: 8px;
margin-right: 8px;

`
export const FaixaCinza = styled.View`

background-color: #DDD;

margin-bottom:70 ;
`
export const TextSaldo = styled.Text`
color: #fff;
font-size: 16;
margin-left: 85px;
font-family: 'Inter-bold';

margin-top: -60px;

`
      
export const FaixaEntradaGastos = styled.View`
width: 100%;
height: 35px;
background-color: #E7E7E7;
align-items: center;
justify-content: center;
align-content:center;
margin-top: 1;
`
export const NomeUsuarioContas = styled.Text`
font-size: 20px;
color:#E57C00;
font-family: 'Inter-bold';
font-family: 'Inter-bold';
font-weight: 800;
margin-left: 15;
`
export const ViewLista = styled.View.attrs({
    marginHorizontal:'15%', 
})`
width: 293px;
height: 90px;
background-color: #DDDDDD;
align-items: center;
justify-content: center;
align-content:center;
border-radius: 10;
z-index: 50px;
position: absolute;
elevation:10;
margin-top: -60px;
flex-direction: column;

` 
export const EntradasGastos = styled.Text`
color: #E57C00;
font-family: 'Inter-bold';
font-weight: 800;
font-size: 20;
height: 33;
width: 288px;
text-align: center;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2) ;
`     
export const View1 = styled.View`
justify-content: baseline;
`