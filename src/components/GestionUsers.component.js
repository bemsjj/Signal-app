import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function GestionUsers(props) {

      const [toRedirect, setToRedirect] = useState('');
      const [listUsers, setListUsers] = useState([]);
      const [reloadDatas, setReloadDatas] = useState([]);

      
      const isLogged = props.isAuth;
      let history = useHistory();
      const token = props.isAuth;
      const [token_stored, setToken] = useState(token);

      console.log(token,'token');
      
       useEffect(() => {

        console.log(isLogged);
        if(isLogged == false){
          setToRedirect('login')
        }else{
          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
        };
          const fetchData = async () => {
            const result = await fetch('https://signalproblem-app.herokuapp.com/users', requestOptions);
            const data = await result.json();
            setListUsers(data._embedded.users);
          };

          fetchData();
        }
      },[reloadDatas]);

     function Edit(data){
        console.log(props);
        props.setUsers(data)
        history.push("/edit-user");
      }

      async function Supprimer(val){
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token_stored},
          };
        const user = await fetch('https://signalproblem-app.herokuapp.com/users/search/findByUsername?username='+val.username, requestOptions);
        const dataUser = await user.json();
        let linkDelete = dataUser._links.self.href;

        const requestOptions2 = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token_stored},
          };
        const userDeleted = await fetch(linkDelete, requestOptions2);
        setReloadDatas(val)

      }

      function goAdd(e){
        history.push("/add-users");
      }

      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }

      if(listUsers != ""){
        console.log(listUsers);
      }
      
      // console.log(props.users,'usersss');
        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Gestion des utilisateurs</h3>
              <button onClick={goAdd.bind(this)} className="btn btn-primary mb-3">Ajouter</button>
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
                  {listUsers.map((value,index) =>{
                      return(
                      <tr>
                        <th scope="row">1</th>
                        <td>{value.username}</td>
                        <td>{value.nomRegion}</td>
                        <td>
                            <button onClick={() => Edit(value.username)} className="btn btn-info mr-2">Modifier</button>
                            <button onClick={() => Supprimer(value)} className="btn btn-danger">Supprimer</button>
                        </td>
                      </tr>
                      )
                    })}
                </tbody>
                </table>
              </div>
            </div>
        );
}
const states = (state) => {
  return {
    isAuth : state.isAuth,
    users : state.users
  }
}

const setUsers = (dispatch) => {
  return {
    setUsers : (val) => {dispatch({type : 'SET_USER_DATA',value : val})}
  } 
}

export default connect(states,setUsers)(GestionUsers);
