// IMPORT PACKAGE REFERENCES

import React from 'react';
import { NavLink } from 'react-router-dom';

// COMPONENT
const logIn = false;
export const Header = () => (
    <nav className="navbar  navbar-light alert-dark row">
      <div className={'col-sm-3'}>
        <img src= {require("../../assets/images/p202Logo.png")}  height={'40px'}/>
      </div>
      <div className="col-sm-9 menu" id="menu">
        <div className="nav-item text-lef">
          <NavLink to='/' activeClassName='menu selected' exact={true}>Administration</NavLink>
        </div>
        <div className="text-right">
            <NavLink to='/login' activeClassName='menu selected' exact={true}>{logIn? 'Log In' : <i className="fa fa-user" /> }</NavLink>
        </div>
      </div>
    </nav>
);
