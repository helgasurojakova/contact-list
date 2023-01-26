import { Box, Button, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

function Navbar () {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    function logoutHandler() {
        setIsAuth(false);
        localStorage.removeItem('auth');
        navigate('/auth');
    };

    return (
        <Box bg='#805ad5' w='100%' p={4} color='black'>
            <Flex justify={'flex-end'}>
                <Button onClick={logoutHandler}>Logout</Button>
            </Flex> 
        </Box>
    )
}
export default Navbar;