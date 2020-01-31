import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../store/actions/UsersActions';
import {fetchSkills} from "../../store/actions/SkillsActions";
import {SearchBar} from "../shared/searchBar";
import { withRouter } from 'react-router';

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: null,
      selectedUser: null,
      skillList: [],
      usersFound: []
    };
    this.onSelectUser = this.onSelectUser.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.searchUserWithSkills = this.searchUserWithSkills.bind(this);
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
  searchUserWithSkills(){
    const {skillList} = this.state;
    const {users} = this.props;
    let usersFound = [];
    for(let user of users){
      let skillsFound = 0;
      for(let category of user.categories){
        for(let requiredSkill of skillList){
          for(let userSkill of category.skills){
            if(requiredSkill.id === userSkill.id){
              skillsFound++;
              break;
            }
          }
        }
      }
      if(skillsFound === skillList.length){
        usersFound.push(user);
      }
    }
    this.setState({usersFound: usersFound});
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
    const {selectedUserId, skillList, usersFound} = this.state;
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
          <div className={'searchBox col'}>
            <h4>Search by skills </h4> <br/>
            <div className={'row'}>
              <div className={'col'}>
                <SearchBar data={skills} onClick = {this.addSkill}/>
              </div>
              <div className={'col'}>
                <button className={'button'}
                        disabled={!skillList.length}
                        onClick={this.searchUserWithSkills}>Search User With these skills</button>
              </div>
            </div>
            <div className={'row skillsContainer'}>
              {skillList.map(function(item, i) {
                return (<div key={i} className={'tag'}>
                  <div className={'deleteIcon'} onClick={()=>{this.deleteSkill(item);}}>x</div>
                  {item.name}
                  </div>);
              })}
            </div>
            {usersFound.length? <h4> Found Matches: </h4> :null}
            <table className={'row table userListContainer'}>
              <tbody>
              {usersFound.map(function(user, i) {
                return (
                  <tr  key={i} >
                    <td onClick = {() => history.push('/user/'+user.id)}>
                      {user.name} {user.id}
                    </td>
                  </tr>);
              })}
              </tbody>
            </table>
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