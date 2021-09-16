import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addUser} from '../redux/actions'
import {toast} from 'react-toastify'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));

function AddUser() {
  const [userState, setUserSate] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });
  const [error, setError] = useState("")
  const {name, email,address, contact} = userState;
    const classes = useStyles();
     const history = useHistory()
     const dispatch = useDispatch()

  const changeHandler=(e)=>{
    const {name, value} = e.target;
    setUserSate({...userState,[name]: value})
  }
  const submitHandler=(e)=>{
     e.preventDefault();
      if(!name || !email || !address || !contact){
        setError("Please fill all the input fields");
      }else{
        dispatch(addUser(userState))
        history.push("/")
        setError("")
        toast.success("New user added successfully!")
      }
  }


  return (
      <div style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px', margin:'100px auto', width:'50%', background: 'lightblue',textAlign:'center'}}>
      <div>
        <Button onClick={()=> history.push("/")} variant="contained" style={{marginRight:'5px', float:'right'}} color="primary">Back User Lists</Button>
        
      </div>
       <h2>Add New User form</h2>                
                      
 {error && <h1 style={{color:'red'}}>{error}</h1>}
    <form className={classes.root} noValidate autoComplete="off" style={{padding:'50px'}} onSubmit={submitHandler}>
       
       
      <TextField  size="small" id="outlined-basic" label="Name" variant="outlined" type="text" value={name} name="name" onChange={changeHandler} /> <br/>
      <TextField  size="small" id="outlined-basic" label="Email" variant="outlined" type="email" value={email} name="email" onChange={changeHandler} /> <br/>
      <TextField  size="small" id="outlined-basic" label="Address" variant="outlined" type="text" value={address} name="address" onChange={changeHandler} /><br/>
      <TextField  size="small" id="outlined-basic" label="Contact" variant="outlined" type="text" value={contact} name="contact" onChange={changeHandler}/><br/>

        <Button  variant="contained" style={{}} color="primary" type="submit"> Submit</Button>
    </form>
    </div>
  );
}

export default AddUser
