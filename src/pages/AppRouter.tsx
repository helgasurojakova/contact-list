import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import {AuthContext} from '../context';
import { useContext } from 'react';

function AppRouter() {

    const {isAuth} = useContext(AuthContext);

    return (
        isAuth ?
        <Routes>
            {privateRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        key={route.path}
                    />
                )}
        </Routes>
        :
        <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        key={route.path}
                    />
                )}
        </Routes>
    )
};

export default AppRouter;