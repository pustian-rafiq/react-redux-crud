import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './style.css'
import {useSelector, useDispatch} from 'react-redux'
import {loadUsers, deleteUser} from '../redux/actions'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'
const columns = [
    {
        id: 'id',
        label: 'Serial',
        minWidth: 50,
        align: 'center',
        
      },
    { id: 'name', label: 'Name', minWidth: 130 },
    { id: 'email', label: 'Email', minWidth: 100 },
    {
      id: 'address',
      label: 'Address',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'contact',
      label: 'Contact',
      minWidth: 70,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
   

  ];
  
//   function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
//   }
  
  
  const useStyles = makeStyles({
    root: {
      width: '50%',
      margin: 100, 
    },
    container: {
      maxHeight: 440,
    },
    
  });


function Home() {

    const classes = useStyles();
    const history = useHistory()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const {users,loading} = useSelector( state => state.data)
    const dispatch = useDispatch()
    useEffect( ()=> {
        dispatch(loadUsers())
    },[])


//Delete user
const handleDelete = (id)=> {
  if(window.confirm("Are you sure to delete?")){
    dispatch(deleteUser(id))
    toast.success("User deleted successfully!")
  }else{
  toast.success("User not deleted!")
  }
}
if(loading){
 return <h1>loading.........</h1>
} 
    return (
        <>
        
      
        <div style={{float:'left',marginLeft:'100px'}}>
         <Button   color="primary" variant="contained" onClick={()=> history.push('/add-user')}>Add New User</Button>
        </div>
    
      <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead  className="tableHead">
            <TableRow  >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>

 
              ))}
              <TableCell  align="center"
                  >
               Actions
              </TableCell>
             
            </TableRow>
          </TableHead>
            <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        
                      </TableCell>
                      
                    );
                   
                  })}
                       <ButtonGroup variant="contained" aria-label="contained primary button group" style={{ margin:'7px 5px 7px 0'}}> 
                        <Button style={{marginRight:'5px'}} color="primary" onClick={()=> history.push(`/edit-user/${user.id}`)} >Edit</Button>
                        <Button  color="secondary" onClick={()=>handleDelete(user.id)}>Delete</Button>
                      
                     </ButtonGroup>
                  
                </TableRow>
              );
            })}
          </TableBody> 
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
        </>
    )
}

export default Home
