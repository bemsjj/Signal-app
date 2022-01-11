import React, {useState} from "react";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


 function LoginFront(props) {

    const [username, setUsername] = useState('test@gmail.com');
    const [password, setPassword] = useState('test');
    const [redirect, setRedirect] = useState('');
    const [toRedirect, setToRedirect] = useState('');
      
    async function login() {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React POST Request Example' })
        // };
        // const response = await fetch('http://localhost:8080/', requestOptions);
        // const data = await response.json();
        props.setAuth(true);
        setRedirect(true)
        setToRedirect("dashboard-front")
      }

      function onChageUserName(e){
        const username = e.target.value;
        setUsername(username)
      }

      function onChangePassword(e){
        const password = e.target.value;
        setPassword(password)
      }

        if (redirect) {
            return <Redirect to={toRedirect} />;
        }
        return (
            <div className="login_container">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="navbar-brand" to={"/login"}>Signaler</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
            
            <div className="auth-wrapper">
        <div className="auth-inner">
            <div>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={username} onChange={onChageUserName.bind(this)} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={onChangePassword.bind(this)} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Region</label>
                    <select className="form-control">
                        <option>Vakinankaratra</option>
                        <option>Analamanga</option>
                    </select>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={login.bind(this)} className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </div>
            </div>
            </div>
            </div>
        );
}
const states = (state) => {
    return {
      isAuth : state.isAuth
    }
  }
  const setAuth = (dispatch) => {
    return {
      setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})}
    } 
  }
export default connect(states,setAuth)(LoginFront);
