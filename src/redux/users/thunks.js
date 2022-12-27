import {
    getUser,
    getUserError,
    getUserLoading
} from './actions'

export const getUsers = (data) => async (dispatch) => {
    dispatch(getUserLoading());
    try {
        const response = await fetch('https://backend-mcga-final.vercel.app/Users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        const json = await response.json();
        if (response.status !== 200)
            return dispatch(getUserError(json));

        dispatch(getUser(json));
        localStorage.setItem("user", JSON.stringify(json.data));
    } catch (error) {
        dispatch(getUserError(error));
    }
}

export const login = (data) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        const json = await response.json();
        if (response.status !== 200)
            return dispatch(getUserError(json));

        localStorage.setItem("accessToken", JSON.stringify(json.data.token));
    } catch (e) {
        dispatch(getUserError(e));
    }
}