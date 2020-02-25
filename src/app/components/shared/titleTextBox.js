import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TitleTextBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {value, title, hint, id, type, style, disabled} = this.props;
    return (
      <div className={'titleTextBox'}>
        <div className={`blueTitle title${style}`}> {title} </div>
        <input type={type? type : 'text'}
               placeholder={hint || ''}
               className={`textBox ${style}`}
               value={value}
               disabled={disabled}
               onChange={this.props.onChange}
               id={id}
        /> <br />
      </div>
    );
  }
}

TitleTextBox.propTypes = {
  onChange: PropTypes.func,
  hint: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.string,
  disabled: PropTypes.bool
};


module.exports = TitleTextBox;