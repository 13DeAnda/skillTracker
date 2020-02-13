import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from './graph';
import {bindActionCreators} from "redux";
import {fetchUser} from "../../services/UsersService";
import levels from '../../services/mockData/levels.json';
import categories from '../../services/mockData/categories.json';
import AddSkillModal from "./addSkillModal";

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
          description: categories[data.id]?  categories[data.id].description : null,
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
        for(let category of Object.keys[user.categories]){
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

    buildGraphData(user, type){
      let points = [];
      if(type === 'all'){
        for(let key of Object.keys(user.categories)){
          const category = user.categories[key];
          let categoryValue = 0;
          for(let i of Object.keys(category.skills)){
            const skill = category.skills[i];
            const lastLevel = skill.skillLevel[skill.skillLevel.length-1];
            categoryValue += levels[lastLevel.level];
          }
          points.push({label: category.id, y: categoryValue, click: () => this.onChart(category)});
        }
      }
      else{
        for(let j of Object.keys(user.categories[type].skills)){
          const skill = user.categories[type].skills[j];
          const lastLevel = skill.skillLevel[skill.skillLevel.length-1];
          points.push({label: skill.name, y: levels[lastLevel.level], click: () => this.onChart(skill)});
        }
      }

      this.setState({options: {
          title: {
            text: type === 'all'? 'Skills' : categories[type].name
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
      const {categoryIndex, options, chartDetails} = this.state;

      return (
        <div className={'userContainer'}>
          <div className={'row'}>
            <div className={'col'}>
              <h2 className={''}> {user.name} </h2>
              <h4 className={''}> {user.title} </h4>
            </div>
            <div className={'col'}>
              <AddSkillModal user={user}/>
            </div>
          </div>

          <div className={'skillsDropDown'}>
            <select value={categoryIndex || "all" }
                    onChange={e=> {this.buildGraphData(user, e.target.value);}}>
              <option label="All" value="all" />
              {Object.keys(user.categories).map(function(key, i){
                return (<option key={i} label={categories[key].name} value={key} />);
              })}
            </select>
          </div>
          {options? <Graph options = {options} /> : null}

          {chartDetails?
            <div className={'chartDetails'}>
              <h4>{chartDetails.title}</h4>
              <div className={'description'}> {chartDetails.description} </div>
              <div className={'skillsContainer'}>
                {Object.keys(chartDetails.skills).map((key) =>
                  <div key={key} className={'skill'}>
                    <b>{chartDetails.description ? chartDetails.skills[key].name : null}</b> <br />
                    {chartDetails.skills[key].skillLevel.map((skill, key) =>
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