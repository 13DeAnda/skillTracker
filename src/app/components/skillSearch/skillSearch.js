import React, { Component } from 'react';
import PropTypes from 'prop-types';
import levels from "../../services/mockData/levels";

class SkillSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFound: [],
      partialUsersMatch: []
    };
    this.searchUserWithSkills = this.searchUserWithSkills.bind(this);
  }
  searchUserWithSkills(){
    const {users, skillList} = this.props;
    let usersFound = [];
    let partialUsersMatch = [];
    for(let user of users){
      let skillsFound = 0;
      for(let category of user.categories){
        let skillMatch = 0;
        for(let requiredSkill of skillList){
          for(let userSkill of category.skills){
            if(requiredSkill.id === userSkill.id){
              const userLevel = levels[userSkill.skillLevel[userSkill.skillLevel.length-1].level];
              const requiredLevel = levels[requiredSkill.level];
              if(userLevel >= requiredLevel){
                skillMatch += 100;
              }
              else{
                skillMatch -= (requiredLevel - userLevel)*25;
              }
              skillsFound++;
              break;
            }
          }
        }

        skillMatch = skillMatch/skillList.length;
        user.match = skillMatch;
      }

      console.log("partial skills Found on user", user.name, skillsFound);
      if(skillsFound === skillList.length){
        usersFound.push(user);
      }
      else if(skillsFound > 0){
        partialUsersMatch.push(user);
      }
    }

    this.setState({usersFound: usersFound, partialUsersMatch: partialUsersMatch});
  }

  render() {
    const { history, skillList} = this.props;
    const {  usersFound, partialUsersMatch } = this.state;
    let userList = usersFound;
    if(usersFound.length < 3){
      userList = userList.concat(partialUsersMatch);
    }
    return (
      this.props.users.length > 0?
        <div className={'skillSearchContainer'}>
            <div className={'row'}>
              <div className={'col'}>
                <button className={'button'}
                        disabled={!skillList.length}
                        onClick={this.searchUserWithSkills}>Search User With these skills</button>
              </div>
            </div>
            {userList.length? <h4> Found Matches: </h4> :null}
            <table className={'row table userListContainer'}>
              <tbody>
              {userList.map(function(user, i) {
                return (
                  <tr  key={i} >
                    <td onClick = {() => history.push('/user/'+user.id)}>
                      {user.name}
                    </td>
                    <td><b>{user.title} </b></td>
                    <td>{user.match} %</td>
                  </tr>);
              })}
              </tbody>
            </table>
        </div>
        :null
    );
  }
}

SkillSearch.propTypes = {
  users: PropTypes.array.isRequired,
  skillList: PropTypes.array.isRequired,
  history: PropTypes.any
};

export {SkillSearch};