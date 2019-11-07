import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUsers } from '../../store/actions/UsersActions';
import {LoadingIndicator} from '../shared/LoadingIndicator/LoadingIndicator';
import {Error} from '../shared/Error/Error';
import User from './user/user';

class Users extends Component {
  state = {
    selectedUser: null,
    selectedUserId: null,
    selectedCategory: null
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
    const {fetched, fetching, users, failed} = this.props;
    const {selectedUserId, selectedUser} = this.state;
    return (
      <div className={'usersContainer'}>
        {fetched ?
          <div>
            <select value={selectedUserId || "placeholder" }
                    onChange={e=> {this.onSelectUser(e.target.value);}}>
              <option label="Select User" value="placeholder" disabled={true}  />
              {users.map(function(user, i){
                    return (<option key={i} label={user.name} value={i} />);
              })}
            </select>
            {selectedUser? <User data={selectedUser} /> : null}
          </div>
          :
          <LoadingIndicator busy={fetching}/>
        }
        {failed? <Error message="Failed to fetch list of zip codes" /> : null}
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