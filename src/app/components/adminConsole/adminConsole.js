import React from 'react';
import UserSearch from '../usersSearch/usersSearch';
import PropTypes from "prop-types";
import AddNewUser from '../addNewUser/addNewUser';
const AdminConsole = () => (
    <main>
        <div className="container animated fadeIn adminConsoleContainer">
            <AddNewUser />
            <UserSearch history={history}/>
        </div>
    </main>
);
AdminConsole.propTypes = {
  history: PropTypes.any
};
export { AdminConsole };