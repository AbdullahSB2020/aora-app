

import { getLoggedInUser } from '@/lib/app-write';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';


export type User = {
    $id: string;
    username: string;
    email: string;
    accountId: string;
    avatar: string;
};

const GlobalContext = createContext({
    isLoggedIn: false,
    user: {
        $id: "",
        username: "",
        email: "",
        accountId: "",
        avatar: "",
    },
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
    const [user, setUser] = useState<User>({
        $id: "",
        username: "",
        email: "",
        accountId: "",
        avatar: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLoggedInUser()
            .then((res) => {
                setUser({
                    $id: res.$id,
                    username: res.username,
                    email: res.email,
                    accountId: res.accountId,
                    avatar: res.avatar,
                });
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