import React, {useState, useContext}from 'react';
import { ActivityIndicator } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {Logo, Titulo, Botao1, TextoBotao, Background, Container, AreaInput, Input,
Link, LinkText} from './styles'
import { AuthContext } from '../../contexts/auth';
import { ImageBackground } from 'react-native';


export default function SignIn() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const { signIn, loadingAuth } = useContext(AuthContext)
    
    function handleLogin(){
      signIn(email, senha)
    }
   
 return (

  <ImageBackground 
  style={{flex:1}}
  source={require('../../img/bg.png')}>
   

      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >
        <Logo source={require('../../img/logo2.png')}/>
                    
        <AreaInput>
            <Input style={{color:'#FFF'}}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            
            />
        </AreaInput>
        <AreaInput>
            <Input style={{color:'#FFF'}}
            placeholder="Senha"
            onChangeText={(text)=> setSenha(text)}
            value={senha}
            secureTextEntry={true}
            />
        </AreaInput>

        <Botao1 onPress={handleLogin}>
          {
            loadingAuth ? ( <ActivityIndicator size={25} color='#fff'/>) 
            : (
              <TextoBotao>ENTRAR</TextoBotao>
              )
          }
          
        </Botao1>
        
        <Link onPress={()=> navigation.navigate('SignUp')}>
            <LinkText>Criar uma Conta</LinkText>
        </Link>
      </Container>

  
  </ImageBackground>
  );
}