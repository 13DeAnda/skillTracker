// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUsers } from '../../store/actions/UsersActions';
import {LoadingIndicator} from '../shared/LoadingIndicator/LoadingIndicator';
import {Error} from '../shared/Error/Error';

class Users extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const {fetched, fetching, users, failed} = this.props;
        return (
            <div>
                {fetched ?
                    <div>
                        {users.map(function(user, i){
                            return <li key={i}>{user.name}</li>;
                        })}
                    </div>
                    :
                    <LoadingIndicator busy={fetching}/>
                }
                {failed? <Error message="Failed to fetch list of zip codes" /> : null}
            </div>
        );
    }
}

Users.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    failed: PropTypes.bool,
    users: PropTypes.array.isRequired
};

const mapStateToProps= state => {
    const { fetching, fetched, failed, users } = state.users;
    return { fetching, fetched, failed, users };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchUsers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Users);