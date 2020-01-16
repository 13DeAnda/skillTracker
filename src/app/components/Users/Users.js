import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUsers } from '../../store/actions/UsersActions';
import User from './user/user';

class Users extends Component {
  state = {
    selectedUser: null,
    selectedUserId: null,
    selectedCategory: null,
    searchUser: ""
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchUsers();
  }

  onSelectUser(userId){
    this.setState({selectedUserId: userId, selectedUser : this.props.users[userId]});
  }

  render() {
    const { users} = this.props;
    const {selectedUserId, selectedUser, searchUser} = this.state;

    return (
      <div className={'usersContainer'}>
          <div>
            <div className={'searchBox'}>
              <input type={'text'} value={searchUser} onChange={(e) =>{}}/>
            </div>
            <select value={selectedUserId || "placeholder" }
                    onChange={e=> {this.onSelectUser(e.target.value);}}>
              <option label="Select User" value="placeholder" disabled={true}  />
              {users.map(function(user, i){
                    return (<option key={i} label={user.name} value={i} />);
              })}
            </select>
            {selectedUser? <User data={selectedUser} /> : null}
          </div>
      </div>
    );
  }
}

Users.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);