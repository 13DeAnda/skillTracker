import React, { Component } from 'react';
import AddSkill from "../addSkill/addSkill";
import PropTypes from "prop-types";
import categories from '../../services/mockData/categories.json';
import levels from '../../services/mockData/levels.json';
import {updateUser} from "../../services/UsersService";
import _ from "lodash";
import TitleTextBox from "../shared/titleTextBox";

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      title: ""
    };
    this.addUser = this.addUser.bind(this);
  }

  addUser(){
    console.log("adding the user");
  }
  onChangeTextBox(e){
    const textBox = e.target;
    let toChange = {};
    toChange[textBox['id']]= textBox.value;
    this.setState(toChange);
  }


  render() {
    const {id, name, title} = this.state;
    return (
      <div className={'addUserContainer row'}>
        <div className={'col text-right'}>
          <button className={'button mainButton'}
                  type={"button"}
                  data-toggle="modal"
                  data-target="#addUserModal">
            Add New User
          </button>
        </div>


        <div className="modal" id="addUserModal" tabIndex="-1" role="dialog" aria-labelledby="addUserModal" aria-hidden="true">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-body ">
                <h4 className={'blueTitle'}>Add New User</h4>
                <div className={'row'}>
                  <div className={'col'}>
                    <TitleTextBox
                      onChange={this.onChangeTextBox}
                      title={'Id'}
                      id={'id'}
                      value={id}
                    />
                  </div>
                </div>
                <div className={'row'}>
                  <div className={'col'}>
                    <TitleTextBox
                    onChange={this.onChangeTextBox}
                    title={'Name'}
                    id={'name'}
                    value={name}
                    />
                  </div>
                  <div className={'col'}>
                    <TitleTextBox
                      onChange={this.onChangeTextBox}
                      title={'Title'}
                      id={'title'}
                      value={title}
                    />
                  </div>
                </div>


                  this will be the contents.
                <div  className={'text-right'}>
                  <button type="button" className="button cancel" data-dismiss="modal"> CANCEL</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

module.exports = AddNewUser;