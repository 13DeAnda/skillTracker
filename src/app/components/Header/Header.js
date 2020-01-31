// IMPORT PACKAGE REFERENCES

import React from 'react';
import { NavLink } from 'react-router-dom';

// COMPONENT

export const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-light alert-dark">
      <img src= {require("../../assets/images/p202Logo.png")} alt={"something"} height={'40px'}/>
        <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <div className="nav-link">
                        <NavLink to='/' activeClassName='menu selected' exact={true}>Administration</NavLink>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
);