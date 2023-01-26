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
    InputGroup
  } from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';
import { Contact } from '../store/contact';
import React, { useState } from 'react';

type ContactItem = {
  contact: Contact;
};

function EditContact(props: ContactItem) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState(props.contact.name);
    const [phone, setPhone] = useState(props.contact.phone);

    function editHandler () {
      props.contact.edit(name, phone);
      onClose();
    };

    function handleChangeName (e:React.FormEvent<HTMLInputElement>) {
      setName(e.currentTarget.value);
    };

    function handleChangePhone (e:React.FormEvent<HTMLInputElement>) {
      setPhone(e.currentTarget.value);
    };
  
    return (
      <>
        <Button onClick={onOpen}>Edit</Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit contact</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                  placeholder='Name' 
                  name='name' 
                  onChange={handleChangeName} 
                  value={name}
                  maxLength={30}/>
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Phone</FormLabel>
                <InputGroup>
                <InputLeftAddon children='+7' />
                <Input 
                  type='tel' 
                  placeholder='Phone number' 
                  name='phone' 
                  onChange={handleChangePhone} 
                  value={phone}/>
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button 
                colorScheme='blue' 
                mr={3} 
                onClick={editHandler}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default observer(EditContact);
