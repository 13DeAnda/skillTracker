import React, { Component } from 'react';
import * as CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    render() {
        const options = {
            title: {
                text: 'Basic Column Chart'
            },
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
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