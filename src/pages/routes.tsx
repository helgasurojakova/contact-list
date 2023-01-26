import AuthPage from './AuthPage';
import ContactsPage from './ContactsPage';


export const privateRoutes = [
    {path: '/contacts', element: <ContactsPage/>},
    {path: '*', element: <ContactsPage/>}
];

export const publicRoutes = [
    {path: '/auth', element: <AuthPage/>},
    {path: '*', element: <AuthPage/>}
];