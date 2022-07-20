import styled from "styled-components/native";





export const Container = styled.KeyboardAvoidingView`
flex:1;
align-items: center;
justify-content: center;

`
export const AreaInput = styled.View`


`
export const Input = styled.TextInput.attrs({
    placeholderTextColor:'#164F6F'
})`
background-color: #0A2E42;
padding: 10px;
margin: 8px;
width: 350px;
font-size: 17px;
border-radius: 10px;

`
export const Logo = styled.Image`
height: 200px;
width: 200px;


`
 

export const Titulo = styled.Text`
color:#43B444;
font-size: 28px;
margin-bottom: 10px;
`

export const Botao1 = styled.TouchableOpacity`
background-color: #D37A11;
padding: 8px;
border-radius: 10px;
width:350px;
justify-content: center;
align-items: center;
elevation:10;
margin-top: 8px;


`

export const TextoBotao = styled.Text`
font-size: 20px;
color: #FFF;
font-family: 'Trebuchet MS';
font-weight: bold;

`
export const Link = styled.TouchableOpacity`
margin-top: 5px;
`
export const LinkText = styled.Text `
font-weight: bold;
color:#636363
`