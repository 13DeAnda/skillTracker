import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Graph from './graph';
import levels from '../../../services/mockData/levels.json';
class User extends Component {
  state = {
    categoryIndex: 0,
    options: null,
    chartDetails: null
  };
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const user = this.props.data;
    if(user){
      this.buildGraphData(user, 'all');
    }
  }
  onChart(data){
    console.log("its on the chart", data);
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
    const user = this.props.data;
    const {categoryIndex, options} = this.state;

    return (
      <div className={'userContainer'}>
        <h2 className={''}> {user.name} </h2>
        <h4 className={''}> {user.title} </h4>

        <div className={'skillsDropDown'}>
          <select value={categoryIndex || "all" }
                  onChange={e=> {this.buildGraphData(user, e.target.value);}}>
            <option label="All" value="all" disabled={true}  />
            {user.categories.map(function(category, i){
              return (<option key={i} label={category.name} value={i} />);
            })}
          </select>
        </div>

        {options? <Graph options = {options} /> : null}
      </div>
    );
  }
}

User.propTypes = {
  data: PropTypes.object.isRequired
};

const mapStateToProps= () => {};
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(User);