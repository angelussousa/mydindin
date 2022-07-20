import styled from "styled-components/native"

export const Background     = styled.View`
flex:1;
;
`

export const Input = styled.TextInput.attrs({
    placeholderTextColor:'#164F6F'
})`
background-color: #0A2E42;

border-radius: 10px;
width: 80%;
font-size: 17px;
padding-left: 10px;
margin-bottom: 15px;
color:#164F6F;
`

export const SubmitButton = styled.TouchableOpacity`
margin-top: 15px;
background-color: #D37A11;
height: 50px;
align-items: center;
justify-content: center;
width: 80%;
border-radius: 10px;
`

export const SubmitText = styled.Text`
text-align: center;
font-size: 20px;
font-weight: 900;
color: #FFF;

`
export const AreaBtnImage = styled.TouchableOpacity`
background-color: #ddd;
padding: 8px;
border-radius: 10px;
width: 80%;
height: 50px;
align-items: center;
justify-content: center;
`
export const BtnImage = styled.Text`
font-size: 16;
font-weight: bold;
color:#000;


`
export const TextBtnModal = styled.Text`
font-size: 18px;
margin: 5px;
color: #FFF;
align-items: center;
justify-content:center;
`

export const AreaBtnModal = styled.TouchableOpacity`
background-color: #280042;
padding-left: 15px;
padding-right: 15px;
border-radius: 10px;
margin-bottom: 10px;

`