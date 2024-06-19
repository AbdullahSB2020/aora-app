

import { getLoggedInUser } from '@/lib/app-write';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';



const GlobalContext = createContext({
    isLoggedIn: false,
    user: {},
    isLoading: true,
    setUser: (user: any) => {},
    setIsLoggedIn: (loggedIn: boolean) => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

type GlobalProviderProps = {
    children: ReactNode;
};
const GlobalProvider = ({ children }: GlobalProviderProps ) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLoggedInUser()
            .then((res) => {
                setUser(res);
                setIsLoggedIn(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoggedIn(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        <GlobalContext.Provider 
            value={{
                isLoggedIn,
                user,
                isLoading,
                setUser,
                setIsLoggedIn,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;