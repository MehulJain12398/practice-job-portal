import './App.css';
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import { BrowserRouter as Router , Switch , Route} from "react-router-dom"
import Dashboard from './Components/Dashboard/Dashboard';
import Password from './Components/Password/Password';
import Portal from './Components/Portal/Portal';
import AddJob from './Components/Portal/AddJob';



function App() {
  return (
    <Router>
          <div className="App">
          <Switch>
            <Route path="/login">
            
              <Login />
            
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/password">
            <Password />
            </Route>

            <Route exact path="/portal">
            <Portal />
            </Route>

            <Route path="/addJob">
              <AddJob />
            </Route>
            

            <Route path="/">
              <Dashboard />
            </Route>

          </Switch>
          
          </div>
    </Router>

  );
}

export default App;
