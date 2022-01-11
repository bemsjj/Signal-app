import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import MenusFront from './menusFront.component';

function Dashboard(props) {

      const [toRedirect, setToRedirect] = useState('');

      
      const isLogged = props.isAuth;

      
      useEffect(() => {
        console.log(isLogged);
        if(isLogged == false){
          setToRedirect('login')
        }
      });
      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }
        return (
            <div className="container container_page">
              <div>
                <MenusFront />
              </div>
              
                <h3>Dashboard</h3>
                <div className="row">
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Nombre par region</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Nombre par status</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Nombre total</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
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
export default connect(states,setAuth)(Dashboard);
