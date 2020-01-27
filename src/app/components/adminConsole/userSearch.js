import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUsers } from '../../store/actions/UsersActions';
import User from '../user/User';

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: null,
      userSearch: "",
      usersFound: []
    };
    this.onSelectUser = this.onSelectUser.bind(this);
    this.onChangeTextBox = this.onChangeTextBox.bind(this);
    this.filterUserSearch = this.filterUserSearch.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsers();
  }
  onSelectUser(userId){
    this.setState({selectedUserId: userId});
  }

  onChangeTextBox(e){
    const textBox = e.target;
    let toChange = {};
    toChange[textBox['id']]= textBox.value;
    this.setState(toChange);
    if(textBox['id'] === 'userSearch' && textBox.value.length > 2){
      this.filterUserSearch(textBox.value);
    }
  }
  filterUserSearch(search){
    let tempList = [];
    for(let user of this.props.users){
      if(user.name.toLowerCase().indexOf(search.toLowerCase()) > -1){
        tempList.push(user);
      }
    }
    this.setState({usersFound : tempList});
  }
  render() {
    const { users} = this.props;
    const {selectedUserId, userSearch, usersFound} = this.state;

    return (
      <div className={'usersContainer'}>
        <div className={'row'}>
          <div className={'searchBox col'}>
            <input type={'text'}
                   id={'userSearch'}
                   value={userSearch}
                   placeholder="search user" onChange={this.onChangeTextBox}/>
            <div className={'usersListContainer'}>
                {usersFound.map(function(user, i){
                  return (<div key={i}
                               onClick = {() => this.setState({selectedUser: user})}
                               className={'foundItem'}> {user.name} </div>);
                }.bind(this))}
            </div>
          </div>
          <div className={"col"}>
            <select value={selectedUserId || "placeholder" }
                    onChange={e=> {this.onSelectUser(e.target.value);}}>
              <option label="Select User" value="placeholder" disabled={true}  />
              {users.map(function(user, i){
                return (<option key={i} label={user.name} value={i} />);
              })}
            </select>
          </div>
        </div>
        <div className={'row'}>
          
        </div>
      </div>
    );
  }
}

UserSearch.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  failed: PropTypes.bool,
  users: PropTypes.array.isRequired
};

const mapStateToProps= state => {
  const { fetching, fetched, failed, users } = state.users;
  return { fetching, fetched, failed, users };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchUsers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);