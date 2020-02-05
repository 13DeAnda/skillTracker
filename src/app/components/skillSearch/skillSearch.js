import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SkillSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFound: []
    };
    this.searchUserWithSkills = this.searchUserWithSkills.bind(this);
  }
  searchUserWithSkills(){
    const {users, skillList} = this.props;
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

  render() {
    const { history, skillList} = this.props;
    const {  usersFound} = this.state;
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
            {usersFound.length? <h4> Found Matches: </h4> :null}
            <table className={'row table userListContainer'}>
              <tbody>
              {usersFound.map(function(user, i) {
                return (
                  <tr  key={i} >
                    <td onClick = {() => history.push('/user/'+user.id)}>
                      {user.name}
                    </td>
                    <td><b>{user.title} </b></td>
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