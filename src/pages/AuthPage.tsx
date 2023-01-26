import { Button, FormControl, FormLabel, Input, InputGroup, Text, useToast, Wrap } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { service } from '../API/service';
import { AuthContext } from '../context';

function AuthPage() {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  
  function handleChangeLogin(event:React.FormEvent<HTMLInputElement>) {
    setLogin(event.currentTarget.value);
  };

  function handleChangePassword(event:React.FormEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  };

  function validation () {
    if (!login) {
      toast({
        description: "Enter login",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        description: "Minimum password length is 6 characters",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  async function loginHandler () {
    if (validation()) {
      const auth = await service.Auth(login, password);
      if (auth) {
        setIsAuth(true);
        navigate('/contacts');
        toast({
          description: "You are logged in",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          description: "Wrong login or password",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Wrap w={400} paddingTop="2rem" marginLeft="auto" marginRight="auto">
      <Text fontSize='6xl'>Authorization</Text>
              <FormControl>
                <FormLabel>Login</FormLabel>
                <Input 
                  placeholder='Login' 
                  bg='white' 
                  color='black' 
                  onChange={handleChangeLogin}/>
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input 
                  placeholder='Password' 
                  type='password' 
                  bg='white' 
                  color='black' 
                  onChange={handleChangePassword}/>
                </InputGroup>
              </FormControl>
      <Button 
        bg='#805ad5' 
        color='white' 
        w='100%' 
        onClick={loginHandler}>
        Login
      </Button>
    </Wrap>
  );
}

export default AuthPage;