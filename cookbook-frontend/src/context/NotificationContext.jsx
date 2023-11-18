import { createContext, useReducer } from 'react';

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'DISPLAY':
            return {...state, notification: action.payload}
        default:
            return state
    }
};

export function NotificationContextProvider({ children }) {
    const [state, dispatch] = useReducer(notificationReducer, {
        notification: {
            type: '',
            message: ''
        }
    })

    const displayNotification = (notification) => {
        dispatch({ type: 'DISPLAY', payload: notification})
    };

    return (
        <NotificationContext.Provider value={{...state, displayNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}