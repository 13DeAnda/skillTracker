import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs/canvasjs.react.js';
import PropTypes from "prop-types";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
  render() {

    return (
      <div>
        <CanvasJSChart options = {this.props.options}/>
      </div>
    );
  }
}
Graph.propTypes = {
  options: PropTypes.object.isRequired
};

module.exports = Graph;
