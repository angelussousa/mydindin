import styled from "styled-components/native"

export const Background     = styled.View`
flex:1;
;

`

export const Input = styled.TextInput.attrs({
    placeholderTextColor:'#164F6F', fontWeight:'600'
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
