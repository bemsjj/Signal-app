import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";

function GestionUsers(props) {

      const [toRedirect, setToRedirect] = useState('');
      const [listUsers, setListUsers] = useState('');

      
      const isLogged = props.isAuth;
      let history = useHistory();
      const token = props.isAuth;
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
        fetch('http://signalproblem-app.herokuapp.com/users', requestOptions).then(response => response.json())
        .then((res) => {
          let data = res._embedded.users;
          console.log(data,"fffffff");
          setListUsers(data)
          console.log(listUsers,"eeeeeeee");
        })
        }

      },[]);

      function TextDecoderStream(data){
        alert(test)
      }
     function Edit(data){
       console.log(props);
        props.setUsers(data)
        history.push("/edit-user");
      }

      function goAdd(e){
        history.push("/add-users");
      }

      if(isLogged == false){
        return <Redirect to={toRedirect} />;
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
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Vakinakaratra</td>
                    <td>
                        <button onClick={() => Edit('test')} className="btn btn-info mr-2">Modifier</button>
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
    isAuth : state.isAuth,
    users : state.users
  }
}

const setUsers = (dispatch) => {
  return {
    setUsers : (val) => {dispatch({type : 'SET_USER_LISTS',value : val})}
  } 
}

export default connect(states,setUsers)(GestionUsers);
