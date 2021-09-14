import * as types  from './actionTypes'
import axios from 'axios'


export const getUsers =(users)=> ({
   type: types.GET_USERS,
   payload: users
})

export const loadUsers =()=> {
    return function(dispatch){
        axios.get(`${process.env.REACT_APP_API}`)
        .then(resp => {
            console.log("resp")
            dispatch(getUsers(resp.data))
        }).catch(error => console.log(error))
        
    }
}