import styled from "styled-components/native";




export const Container  = styled.View.attrs({
   marginHorizontal:10
})`
margin-bottom: 5px;
padding: 10px;
elevation:9;
background-color:#fafafa ;
border-radius: 10;
margin-top: 10;

`  

export const Tipo = styled.View`
flex-direction: row;
`

export const IconView = styled.View`
flex-direction: row;
background-color: ${props=> props.tipo === 'despesa' ? '#C62c36' : '#049301'};
padding-bottom: 3px;
padding-top: 3px;
padding-left: 8px;
padding-right: 8px;
border-radius: 5px;

`

export const TipoText = styled.Text`
color:#FFF;
font-size: 13px;
font-style: italic;


`

export const ValorText = styled.Text`
color: #222;
font-size:18px;
font-weight: bold;
`

export const RefText = styled.Text`
font-size: 17;
font-weight: bold;
font-family: 'Inter-bold';
align-items: center;
color:#000;

text-align: center;


`

export const View = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;


`
export const DataText = styled.Text`
color: #CF9C3380;
font-style: italic;
margin-left: 30;
`
export const ViewIcons = styled.View`
flex-direction: row;
align-items: center;

`

export const ViewRef = styled.View`
width: 130px;
`