import styled from "styled-components/native";




export const Container  = styled.View.attrs({
   marginHorizontal:10
})`
margin-bottom: 5px;
padding: 10px;
elevation:9;
background-color:#fafafa ;
border-radius: 10px;
margin-top: 10px;
`  


export const ViewLixo = styled.View`
flex-direction: row;

`

export const ViewDesc = styled.View`
justify-content: space-between;
align-items: baseline;
flex-direction: row;
border-bottom-width: 1px;


`
export const ViewContas = styled.View`
width: 130px;
`
export const ValorText = styled.Text`
color: #C62c36;
font-size:18px;
font-weight: bold;
margin-top:10px;
`

export const RefText = styled.Text`
font-size: 15;
font-weight: bold;
align-items: center;
color:#000;
margin-top: 10px;
margin-right: 15px;
`
export const View = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;


`
export const DataText = styled.Text`
color: #CF9C3380;
font-style: italic;
margin-top: 8px; 
margin-left: -25px;
`

export const TextDesc = styled.Text`
font-weight: bold;
color: #000;

`