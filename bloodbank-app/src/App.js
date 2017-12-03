import React, { Component } from 'react';
import Header from "./components/header/header";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import DonorList from "./components/donorlist/donorlist";
import RegisterDonor from "./components/registerdonor/registerdonor";
import DonorDetail from "./components/donordetail/donordetail";
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Header />
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/register-donor" component={RegisterDonor}/>
            <Route path="/donor-list" component={DonorList}/>
            <Route path="/donor-detail" component={DonorDetail} />
          </div>
        </Router>
    );
  }
}

export default App;
