import * as types  from './actionTypes'
import axios from 'axios'


export const getUsers =(users)=> ({
   type: types.GET_USERS,
   payload: users
})
export const userDeleted =()=> ({
   type: types.DELETE_USER,
   
})
export const userAdded =()=> ({
   type: types.ADD_USER,
   
})

//Fetch user
export const loadUsers =()=> {
    return function(dispatch){
        axios.get(`${process.env.REACT_APP_API}`)
        .then(resp => {
            console.log("resp")
            dispatch(getUsers(resp.data))
        }).catch(error => console.log(error))
        
    }
}
// Delete User
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
//Add new user
export const addUser =(user)=> {
    return function(dispatch){
        axios.post(`${process.env.REACT_APP_API}`, user)
        .then(resp => {
            console.log("resp")
            dispatch(userAdded())
            //Delete user and load the users
            //dispatch(loadUsers())
        }).catch(error => console.log(error))
        
    }
}