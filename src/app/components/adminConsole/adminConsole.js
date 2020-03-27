import React, {Component} from 'react';
import UserSearch from '../usersSearch/usersSearch';
import PropTypes from "prop-types";
import AddNewUser from '../addNewUser/addNewUser';
class AdminConsole extends  Component{
  render(){
    const isUserLogIn = JSON.parse(localStorage.getItem('p202User'));

    if(!isUserLogIn ){
      this.props.history.push('/login');
    }
    else if(isUserLogIn && !isUserLogIn.isAdmin){
      this.props.history.push('/user/'+isUserLogIn.id);
    }
    return (
      <main>
        <div className="container animated fadeIn adminConsoleContainer">
          <AddNewUser/>
          <UserSearch history={history}/>
        </div>
      </main>
    );
  }
}
AdminConsole.propTypes = {
  history: PropTypes.any
};
export { AdminConsole };
