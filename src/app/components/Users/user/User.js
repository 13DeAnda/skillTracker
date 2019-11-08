import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Graph from './graph';
class User extends Component {
  state = {
    category: {skills: []},
    categoryIndex: 0
  };
  constructor(props) {
    super(props);
  }



  onSelectCategory(index){
    const user = this.props.data;
    this.setState({categoryIndex: index, category : user.categories[index]});
  }

  render() {
    const user = this.props.data;
    const {category, categoryIndex} = this.state;
    if( user && category && !category.id ){
      this.setState({category: user.categories[0]});
    }

    return (
      <div className={'userContainer'}>
        <h2 className={''}> {user.name} </h2>
        <h4 className={''}> {user.title} </h4>

        <div className={'skillsDropDown'}>
          <select value={categoryIndex || "placeholder" }
                  onChange={e=> {this.onSelectCategory(e.target.value);}}>
            <option label="Select Category" value="placeholder" disabled={true}  />
            {user.categories.map(function(category, i){
              return (<option key={i} label={category.name} value={i} />);
            })}
          </select>
        </div>

        <Graph data = {category} />
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