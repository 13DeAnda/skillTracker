import React, { Component } from 'react';
import TitleTextBox from "../shared/titleTextBox";
import {resetPassword} from "../../services/UsersService";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySettingsModal: false,
      currentPassword: "",
      newPassword: "",
      resetError: null
    };
    this.onChangeTextBox = this.onChangeTextBox.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  onChangeTextBox(e){
    const textBox = e.target;
    let toChange = {};
    toChange[textBox['id']]= textBox.value;
    toChange['resetError'] = null;
    this.setState(toChange);
  }
  changePassword(){
    const username = JSON.parse(localStorage.getItem('p202User')).username;
    const {currentPassword, newPassword} = this.state;
    resetPassword(username, currentPassword, newPassword,).then((res)=> {
      if(res.status === 200){

        const button = document.getElementById('cancelResetButton');
        button.click();
      }
      else{
        this.setState({resetError: res.message});
      }
    });
  }

  render() {
    let {newPassword, currentPassword, resetError} = this.state;
    return (
      <div className={'container settingsContainer'} >
        <button type="button"
                data-toggle="modal"
                className="button"
                data-target="#changePasswordModal">Change Password</button>


        <div className="modal text-center" id="changePasswordModal" tabIndex="-1" role="dialog" aria-labelledby="changePasswordModal" aria-hidden="true">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-body ">
                <div className={'row'}>
                  <div className={'col'}>
                    <TitleTextBox
                      onChange={this.onChangeTextBox}
                      hint={'current Password'}
                      id={'currentPassword'}
                      type={"password"}
                      value={currentPassword}
                    />
                  </div>
                </div>
                <div className={'row'}>
                  <div className={'col'}>
                    <TitleTextBox
                      onChange={this.onChangeTextBox}
                      hint={'new Password'}
                      id={'newPassword'}
                      type={"password"}
                      value={newPassword}
                    />
                  </div>
                </div>

                {resetError?
                  <div className="text-center error">
                    **{resetError}**
                  </div>
                  :null}
                <div  className={' text-center'}>
                  <button type="button"
                          className="button"
                          disabled={resetPassword.length === 0 || newPassword.length === 0}
                          onClick={this.changePassword} > CHANGE PASSWORD</button>
                  <button id={'cancelResetButton'} data-dismiss="modal" type="button" className="button cancel" > CANCEL</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export {Settings};
