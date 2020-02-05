import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../store/actions/UsersActions';
import {fetchSkills} from "../../store/actions/SkillsActions";
import {SearchBar} from "../shared/searchBar";
import { withRouter } from 'react-router';

class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: {},
      skillList: []
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
    const {skills} = this.props;
    const {skillList} = this.state;
    return (
      <div className={'addSkillContainer skillSearch'}>
          <div className={'searchBox col'}>
            <h4>Search Skill</h4> <br/>
            <div className={'row'}>
              <div className={'col'}>
                <SearchBar data={skills} onClick = {this.addSkill}/>
              </div>
            </div>
            <div className={'row skillsContainer'}>
              {skillList.map(function(item, i) {
                return (<div key={i} className={'tag'}>
                  <div className={'deleteIcon'} onClick={()=>{this.deleteSkill(item);}}>x</div>
                  {item.name}
                </div>);
              }.bind(this))}
            </div>
          </div>
      </div>
    );
  }
}

AddSkill.propTypes = {
  fetchSkills: PropTypes.func.isRequired,
  skills: PropTypes.any.isRequired,
  onAdd: PropTypes.func.isRequired
};

const mapStateToProps= state => {
  const { skills } = state.skills;
  return { skills };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchUsers, fetchSkills }, dispatch)
);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSkill));