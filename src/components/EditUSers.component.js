import React, { Component,useState } from "react";
import Menus from './menus.component';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";

function EditUSers (props) {
    const [nom, setNom] = useState((props.user.username) ? props.user.username :"" );
    const [region, setRegion] = useState((props.user.region) ? props.user.region :"");
    const [password, setPassword] = useState((props.user.password) ? props.user.password :"");
    let history = useHistory();
    function changeNom(e){
        setNom(e.target.value);
    }

    function changeRegion(e){
        setRegion(e.target.value);
    }

    function changePassword(e){
        setPassword(e.target.value);
    }
    function saveUSer(){
        
    }
    function back(){
        history.push("/gestion-users");
    }
        return (
            <div className="container container_page">
                <div>
                    <Menus />
                </div>
                <h3>Modifier un compte</h3>
                <button className="btn btn-primary" onClick={back.bind(this)}>Retour</button>
                <div className="form-group">
                    <label>Nom</label>
                    <input value={nom} onChange={changeNom.bind(this)} type="text" className="form-control" placeholder="Nom" />
                </div>

                <div className="form-group">
                    <label>Région</label>
                    <select onChange={changeRegion.bind(this)} className="form-control">
                        <option>Vakinankaratra</option>
                        <option>Analamanga</option>
                    </select>
                </div>

                {/* <div className="form-group">
                    <label>Pseudo</label>
                    <input type="text" className="form-control" placeholder="Pseudo" />
                </div> */}

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={changePassword.bind(this)} value={password} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Créer</button>
            </div>
        );
    
}
const states = (state) => {
    return {
      isAuth : state.isAuth,
      user : state.user
    }
  }
  
  const setAuth = (dispatch) => {
    return {
      setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})}
    } 
  }
export default connect(states,setAuth)(EditUSers);
