import React, { Component } from 'react';
import TitleTextBox from "../shared/titleTextBox";
import {bindActionCreators} from "redux";
import {fetchUsers} from "../../store/actions/UsersActions";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import {addUser} from "../../services/UsersService";
import PropTypes from "prop-types";

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      title: ""
    };
    this.addUser = this.addUser.bind(this);
    this.onChangeTextBox = this.onChangeTextBox.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers().then(()=>{
      this.setState({id: this.props.users.length +1});
    });
  }

  addUser(){
    const {id, name, title} = this.state;
    const data = {
      id: id,
      name: name,
      title: title,
      password:  Math.random().toString(36).slice(-8),
      categories: {}
    };
    addUser(data).then((res)=>{
      // TODO: needs to send password to user
      this.props.history.push('/user/'+res.data.id);
    });
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
        <div className={'col text-center'}>
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
                      disabled={true}
                      title={'Id'}
                      id={'id'}
                      value={id.toString()}
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
                </div>
                <div className={'row'}>
                  <div className={'col'}>
                    <TitleTextBox
                      onChange={this.onChangeTextBox}
                      title={'Title'}
                      id={'title'}
                      value={title}
                    />
                  </div>
                </div>


                <div  className={' text-right'}>
                  <button type="button"
                          className="button"
                          data-dismiss="modal"
                          disabled={!name.length && !title.length}
                          onClick={this.addUser} > ADD USER</button>
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

AddNewUser.propTypes = {
  users: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  history: PropTypes.object
};
const mapStateToProps= state => {
  const { users } = state.users;
  return { users };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchUsers}, dispatch)
);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNewUser));
