import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from './graph';
import {bindActionCreators} from "redux";
import {fetchUser} from "../../services/UsersService";
import levels from '../../services/mockData/levels.json';
import AddSkill from "../addSkill/addSkill";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {categories: []},
      categoryIndex: 0,
      options: null,
      chartDetails: null,
      skillList: [],
      skillsToAdd: []
    };
    this.updateSkills = this.updateSkills.bind(this);
    this.onChart = this.onChart.bind(this);
    this.buildGraphData = this.buildGraphData.bind(this);
    this.buildSkillsData = this.buildSkillsData.bind(this);
  }
    componentDidMount(){
      const params = window.location.pathname.split("/");
      fetchUser(params[params.length-1]).then((res)=>{
        this.setState({user: res});
        this.buildGraphData(res, 'all');
      });
    }
    onChart(data){
      this.setState({
        chartDetails: {
          title: data.name,
            description: data.description,
            skills: data.skills || [data]
        }
      });
    }
    updateSkills(skills){
      this.setState({skillList: skills});
      this.buildSkillsData(skills);
    }
    buildSkillsData(skills){
      const user = this.state.user;
      const toAddList = [];
      for(let skillToAdd of skills){
        let foundSkill = false;
        for(let category of user.categories){
          if(category.id === skillToAdd.category){
            for(let skill of category.skills){
              if(skill.name === skillToAdd.name || skill.id === skillToAdd.id){
                toAddList.push(skill);
                foundSkill = true;
                break;
              }
            }
          }
        }

        if(!foundSkill){
          toAddList.push({id: skillToAdd.id, name: skillToAdd.name, skillLevel: []});
        }
      }
      this.setState({skillsToAdd: toAddList});
    }

    buildGraphData(data, type){
      let points = [];
      if(type === 'all'){
        for(let category of data.categories){
          let categoryValue = 0;
          for(let skill of category.skills){
            const lastLevel = skill.skillLevel[skill.skillLevel.length-1];
            categoryValue += levels[lastLevel.level];
          }
          points.push({label: category.id, y: categoryValue, click: () => this.onChart(category)});
        }
      }
      else{
        for(let skill of data.categories[type].skills){
          const lastLevel = skill.skillLevel[skill.skillLevel.length-1];
          points.push({label: skill.name, y: levels[lastLevel.level], click: () => this.onChart(skill)});
        }
      }

      this.setState({options: {
          title: {
            text: type === 'all'? 'Skills' : data.categories[type].name
          },
          axisY: [
            {
              title :"proficiency",
            }
          ],
          data: [
            {
              type: 'column',
              dataPoints: points
            }
          ],
        }, categoryIndex: type});
    }

    render() {
      const user = this.state.user;
      const {categoryIndex, options, chartDetails, skillsToAdd} = this.state;
      console.log("the levels", Object.keys(levels));

      return (
        <div className={'userContainer'}>
          <h2 className={''}> {user.name} </h2>
          <h4 className={''}> {user.title} </h4>
          <div className={'skillsDropDown'}>
            <select value={categoryIndex || "all" }
                    onChange={e=> {this.buildGraphData(user, e.target.value);}}>
              <option label="All" value="all" />
              {user.categories.map(function(category, i){
                return (<option key={i} label={category.name} value={i} />);
              })}
            </select>
          </div>
          {options? <Graph options = {options} /> : null}

          <AddSkill onAdd={this.updateSkills}/>
          <div className={'skillsToAddContainer'}>
            {skillsToAdd.map((skill, key) =>
              <div key={key} className={'skill'}>
                <div className={'row'}>
                  <div className={'col'}> {skill.name} </div>
                  <div className={'col'}> Level: {skill.skillLevel.length === 0? 'none' : skill.skillLevel[skill.skillLevel.length-1].level }</div>
                  <div className={'col'}>
                    <select value={ "skill" }
                            onChange={e=> {}}>
                      {Object.keys(levels).map(function(level, key){
                        return (<option key={key} label={level} value={key} />);
                      })}
                    </select>

                  </div>
                  <div className={'col'}> <button className={'button'} onClick={()=>{}}> Add Skill </button></div>
                </div>
              </div>)}
          </div>

          {chartDetails?
            <div className={'chartDetails'}>
              <h4>{chartDetails.title}</h4>
              <div className={'description'}> {chartDetails.description} </div>
              <div className={'skillsContainer'}>
                {chartDetails.skills.map((skill, key) =>
                  <div key={key} className={'skill'}>
                    <b>{chartDetails.description ? skill.name : null}</b> <br />
                    {skill.skillLevel.map((skill, key) =>
                      <div className={'level'} key={key}>
                        {skill.level} : <i> {skill.date}</i>
                      </div>
                    )}
                  </div>)}
              </div>

            </div> : null}
        </div>
      );
    }
}


const mapStateToProps= state => {
  const { user } = state.user;
  return { user };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchUser }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(User);
export {User};