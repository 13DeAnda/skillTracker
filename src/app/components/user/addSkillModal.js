import React, { Component } from 'react';
import AddSkill from "../addSkill/addSkill";
import PropTypes from "prop-types";
import categories from '../../services/mockData/categories.json';
import levels from '../../services/mockData/levels.json';

class AddSkillModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsToAdd: []
    };
    this.addSkill = this.addSkill.bind(this);
    this.addToUser = this.addToUser.bind(this);
  }
  addSkill(skills){
    this.setState({skillsToAdd: skills});
  }
  addToUser(skill){
    const userCopy = this.props.user;
    const levelToAdd = {level: skill.level, date: Date.now()};
    const tempSkill = {id: skill.id, name: categories[skill.category].name, skillLevel: [levelToAdd]};

    let category = userCopy.categories[skill.category];
    let userSkill = category? category.skills[skill.id] : null;

    if(category && userSkill){
        let hasBeenAdded = false;
        let levelsCopy = [];
        for(let level of userSkill.skillLevel){
          const userLevel = levels[level.level];
          const addingLevel = levels[skill.level];

          if( userLevel < addingLevel && !hasBeenAdded){
            levelsCopy.push(levelToAdd);
            levelsCopy.push(level);
            hasBeenAdded = true;
          }
          else if( userLevel < addingLevel ){
            levelsCopy.push(level);
          }
          else if( userLevel > addingLevel){
            levelsCopy.push(level);
          }
          else if(userLevel === addingLevel){
            return null;
          }
        }
        if(levelsCopy.length === userSkill.skillLevel.length){
          levelsCopy.push(levelToAdd);
        }
        userSkill.skillLevel = levelsCopy;
    }
    else if(category){
      category.skills[skill.id] = tempSkill;
    }
    else{
      userCopy.categories[skill.category] = {id: skill.category, skills: {}};
      userCopy.categories[skill.category].skills[skill.id] = tempSkill;
    }
  }

  render() {
    const {skillsToAdd} = this.state;
    return (
      <div className={'removeEmsUserContainer'}>
        <button className={'button mainButton'}
                id={'removeUserButton'}
                type={"button"}
                data-toggle="modal"
                data-target="#removeModal">
          Add Skills
        </button>

        <div className="modal" id="removeModal" tabIndex="-1" role="dialog" aria-labelledby="removeModal" aria-hidden="true">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-body ">
                <div className={'blueTitle'}>Add User skills</div>
                  <AddSkill onAdd={this.addSkill} level={true}/>

                  <div className={'skillsToAddContainer'}>
                    {skillsToAdd.map((skill, key) =>
                      <div key={key} className={'skill'}>
                        <div className={'row'}>
                          <div className={'col'}> {skill.name} </div>
                          <div className={'col'}> Level: {skill.level}</div>
                          <div className={'col'}> <button className={'button'} onClick={()=>{this.addToUser(skill);}}> Add Skill </button></div>
                        </div>
                      </div>)}
                  </div>

                <div  className={'text-right'}>
                  <button type="button" className="button cancel" data-dismiss="modal"> CANCEL</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

AddSkillModal.propTypes = {
  user: PropTypes.object.isRequired
};

module.exports = AddSkillModal;