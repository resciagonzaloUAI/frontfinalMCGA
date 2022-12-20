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