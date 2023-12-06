import { createContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);

    const signIn = async (credentials) => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: credentials
        }
        const response = await fetch("http://localhost:5000/users", fetchOptions);

        if (response.status === 200) {
            const user = await response.json();
            setAuthUser(user);
            return user;
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    const signOut = () => {
        setAuthUser(null);
    };

    return (
        <UserContext.Provider value={{
            authUser,
            actions: {
                signIn,
                signOut
            }
        }}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContext;