import { observer } from 'mobx-react-lite';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputLeftAddon,
    InputGroup,
    useToast
  } from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';
import { ContactStore } from '../store/contact';
import React, { useState } from 'react';

type ContactsList = {
  contacts: ContactStore;
};

function AddContact(props: ContactsList) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const toast = useToast();

    function addHandler () {
      if (name === '') {
        toast({
          description: "Enter name",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      };

      if (phone.length === 10) {
        const regex = /(\d?)(\d{3})(\d{3})(\d{2})(\d{2})/g;
        const subst = "+7$1 ($2) $3-$4-$5";
        const editedPhone = phone.replace(regex, subst);
        props.contacts.add(name, editedPhone);
        onClose();
        setName('');
        setPhone('');
      } else {
        toast({
          description: "Wrong phone number",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    function handleChangeName (e:React.FormEvent<HTMLInputElement>) {
      setName(e.currentTarget.value);
    };

    function handleChangePhone (e:React.FormEvent<HTMLInputElement>) {
      setPhone(e.currentTarget.value);
    };
  
    return (
      <>
        <Button 
          onClick={onOpen} 
          bg='#38a169' 
          color='white'>
          Add contact
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add contact</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                  placeholder='Name' 
                  name='name' 
                  onChange={handleChangeName} 
                  maxLength={30}/>
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Phone</FormLabel>
                <InputGroup>
                <InputLeftAddon children='+7' />
                <Input 
                  type='tel' 
                  placeholder='999 999 99 99' 
                  name='phone' 
                  onChange={handleChangePhone} 
                  maxLength={10} 
                  minLength={10} 
                  errorBorderColor='red'/>
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button 
                colorScheme='blue' 
                mr={3} 
                onClick={addHandler}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default observer(AddContact);
