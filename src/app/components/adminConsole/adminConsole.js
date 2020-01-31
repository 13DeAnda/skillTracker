import React from 'react';
import UserSearch from './userSearch';
import PropTypes from "prop-types";
const AdminConsole = () => (
    <main>
        <div className="container animated fadeIn adminConsoleContainer">
            <UserSearch history={history}/>
        </div>
    </main>
);
AdminConsole.propTypes = {
  history: PropTypes.any
};
export { AdminConsole };