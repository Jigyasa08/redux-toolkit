import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'


const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUserfailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => { 
    switch(action.type) {
        case FETCH_USERS_REQUESTED: 
            return {
                ...state,
                loading: true,
            }
                
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
            }
        default: 
            return state;
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUserRequest())
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                // res.data
                const users = response.data.map((user) => user.id)
                dispatch(fetchUserSuccess(users))
            }).catch (err => {
                // err.message
                dispatch(fetchUserfailed(err.message))
            })
    }
}




const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())


