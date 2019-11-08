import React, { Component } from 'react';

import CanvasJSReact from '../../../assets/canvasjs/canvasjs.react.js';
import PropTypes from "prop-types";
// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
  state = {
    options: {}
  };
  componentWillReceiveProps(nextProps){
    if(nextProps.data.id !== this.props.data.id){
      this.transformData(nextProps.data);
    }
  }
  transformData(data){
    console.log("the data to transform", data);
    let options = {title: {text:data.name}, data: []};
    const graph = {type: "column", dataPoints: []};
    for(let skill of data.skills){
      console.log("goes through", skill);
    }
  }

  render() {
    const options = {
      title: {
        text: 'Skills'
      },
      axisY: [
        {
          title :"proficiency",
        }
      ],
      data: [
        {
          type: 'column',
          dataPoints: [
            { label: 'FED',  y: 10  },
            { label: 'BED', y: 15  },
            { label: 'MOBILE', y: 25  },
            { label: 'DEVOPS',  y: 30  }
          ]
        }
      ],

    };

    return (
      <div>
        <CanvasJSChart options = {options}/>
      </div>
    );
  }
}
Graph.propTypes = {
  data: PropTypes.object.isRequired
};


module.exports = Graph;


