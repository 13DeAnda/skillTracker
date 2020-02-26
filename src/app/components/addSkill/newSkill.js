import React, { Component } from 'react';
import PropTypes from 'prop-types';
import categories from '../../services/mockData/categories.json';
import {addNewSkill} from "../../services/SkillsService";
import _ from "lodash";
import TitleTextBox from "../shared/titleTextBox";
class NewSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:  this.props.newSkillId || "",
      name: "",
      description: "",
      category: "FED"
    };
    this.add = this.add.bind(this);
    this.onChangeTextBox = this.onChangeTextBox.bind(this);
  }
  componentDidMount() {
  }
  add(){
    const {id, name, description, category} = this.state;
    const data = _.cloneDeep(this.props.skills);
    data[id] = {id, name, category, description};
    addNewSkill(data).then(()=>{
     this.props.onAdded();
    });


  }
  onChangeTextBox(e){
    const textBox = e.target;
    let toChange = {};
    toChange[textBox['id']]= textBox.value;
    this.setState(toChange);
  }

  render() {
    let {id, name, description, category} = this.state;
    return (
      <div className={'newSkillContainer'}>
        <div className="modal" id="addNewSkillModal" tabIndex="-1" role="dialog" aria-labelledby="removeModal" aria-hidden="true">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <h4 className={'row text-center'}>Add a new Skill</h4>
                <div className={'row'}>
                  <div className={'col'}>
                    <TitleTextBox
                      onChange={this.onChangeTextBox}
                      title={'Id'}
                      id={'id'}
                      value={id}
                    />
                  </div>
                  <div className={'col'}>
                    <TitleTextBox
                      onChange={this.onChangeTextBox}
                      title={'Name'}
                      id={'name'}
                      value={name}
                    />
                  </div>
                </div>
                <div className={'row'}>
                  <div className={'col selectContainer'}>
                    <select value={category}
                            onChange={e=> {this.setState({category : e.target.value})}}>
                      {Object.keys(categories).map(function(key, i){
                        return (<option key={i} label={categories[key].name} value={key} />);
                      })}
                    </select>
                  </div>
                  <div className={'col'}>
                    <TitleTextBox
                      onChange={this.onChangeTextBox}
                      title={'Description'}
                      id={'description'}
                      value={description}
                    />
                  </div>
                </div>
                <div className={'row text-right buttonContainer'}>
                  <button className={'button'}
                          data-dismiss="modal"
                          disabled={!(id.length && name.length && category.length)}
                          onClick={this.add}>Add Skill</button>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>
    );
  }
}

NewSkill.propTypes = {
  newSkillId: PropTypes.string,
  skills: PropTypes.object,
  onAdded: PropTypes.func
};

export default NewSkill;