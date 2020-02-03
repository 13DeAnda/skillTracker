import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../store/actions/UsersActions';
import {fetchSkills} from "../../store/actions/SkillsActions";
import {SearchBar} from "../shared/searchBar";
import {SkillSearch} from "../skillSearch/skillSearch";
import { withRouter } from 'react-router';
import AddSkill from "../shared/addSkill";

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
    this.deleteSkill = this.deleteSkill.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchSkills();
  }
  onSelectUser(userId){
    this.setState({selectedUserId: userId});
    this.props.history.push('/user/'+this.props.users[userId].id);
  }
  addSkill(item){
    let list = this.state.skillList;
    let match = false;
    for(let skill of this.state.skillList){
      if(skill.id === item.id){
        match = true;
        break;
      }
    }
    if(!match){
      list.push(item);
      this.setState({skillList: list});
    }

  }

  deleteSkill(item){
    let temp = [];
    for(let skill of this.state.skillList){
      if(skill.id !== item.id){
        temp.push(skill);
      }
    }
    this.setState({skillList: temp});
  }


  render() {
    const { users, skills, history} = this.props;
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
        <div className={'row skillSearch'}>
          <AddSkill onAdd={()=>{}}/>
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