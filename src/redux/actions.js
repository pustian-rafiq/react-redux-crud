import * as types  from './actionTypes'
import axios from 'axios'


export const getUsers =(users)=> ({
   type: types.GET_USERS,
   payload: users
})
export const userDeleted =()=> ({
   type: types.DELETE_USER,
   
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

export const deleteUser =(id)=> {
    return function(dispatch){
        axios.delete(`${process.env.REACT_APP_API}/${id}`)
        .then(resp => {
            console.log("resp")
            dispatch(userDeleted())
            //Delete user and load the users
            dispatch(loadUsers())
        }).catch(error => console.log(error))
        
    }
}