import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../store/actions/UsersActions';
import {fetchSkills} from "../../store/actions/SkillsActions";
import {SearchBar} from "../shared/searchBar";

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: null,
      selectedUser: null,
      skillList: [],
    };
    this.onSelectUser = this.onSelectUser.bind(this);
    this.addSkill = this.addSkill.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchSkills();
  }
  onSelectUser(userId){
    this.setState({selectedUserId: userId});
  }
  addSkill(item){
    let list = this.state.skillList;
    list.push(item);
    this.setState({skillList: list});
  }

  render() {
    const { users, skills} = this.props;
    const {selectedUserId, skillList} = this.state;
    console.log("skills", skills);
    return (
      <div className={'usersContainer'}>
        <div className={'row userSearch'}>
          <div className={'searchBox col'}>
            <h4>Search user </h4> <br/>
            <SearchBar data={users} onClick = {(elem) => this.setState({selectedUser: elem})}/>
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
        <div className={'row skillSearch'}>
          <div className={'searchBox col'}>
            <h4>Search by skills </h4> <br/>
            <SearchBar data={skills} onClick = {this.addSkill}/>
            <div className={'skillsContainer'}>
              {skillList.map(function(item, i) {
                return (<div key={i} className={'tag'}> {item.name} </div>);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserSearch.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchSkills: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  failed: PropTypes.bool,
  users: PropTypes.array.isRequired,
  skills: PropTypes.any.isRequired
};

const mapStateToProps= state => {
  const { fetching, fetched, failed, users } = state.users;
  const {skills} = state.skills;
  return { fetching, fetched, failed, users, skills };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchUsers, fetchSkills }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);