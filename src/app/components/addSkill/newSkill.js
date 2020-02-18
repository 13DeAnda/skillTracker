import React, { Component } from 'react';
import PropTypes from 'prop-types';
import categories from '../../services/mockData/categories.json';

class NewSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:  this.props.newSkillId || "",
      name: "",
      description: "",
      category: "FED"
    };
    this.addNewSkill = this.addNewSkill.bind(this);
  }
  componentDidMount() {
  }
  addNewSkill(){
    console.log("adding a new skill");
  }
  onChangeTextBox(e){
    const textBox = e.target;
    let toChange = {};
    toChange[textBox['id']]= textBox.value;
    this.setState(toChange);
    if(textBox.value.length > 1){
      this.filterSearch(textBox.value);
    }
  }

  render() {
    let {id, name, description, category} = this.state;
    return (
      <div className={'newSkillContainer'}>
        <h3 className={'row text-center'}>Add a new Skill</h3>
        <div className={'row'}>
          <div className={'col'}>
            <div className={'textboxTitle'}>Id</div> <br/>
            <input type={'text'}
                   id={'id'}
                   value={id}
                   onChange={(e) => {this.onChangeTextBox(e);}}/>
          </div>
          <div className={'col'}>
            <div className={'textboxTitle'}>Name</div> <br/>
            <input type={'text'}
                   id={'name'}
                   value={name}
                   onChange={(e) => {this.onChangeTextBox(e);}}/>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col'}>
            <select value={category}
                    onChange={e=> {this.setState({category : e.target.value})}}>
              {Object.keys(categories).map(function(key, i){
                return (<option key={i} label={categories[key].name} value={key} />);
              })}
            </select>
          </div>
          <div className={'col'}>
            <div className={'textboxTitle'}>Description</div> <br/>
            <input type={'text'}
                   id={'description'}
                   value={description}
                   onChange={(e) => {this.onChangeTextBox(e);}}/>
          </div>
        </div>
        <div className={'row text-right'}>
          <button className={'button'}
                  disabled={!(id.length && name.length && category.length)}
                  onClick={this.addNewSkill}>Add Skill</button>
        </div>

      </div>
    );
  }
}

NewSkill.propTypes = {
  newSkillId: PropTypes.string
};

export default NewSkill;