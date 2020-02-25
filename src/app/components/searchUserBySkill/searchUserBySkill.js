import React, { Component } from 'react';
import PropTypes from 'prop-types';
import levels from "../../services/mockData/levels";

class SearchUserBySkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFound: [],
      partialUsersMatch: [],
      searchDone: false,
      openAccordion: null
    };
    this.searchUserWithSkills = this.searchUserWithSkills.bind(this);
    this.sortMatchList = this.sortMatchList.bind(this);
    this.collapseAcordion = this.collapseAcordion.bind(this);
  }

  searchUserWithSkills(){
    const {users, skillList} = this.props;
    let usersFound = [];
    let partialUsersMatch = [];
    for(let user of users){
      let skillsFound = [];
      let skillMatch = 0;
      for(let requiredSkill of skillList){
        const category = user.categories[requiredSkill.category];
        const userSkill = category? category.skills[requiredSkill.id] : null;
        if(category && userSkill){

            const userLevel = levels[userSkill.skillLevel[0].level];
            const requiredLevel = levels[requiredSkill.level];
            let levelMatch = 0;
            if(userLevel >= requiredLevel){
              levelMatch = 100;
              skillMatch += 100;
            }
            else{
              levelMatch  = 100 - (requiredLevel - userLevel)*25;
              skillMatch += 100 - (requiredLevel - userLevel)*25;
            }
            userSkill.match = levelMatch;
            userSkill.level = userSkill.skillLevel[0].level;
            skillsFound.push(userSkill);
            break;
        }
      }
      skillMatch = skillMatch/skillList.length;
      user.match = skillMatch;
      user.skillsFound = skillsFound;
      if(skillsFound === skillList.length){
        usersFound.push(user);
      }
      else if(skillsFound.length > 0){
        partialUsersMatch = this.sortMatchList(partialUsersMatch, user);
      }
    }
    usersFound = usersFound.concat(partialUsersMatch);
    this.setState({usersFound: usersFound, searchDone: true});
  }

  sortMatchList(list, newItem){
    let copy = [];
    let added = false;
    if(list.length === 0){
      return [newItem];
    }
    for(let item of list){
      if(item.match < newItem.match){
        copy.push(newItem);
        added = true;
      }
      copy.push(item);
    }
    if(!added){
      copy.push(newItem);
    }
    return copy;
  }

  collapseAcordion(user){
    user.openAccordion = !user.openAccordion;
    this.setState({...this.state.usersFound, user});
  }

  render() {
    const {  skillList} = this.props;
    const {  usersFound, searchDone } = this.state;

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
          {usersFound.length? <h4> Found Matches: </h4> : searchDone? <h4>No Matches were found</h4> : null}
            <div className="accordion" id="usersFoundAccordion">
              {usersFound.map(function(user, i) {
                return (
                  <div className="card" key={i}>
                    <div className="card-header row" id={`heading${i}`}>
                      <div className={'col text-left'}>
                        <i   className={`fa fa-chevron-${user.openAccordion? `down` : `right`} fa`}
                             style ={{color: "#2c404c"} }
                             aria-hidden="true"
                             data-toggle="collapse"
                             data-target={`#collapse${i}`}
                             aria-expanded="true"
                             aria-controls={`collapse${i}`}
                             onClick={() => this.collapseAcordion(user)}/>
                        {user.name}  | {user.title}
                      </div>
                      <div className={'col text-right'}>
                        <b>{user.match.toFixed(0)}% match </b>
                      </div>
                    </div>

                    <div id={`collapse${i}`} className="collapse " aria-labelledby={`heading${i}`}
                         data-parent="#usersFoundAccordion">
                      <div className="card-body row">
                        <div className={'col-sm-6'}>
                          {user.skillsFound.map(function(skill, key) {
                          return (
                            <div className={'row'} key={key}>
                              <div className={'col'}>
                               {skill.name} | {skill.level} | {skill.match.toFixed(0)} %
                              </div>
                            </div>
                            );})}
                        </div>
                        <div className={'col-sm-6 text-right'}>
                          <button className={'button'}
                                  onClick={() =>this.props.history.push('/user/'+user.id)}>Go to User Page</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
              }.bind(this))}


            </div>

        </div>
        :null
    );
  }
}

SearchUserBySkill.propTypes = {
  users: PropTypes.array.isRequired,
  skillList: PropTypes.array.isRequired,
  history: PropTypes.any
};

export {SearchUserBySkill};