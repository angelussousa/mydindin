import React, {useState, useContext}from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import {Logo, Titulo, Botao1, TextoBotao, Background, Container, AreaInput, Input,
} from '../SignIn/styles'


export default function SignIn() {
  
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  
  const {signUp, loadingAuth} = useContext(AuthContext)
    
    function handleSignUp(){
      signUp(email, password, nome)
    }
 return (

  <ImageBackground 
  style={{flex:1}}
  source={require('../../img/bg.png')}>

   

      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >
        <Logo 
        
        source={require('../../img/logo2.png')}/>

        <AreaInput>
            <Input style={{color:'#FFF'}}
            placeholder="Nome"
            onChangeText={(text) => setNome(text)}
            value={nome}
            />
        </AreaInput>

        <AreaInput>
            <Input style={{color:'#FFF'}}
            placeholder="Email"
            onChangeText={(texto) => setEmail(texto)}
            value={email}
            />
        </AreaInput>

        <AreaInput>
            <Input style={{color:'#FFF'}}
            placeholder="Senha"
            onChangeText={(text)=> setPassword(text)}
            value={password}
            secureTextEntry={true}
            />
        </AreaInput>
      

        <Botao1 onPress={handleSignUp}>
        {
            loadingAuth ? ( <ActivityIndicator size={25} color='#fff'/>) 
            : (
              <TextoBotao>CADASTRAR</TextoBotao>
            )
          }
          
        </Botao1>
        
      </Container>

 
  </ImageBackground>
  );
}