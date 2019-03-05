import global from '../data/globalData';

export default (state = global, action) => {
    switch(action.type) {
        case 'USER_LOGIN': {
            return {
                ...state,
                isAuthorised: true
            }
        }
        case 'SET_USERNAME': {
            return {
                ...state,
                username: action.payload
            }
        }
        default: return global;
    }
}