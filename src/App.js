import {Switch, Route}  from 'react-router-dom'
import Home from './pages/Home'
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
        <ToastContainer />
    </div>
  );
}

export default App;
