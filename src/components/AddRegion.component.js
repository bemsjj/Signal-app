import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";


function AddRegion(props) {

      const [toRedirect, setToRedirect] = useState('');
      const [nomRegion, setNomRegion] = useState('');

      
      const isLogged = props.isAuth;
      let history = useHistory();

      
      useEffect(() => {
        console.log(isLogged);
        if(isLogged == false){
          setToRedirect('login');
        }

      });

      function Back(){
        history.push("gestion-region");
      }

      async function Valider(){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nomRegion: nomRegion })
        };
        
        const response = await fetch('http://localhost:8080/region', requestOptions);
        const data = await response.json();
        console.log(data);
        // history.push("gestion-region");
      }

      function changeNomRegion(e){
        setNomRegion(e.target.value)
      }

      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }
        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Add Region</h3>
              <button onClick={Back.bind(this)} className="btn btn-info">Retour</button>
              <div className="col-12">
                <div className="form-group">
                    <label for="exampleInputEmail1">Nom du region</label>
                    <input value={nomRegion} onChange={changeNomRegion.bind(this)} type="text" className="form-control" placeholder="Nom du region" />
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

export default connect(states,setAuth)(AddRegion);
