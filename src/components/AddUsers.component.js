import React, { Component,useState,useEffect } from "react";
import Menus from './menus.component';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";

function AddUSers (props) {
    const [nom, setNom] = useState('');
    const [region, setRegion] = useState('');
    const [listRegion, setListRegion] = useState([]);
    const [password, setPassword] = useState('');
    const isLogged = props.isAuth;
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
            body: JSON.stringify({ username: nom,password : password,nomRegion:region})
        };
        const response = await fetch('https://signalproblem-app.herokuapp.com/users', requestOptions);
        const data = await response.json();
        
        if(data){
            history.push("/gestion-users");
        }else{
            alert('Login error');
        }
    }

    useEffect(() => {

        if(isLogged == false){
          history.push("/login");
        }else{
          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
        };
          const fetchData = async () => {
            const result = await fetch('https://signalproblem-app.herokuapp.com/regions', requestOptions);
            const data = await result.json();
            console.log(data);
            setListRegion(data._embedded.regions);
          };

          fetchData();
        }
      },[]);
      
      if(listRegion !=''){
        console.log(listRegion);
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
                    {listRegion.map((value,index) =>{
                      return(
                      <option value={value.nomRegion}>{value.nomRegion}</option>
                      )
                    })}
                        
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
