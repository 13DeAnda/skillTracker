import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from './graph';
import {bindActionCreators} from "redux";
import {fetchUser} from "../../services/UsersService";
import levels from '../../services/mockData/levels.json';
import AddSkill from "../shared/addSkill";

class User extends Component {
    state = {
      user: {categories: []},
      categoryIndex: 0,
      options: null,
      chartDetails: null
    };
    constructor(props) {
      super(props);
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
      const {categoryIndex, options, chartDetails} = this.state;

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

          <AddSkill onAdd={()=>{}}/>

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