import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";

function GererSignalement(props) {

      const [toRedirect, setToRedirect] = useState('');

      
      const isLogged = props.isAuth;
      let history = useHistory();

      
      useEffect(() => {
        console.log(isLogged);
        if(isLogged == false){
          setToRedirect('login')
        }
      });

     function Edit(){
        history.push("/edit-signalement");
      }

      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }
        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Gerer les signalements</h3>
              <div className="col-12">
              <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Region</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Vakinakaratra</td>
                    <td>
                        <button onClick={Edit.bind(this)} className="btn btn-info mr-2">Modifier</button>
                        <button className="btn btn-danger">Supprimer</button>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Vakinakaratra</td>
                    <td>
                        <button onClick={Edit.bind(this)} className="btn btn-info mr-2">Modifier</button>
                        <button className="btn btn-danger">Supprimer</button>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>Vakinakaratra</td>
                    <td>
                        <button onClick={Edit.bind(this)} className="btn btn-info">Modifier</button>
                        <button className="btn btn-danger">Supprimer</button>
                    </td>
                    </tr>
                </tbody>
                </table>
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

export default connect(states,setAuth)(GererSignalement);
