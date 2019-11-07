import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Graph from './graph';
class User extends Component {
  state = {
    selectedCategory: null
  };
  constructor(props) {
    super(props);
  }


  render() {
    const user = this.props.data;
    return (
      <div className={'userContainer'}>
        <h2 className={''}> {user.name} </h2>
        <Graph  />
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