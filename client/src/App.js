import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Signin from "./components/SignIn/SignIn";
import Signup from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </BrowserRouter>

  );
}

export default App;
