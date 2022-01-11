import React, { Component,useState } from "react";
import Menus from './menus.component';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";

function AddUSers (props) {
    const [nom, setNom] = useState('');
    const [region, setRegion] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const token = props.isAuth;
    function changeNom(e){
        setNom(e.target.value);
    }

    function changeRegion(e){
        setRegion(e.target.value);
    }

    function changePassword(e){
        setPassword(e.target.value);
    }

    function goBack(e){
        history.push("/gestion-users");
    }
    async function saveUSer(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
            body: JSON.stringify({ username: nom,password : password})
        };
        const response = await fetch('http://signalproblem-app.herokuapp.com/users', requestOptions);
        const data = await response.json();
        
        if(data){
            history.push("/gestion-users");
        }else{
            alert('Login error');
        }
    }
        return (
            <div className="container container_page">
                <div>
                    <Menus />
                </div>
                <h3>Créer un compte</h3>
                <button onClick={goBack.bind(this)} className="btn btn-primary">Retour</button>
                <div className="form-group">
                    <label>Nom</label>
                    <input value={nom} onChange={changeNom.bind(this)} type="text" className="form-control" placeholder="Nom" />
                </div>


                <div className="form-group">
                    <label>Password</label>
                    <input value={password} onChange={changePassword.bind(this)} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Région</label>
                    <select value={region} onChange={changeRegion.bind(this)} className="form-control">
                        <option>Vakinankaratra</option>
                        <option>Analamanga</option>
                    </select>
                </div>

                <button onClick={saveUSer.bind(this)} className="btn btn-primary btn-block">Créer</button>
            </div>
        );
    
}
const states = (state) => {
    return {
      isAuth : state.isAuth,
    }
  }
  
  const setAuth = (dispatch) => {
    return {
      setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})}
    } 
  }
export default connect(states,setAuth)(AddUSers);
