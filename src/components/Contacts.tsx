import { observer } from 'mobx-react-lite';
import { Button, Table, Tbody, Td, Th, Tr, Wrap } from '@chakra-ui/react';
import React from 'react';
import AddContact from './AddContact';
import { ContactStore } from '../store/contact';
import EditContact from './EditContact';

const contacts = new ContactStore();

function Contacts() {

    function deleteHandler (e: React.MouseEvent, id: number) {
        contacts.delete(id);
    };

    return (
        <Wrap  
            w={800} 
            paddingTop="2rem" 
            marginLeft="auto" 
            marginRight="auto"> 
            <AddContact contacts={contacts}/>
            <Table>
                <Tbody>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Phone</Th>
                        <Th width={300}></Th>
                    </Tr>
                    {contacts.contacts.map((contact) => {
                    return (
                    <Tr key={contact.id}>
                        <Td>{contact.name}</Td>
                        <Td>{contact.phone}</Td>
                        <Td>
                            <EditContact contact={contact}/>
                            <Button 
                                marginLeft={10} 
                                bg='#E53E3E' 
                                color='white' 
                                onClick={e => deleteHandler(e, contact.id)}>
                                Delete
                            </Button>
                        </Td>
                    </Tr>
                    );
                    })}
                </Tbody>
            </Table>
        </Wrap>
    )
}

export default observer(Contacts);