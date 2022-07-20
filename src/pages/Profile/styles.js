import styled from "styled-components/native";


export const Container   = styled.View`
flex:1;
background-color: #45005D;
align-items: center;

`

export const Nome = styled.Text `
text-align: center;
font-size: 30px;
color:#10b907;
font-weight: bold;
margin-top: 50px;
margin-bottom: 20px;
`

export const NewLink = styled.TouchableOpacity`
justify-content: center;
align-items: center;
background-color: #280042;
padding:7px;
border-radius: 7px;
margin-bottom: 10px;
border-width: 1;
border-color: #45005D;
elevation:25;
width: 80%;
`

export const TextLink = styled.Text`
font-size: 20px;
color:#FFF;
font-weight: bold;

`

export const Logout = styled.TouchableOpacity`
align-items: center;
justify-content: center;
width: 80%;
background-color: #87142A;
border-width: 1;
border-color: #9E1C29;
padding:7px;
border-radius: 7px;
margin-bottom: 10px;
elevation:25;


`

export const TextLogout = styled.Text`
font-size: 20px;
color:#FFF;
font-weight: bold;
`