import React, { Component } from 'react';

import CanvasJSReact from '../../../assets/canvasjs/canvasjs.react.js';
// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
        render() {
    const options = {
      title: {
        text: 'Basic Column Chart'
      },
      data: [
        {
          type: 'column',
          dataPoints: [
            { label: 'Apple',  y: 10  },
            { label: 'Orange', y: 15  },
            { label: 'Banana', y: 25  },
            { label: 'Mango',  y: 30  },
            { label: 'Grape',  y: 28  }
          ]
        }
      ]
    };
    return (
      <div>
        <CanvasJSChart options = {options}/>
      </div>
    );
  }
}
module.exports = Graph;


