import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import { Redirect } from 'react-router'

function MenusFront(props){
    const [toRedirect, setToRedirect] = useState('');
    const [redirect, setRedirect] = useState('');
    function Logout(){
        props.setAuth('');
        setToRedirect('login');
        setRedirect(true)
      }

      if(redirect == true){
        return <Redirect to={toRedirect} />;
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>Signaler</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to={"/dashboard"}>Accueil</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={"/gerer-signalement-front"}>Signalements</Link>
                    </li>
                    <li className="nav-item">
                    <div className="nav-link" onClick={Logout.bind(this)} >Déconnexion</div>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
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
  export default connect(states,setAuth)(MenusFront);