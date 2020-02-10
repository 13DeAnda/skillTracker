import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../store/actions/UsersActions';
import {fetchSkills} from "../../store/actions/SkillsActions";
import {SearchBar} from "../shared/searchBar";
import { withRouter } from 'react-router';
import AddSkill from "../addSkill/addSkill";
import {SkillSearch} from "../skillSearch/skillSearch";

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: null,
      selectedUser: null,
      skillList: [],
    };
    this.onSelectUser = this.onSelectUser.bind(this);
    this.addSkills = this.addSkills.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchSkills();
  }
  onSelectUser(userId){
    this.setState({selectedUserId: userId});
    this.props.history.push('/user/'+this.props.users[userId].id);
  }
  addSkills(skills){
    this.setState({skillList: skills});
  }


  render() {
    const { users,  history} = this.props;
    const {selectedUserId, skillList} = this.state;
    return (
      <div className={'usersContainer'}>
        <div className={'row userSearch'}>
          <div className={'searchBox col'}>
            <h4>Search user </h4> <br/>
            <SearchBar data={users} onClick = {(elem) => history.push('/user/'+elem.id)}/>
          </div>
          <div className={"col"}>
            <h4>. </h4> <br/>
            <select value={selectedUserId || "placeholder" }
                    onChange={e=> {this.onSelectUser(e.target.value);}}>
              <option label="Select User" value="placeholder" disabled={true}  />
                {users.map(function(user, i){
                  return (<option key={i} label={user.name} value={i} />);
                })}
            </select>
          </div>
        </div>
        <AddSkill onAdd={this.addSkills} level={true} title={'Search user By Skills'}/>
        <div className={'row'}>
          <div className={'col'}>
            <SkillSearch users={users} skillList={skillList} history={history}/>
          </div>
        </div>
      </div>
    );
  }
}

UserSearch.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchSkills: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  skills: PropTypes.any.isRequired,
  history: PropTypes.any
};

const mapStateToProps= state => {
  const { users } = state.users;
  const { skills } = state.skills;
  return { users, skills };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchUsers, fetchSkills }, dispatch)
);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSearch));