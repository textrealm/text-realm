import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Segment } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
        <Segment className="manoa-bg" padded="very">
          <Header as="h2" textAlign="center">
            <p>You are signed out.</p>
          </Header>
        </Segment>
    );
  }
}
