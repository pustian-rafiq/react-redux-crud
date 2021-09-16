import {Switch, Route}  from 'react-router-dom'
import Home from './pages/Home'
import AddUser from './pages/AddUser'
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add-user" component={AddUser} />
      </Switch>
        <ToastContainer />
    </div>
  );
}

export default App;
