import React, { Component } from 'react';
import PropTypes from "prop-types";
import TitleTextBox from "../shared/titleTextBox";
import {logIn} from "../../services/UsersService";
import {Settings} from './settings';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null
    };
    this.onChangeTextBox = this.onChangeTextBox.bind(this);
  }
  logUser(){
    const {username, password} = this.state;
    logIn(username, password).then((res)=>{
      if(res.status === 200){
        const data = {
          id: res.data.id,
          isAdmin : res.data.isAdmin,
          username: res.data.username
        };
        localStorage.setItem('p202User', JSON.stringify(data));
        this.props.history.push('/user/'+res.data.id);
      }
      else{
        this.setState({error: res.message});
      }
    });
  }
  logOut(){
    localStorage.removeItem('p202User');
    window.location.reload(false);
  }
  onChangeTextBox(e){
    const textBox = e.target;
    let toChange = {error: null};
    toChange[textBox['id']]= textBox.value;
    this.setState(toChange);
  }
  render() {
    const { username, password, error} = this.state;
    const isUserLogIn = localStorage.getItem('p202User')?  JSON.parse(localStorage.getItem('p202User')) :  null;
    return (
      <div className={'container loginContainer'} >
        <div className={'text-center'}>
          {!isUserLogIn?
            <form className={'text-center animated fadeIn loginForm'}>
              <TitleTextBox
                onChange={this.onChangeTextBox}
                hint={'username'}
                id={'username'}
                value={username}
              />
              <TitleTextBox
                onChange={this.onChangeTextBox}
                hint={'password'}
                id={'password'}
                value={password}
                type={'password'}
              />
              {error? <div className={'error'}>{error}</div>  : null}
              <button className={'button'}
                      disabled={username.length === 0 || password.length === 0 }
                      onClick={(e) => {e.preventDefault(); this.logUser();}}>Log In</button>
            </form>
            :
            <div>
              <Settings />
              <button className={'button'}
                      onClick={(e) => {e.preventDefault(); this.logOut();}}>Log Out</button>
            </div>
            }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object
};

export {Login};
