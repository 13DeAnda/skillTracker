import React, { Component } from 'react';
import PropTypes from "prop-types";

class Toaster extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    setTimeout(function(){
      this.props.changeToaster({});
    }.bind(this), 9000);
  }

  render() {
    const {message, type} = this.props;
    return (type?
      <div  className={'toastContainer'}>
        <div className="toast fadeIn" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            {type === 'error'?
              <i className="fa fa-exclamation-circle" style ={{color: "red"}}/>
              : <i className="fa fa-check-circle" style ={{color: "blue"}}/>}
            <strong className="mr-auto">{type === "error"? 'Error' : 'Success'}</strong>
            <div className="ml-2 mb-1 closeButton" data-dismiss="toast" aria-label="Close" onClick={() => this.props.changeToaster({})}>
              <span aria-hidden="true">&times;</span>
            </div>
          </div>
          <div className="toast-body">
            {message}
          </div>
        </div>
      </div>
      :null);
  }
}

Toaster.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  changeToaster: PropTypes.func.isRequired
};


module.exports = Toaster;
