import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: action.payload}
        default:
            return state
    }
};

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    let localStorageVal = JSON.parse(localStorage.getItem('cookbookUser'));
    
    if(state.user === null) {
        if (localStorageVal) {
            dispatch({ type: 'LOGIN', payload: localStorageVal})
        }
    }

    useEffect(() => {
        localStorage.setItem('cookbookUser', JSON.stringify(state.user))
    }, [state.user])

    const loginUser = (data) => {
        dispatch({ type: 'LOGIN', payload: data})
    };

    const logoutUser = () => {
        localStorageVal = null;
        localStorage.removeItem('cookbookUser')
        dispatch({ type: 'LOGOUT', payload: null })
    };

    return (
        <AuthContext.Provider value={{...state, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}