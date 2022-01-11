import React, { Component,useEffect,useState } from "react";
import Menus from './menus.component';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";

function EditUSers (props) {
    console.log(props);
    const [nom, setNom] = useState("" );
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("");
    const [listRegion, setListRegion] = useState([]);
    let ids = (props.user) ? props.user :""
    let history = useHistory();
    const [url_modif, setUrl_modif] = useState();
    const isLogged = props.isAuth;
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
    async function saveUSer(){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
            body: JSON.stringify({ username: nom,password : password,nomRegion:region})
            };
        const fetchData = async () => {
            const result = await fetch(url_modif, requestOptions);
            const data = await result.json();
            console.log(data);
        }
        await fetchData();
        history.push("/gestion-users");
    }
    function back(){
        history.push("/gestion-users");
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
            setListRegion(data._embedded.regions);
            

            const user = await fetch('https://signalproblem-app.herokuapp.com/users/search/findByUsername?username='+ids, requestOptions);
            const dataUser = await user.json();

            await setUrl_modif(dataUser._links.self.href);
            await setNom(dataUser.username);
            await setPassword(dataUser.password);
            setRegion(dataUser.nomRegion);

          };

          fetchData();
        }
      },[]);


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

                {/* <div className="form-group">
                    <label>Pseudo</label>
                    <input type="text" className="form-control" placeholder="Pseudo" />
                </div> */}

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={changePassword.bind(this)} value={password} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Région</label>
                    <select value={region} onChange={changeRegion.bind(this)} className="form-control">
                    {listRegion.map((value,index) =>{
                      return(
                      <option selected={(value.nomRegion == region) ? "selected" : "" } value={value.nomRegion}>{value.nomRegion}</option>
                      )
                    })}
                        
                    </select>
                </div>

                <button type="submit" onClick={saveUSer.bind(this)} className="btn btn-primary btn-block">Modifier</button>
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
