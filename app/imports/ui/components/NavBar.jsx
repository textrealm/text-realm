import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu className="manoa-green" style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Image size="mini" src="/images/textrealmlogo.png"/>
          </Menu.Item>
          {this.props.currentUser === '' ? (
              <Menu.Item as={NavLink} activeClassName="" exact to="/about"> About/FAQ </Menu.Item>
          ) : ''}
          {this.props.currentUser ? (
              [
                <Menu.Item as={NavLink} activeClassName="active" exact to="/add"
                           key='add'>Sell A Textbook</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/list"
                           key='list'>Search For Books</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/recentComments"
                           key='recentComments'>User Reviews</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/addComment"
                           key='addComment'>Add A User Review</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to={`/profile/${this.props.currentId}`}
                           key='profile'> My Profile </Menu.Item>,
              ]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Show Listings
                (Admin)</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                [
                  <Menu.Item key='login' as={NavLink} exact to="/signin"> Login </Menu.Item>,
                  <Menu.Item key='signup' as={NavLink} exact to="/signup">Sign
                    Up</Menu.Item>]
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Profile" as={NavLink}
                                   exact to={`/profile/${this.props.currentId}`}/>
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  currentId: Meteor.userId(),
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
