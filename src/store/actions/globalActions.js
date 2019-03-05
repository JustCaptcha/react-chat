export const userLogin = (value) => {
    return {
        type: 'USER_LOGIN',
        payload: value
    }
}

export const setUsername = (username) => {
    return {
        type: 'SET_USERNAME',
        payload: username
    }
}