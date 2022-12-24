export const INITIAL_MENU_OPTIONS_STATE = {
    menuOptions: [
        {
            name: "Przegląd",
            path: '/review'
        }, {
            name: 'Wyjaśnienie',
            path: '/justification'
        }, {
            name: 'Zarządzanie użytkownikami',
            path: '/userManagement'
        }
    ],
    promise:{
        isAvailible: false,
        isHidden: true
    }
}


const menuOptionsReducer = (state= INITIAL_MENU_OPTIONS_STATE, action) => {
    switch(action.type) {
        case 'SHOW_MENU_OPTIONS' :{
            return {
                ...state,
                promise:{
                    isAvailible: true,
                    isHidden: false
                }
            }
        }
        case 'HIDE_MENU_OPTIONS' :{
            return {
                ...state,
                promise:{
                    isAvailible: false,
                    isHidden: true
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default menuOptionsReducer