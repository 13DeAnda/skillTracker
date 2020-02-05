import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      foundList: []
    };
    this.onChangeTextBox = this.onChangeTextBox.bind(this);
    this.filterSearch = this.filterUserSearch.bind(this);
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
  filterUserSearch(search){
    let tempList = [];
    let data = this.props.data;
    if(Array.isArray(data)){
      for(let elem of data){
        if(elem.name.toLowerCase().indexOf(search.toLowerCase()) > -1){
          tempList.push(elem);
        }
      }
    }
    else{
      for(let key in data){
        if(data.hasOwnProperty(key) && key.toLowerCase().split(" ").join("").indexOf(search.toLowerCase()) > -1){
          tempList.push(data[key]);
        }
      }
    }
    this.setState({foundList : tempList, displayList: true});
  }
  render() {
    const { foundList, searchWord, displayList} = this.state;

    return (
      <div className={'searchBarContainer'} onMouseLeave={() => this.setState({displayList: false})}>
        <div className={'content'}>
          <input type={'text'}
                 id={'searchWord'}
                 value={searchWord}
                 placeholder="search..." onChange={this.onChangeTextBox}/>
          <div className={'searchListContainer'}>
            {displayList? foundList.map(function(elem, i){
              return (<div key={i}
                           onClick = {() => { this.props.onClick(elem); this.setState({searchWord: ""});}}
                           className={'foundItem'}> {elem.name} </div>);
            }.bind(this)) :null}
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  data: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired
};

export { SearchBar };