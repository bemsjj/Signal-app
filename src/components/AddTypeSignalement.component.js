import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";


function AddTypeSignalement(props) {

      const [toRedirect, setToRedirect] = useState('');

      
      const isLogged = props.isAuth;
      let history = useHistory();

      
      useEffect(() => {
        console.log(isLogged);
        if(isLogged == false){
          setToRedirect('login');
        }
        
      });

      function Back(){
        history.push("gerer-type-signalement");
      }

      function Valider(){
        history.push("gerer-type-signalement");
      }

      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }

        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Ajouter type Signalement</h3>
              <button onClick={Back.bind(this)} className="btn btn-info">Retour</button>
              <div className="col-12">
                <div className="form-group">
                    <label for="exampleInputEmail1">Nom du type de signalement</label>
                    <input type="email" className="form-control" placeholder="Nom du type de signalement" />
                </div>
                <div className="form-group text-left">
                    <label for="exampleInputEmail1" className="label_color">Couleur du type de signalement</label>
                    <input type="color" className="color_input" />
                </div>
                <div className="form-group">
                    <button onClick={Valider.bind(this)} className="btn btn-success">Valider</button>
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

export default connect(states,setAuth)(AddTypeSignalement);
