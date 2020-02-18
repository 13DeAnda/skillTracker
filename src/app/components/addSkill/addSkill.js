import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../store/actions/UsersActions';
import {fetchSkills} from "../../store/actions/SkillsActions";
import {SearchBar} from "../shared/searchBar";
import { withRouter } from 'react-router';
import levels from "../../services/mockData/levels";
import NewSkill from "./newSkill";

class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: {},
      skillList: [],
      skillLevel: "novice",
      showAddNewSkillModal: false,
      newSkillId: ""
    };
    this.addSkill = this.addSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }
  componentDidMount() {
    this.props.fetchSkills();
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
      item.level = this.state.skillLevel;
      list.push(item);
      this.setState({skillList: list});

    }

    this.props.onAdd(list);
  }

  deleteSkill(item){
    let temp = [];
    for(let skill of this.state.skillList){
      if(skill.id !== item.id){
        temp.push(skill);
      }
    }
    this.props.onAdd(temp);
    this.setState({skillList: temp});
  }


  render() {
    const {skills, level, title} = this.props;
    const {skillList, skillLevel, showAddNewSkillModal, newSkillId} = this.state;
    return (
      <div className={'row addSkillContainer skillSearch'}>
          <div className={'searchBox col'}>
            <h4>{title? title : 'Search Skill'}</h4> <br/>
            <div className={'row'}>
              <div className={'col'}>
                <SearchBar data={skills}
                           onClick = {this.addSkill}
                           onClickNoFound={(elem) =>{this.setState({showAddNewSkillModal: true, newSkillId: elem});}}
                           titleNoFound={'add skill?'}/>
              </div>
              {level?
                <div className={'col'}>
                  <select value={ skillLevel }
                          onChange={e=> {this.setState({skillLevel: e.target.value});}}>
                    {Object.keys(levels).map(function(level, key){
                      return (<option key={key} label={level} value={level} />);
                    })}
                  </select>
                </div>
              : null}
            </div>
            <div className={'row skillsContainer'}>
              {skillList.map(function(item, i) {
                return (<div key={i} className={'tag'}>
                  <div className={'deleteIcon'} onClick={()=>{this.deleteSkill(item);}}>x</div>
                  {item.name} <div className={'level'}> [ {item.level} ] </div>
                </div>);
              }.bind(this))}
            </div>
            {showAddNewSkillModal?
              <NewSkill newSkillId={newSkillId}/>
            :null}
          </div>
      </div>
    );
  }
}

AddSkill.propTypes = {
  fetchSkills: PropTypes.func.isRequired,
  skills: PropTypes.any.isRequired,
  onAdd: PropTypes.func.isRequired,
  level: PropTypes.bool,
  title: PropTypes.string
};

const mapStateToProps= state => {
  const { skills } = state.skills;
  return { skills };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchUsers, fetchSkills }, dispatch)
);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSkill));