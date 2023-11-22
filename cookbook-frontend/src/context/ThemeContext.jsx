import { createContext, useEffect, useReducer } from 'react';

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, color: action.payload}
        case 'CHANGE_MODE':
            return {...state, mode: action.payload}
        default:
            return state
    }
};

export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#58249c',
        mode: 'dark'
    })

    let localStorageTheme = JSON.parse(localStorage.getItem('cookbookTheme'));

    useEffect(() => {
        // console.log('changed local storage');
        localStorage.setItem('cookbookTheme', JSON.stringify(state));
    }, [state])

    useEffect(() => {
        if (localStorageTheme) {
            // console.log('changed mode and color');
            const { color, mode } = localStorageTheme;
            dispatch({ type: 'CHANGE_COLOR', payload: color})
            dispatch({ type: 'CHANGE_MODE', payload: mode })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color})
    };

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    };

    return (
        <ThemeContext.Provider value={{...state, changeColor, changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}