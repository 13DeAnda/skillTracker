// IMPORT PACKAGE REFERENCES

import React from 'react';
import { NavLink } from 'react-router-dom';

// COMPONENT
const isUserLogIn = localStorage.getItem('p202User')? JSON.parse(localStorage.getItem('p202User')) : null;
export const Header = () => (
    <nav className="navbar  navbar-light alert-dark row">
      <div className={'col-sm-3'}>
        <NavLink to='/' activeClassName='menu ' exact={true}>
          <img src= {require("../../assets/images/p202Logo.png")}  height={'40px'}/>
        </NavLink>
      </div>
      <div className="col-sm-9 menu" id="menu">

          <div className="nav-item text-lef">
            {isUserLogIn && isUserLogIn.isAdmin?
            <NavLink to='/' activeClassName='menu selected' exact={true}>Administration</NavLink>
              :null}
          </div>
        <div className="text-right">
            <NavLink to='/login' activeClassName='menu selected' exact={true}>{!isUserLogIn? 'Log In' : <i className="fa fa-user" /> }</NavLink>
        </div>
      </div>
    </nav>
);
