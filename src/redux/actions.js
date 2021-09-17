import * as types  from './actionTypes'
import axios from 'axios'


 const getUsers =(users)=> ({
   type: types.GET_USERS,
   payload: users
})
  const userDeleted =()=> ({
   type: types.DELETE_USER,
   
})
  const userAdded =()=> ({
   type: types.ADD_USER,
   
})
  const userUpdated =()=> ({
   type: types.UPDATE_USER,
   
})
  const getUser=(user)=> ({
   type: types.GET_SINGLE_USER,
   payload: user
   
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
//Get Single user for edit
export const getSingleUser =(id)=> {
    return function(dispatch){
        axios.get(`${process.env.REACT_APP_API}/${id}`)
        .then(resp => {
            console.log(resp)
            dispatch(getUser(resp.data))
            
        }).catch(error => console.log(error))
        
    }
}
//Update Single user 
export const updateUser =(user,id)=> {
    return function(dispatch){
        axios.put(`${process.env.REACT_APP_API}/${id}`,user)
        .then(resp => {
            console.log("resp:"+resp)
            dispatch(userUpdated(resp.data))
            
        }).catch(error => console.log(error))
        
    }
}